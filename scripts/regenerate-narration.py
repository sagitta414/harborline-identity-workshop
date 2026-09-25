"""Regenerate the journey library with a conversational neural presenter voice.

Requires edge-tts on PYTHONPATH and ffmpeg/ffprobe on PATH. The generated speech is
mixed against the existing scene timing, normalized, and remuxed without touching
the video track or its permanently burned-in captions.
"""
from __future__ import annotations

import asyncio
import json
import re
import shutil
import subprocess
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
JOURNEYS = ROOT / "dist" / "media" / "journey-videos"
LIVE = ROOT / "dist" / "media" / "live-walkthroughs"
WORK = ROOT / ".tmp" / "natural-narration"
VOICE = "en-US-BrianNeural"
RATE = "-4%"
PITCH = "-2Hz"


def probe_duration(path: Path) -> float:
    raw = subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "json", str(path)
    ], text=True)
    return float(json.loads(raw)["format"]["duration"])


def parse_srt(path: Path):
    blocks = re.split(r"\n\s*\n", path.read_text(encoding="utf-8").strip())
    segments = []
    for block in blocks:
        lines = block.splitlines()
        a, b = lines[1].split(" --> ")
        def sec(value):
            h, m, s = value.replace(",", ".").split(":")
            return int(h) * 3600 + int(m) * 60 + float(s)
        segments.append((sec(a), sec(b), " ".join(lines[2:])))
    return segments


def scene_segments(durations, texts, transition=.65):
    starts, current = [], 0.0
    for i, duration in enumerate(durations):
        starts.append(current)
        current += duration - (transition if i < len(durations) - 1 else 0)
    return [(start + .35, min(start + durations[i] - .35, current), texts[i])
            for i, start in enumerate(starts)]


LIVE_SCRIPTS = {
    "sofia-source-to-shift-live": scene_segments(
        [4.5, 5, 5, 5.5, 6, 5, 4, 4.5, 3.5, 5.5, 5, 4.5],
        [
            "Meet Sofia. We’ll follow her from a new hire record to useful work at the front desk.",
            "It starts in Harborline H R, where the property and manager information is owned.",
            "Sofia opens Front Desk. The app asks Entra for a workforce session.",
            "She reaches the real Microsoft sign-in. Her password and private verification stay off camera.",
            "Now we check Entra. The account is enabled, her groups are present, and Front Desk is assigned.",
            "Sofia returns under her own name, with the work for her property ready to go.",
            "She opens today’s arrivals, instead of landing on a generic success page.",
            "Here’s Maya’s reservation and the rooms Sofia is allowed to use.",
            "She chooses room seven fourteen and confirms the check-in.",
            "That identity decision now has a visible business result. Maya is checked in.",
            "When Sofia ends the shift, the shared desk clears for the next person.",
            "That’s the full chain: source, Entra, application access, useful work, and a clean handoff."
        ]),
    "jordan-transfer-live": scene_segments(
        [4.5, 5, 6, 5, 6, 4.5, 4.5, 3.5, 6, 4.5],
        [
            "Jordan is moving properties. Let’s see the access change in Entra and in the work he can actually do.",
            "We start in the franchise property. The application keeps that context separate.",
            "Entra shows Jordan’s workforce account, Harbor View membership, and his application assignments.",
            "After the transfer, Front Desk opens in the managed property context.",
            "Now the important test. Jordan tries the old property, and the application refuses access.",
            "Back at Harbor View, the arrival list is available as expected.",
            "Jordan opens Maya’s reservation and sees only the rooms that fit the task.",
            "He selects room six oh eight.",
            "Maya is checked in. The identity change is now visible in the business application.",
            "The proof is simple: Entra establishes access, the app enforces the boundary, and the work succeeds."
        ])
}


def conversational(text: str) -> str:
    replacements = {
        "A trusted": "Here, a trusted",
        "The important point is": "What matters is",
        "Entra evaluates": "Entra now checks",
        "The proof is": "And here’s the proof:",
        "External ID establishes": "External I D establishes",
        "API": "A P I",
        "OIDC": "O I D C",
        "FIDO2": "F I D O two",
        "HR": "H R",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text


async def synthesize(text: str, output: Path):
    communicate = edge_tts.Communicate(
        conversational(text), VOICE, rate=RATE, pitch=PITCH, volume="+0%"
    )
    await communicate.save(str(output))


def fit_audio(source: Path, output: Path, available: float):
    duration = probe_duration(source)
    # Keep natural pacing whenever possible. Only accelerate when a scene would overlap.
    ratio = duration / max(.5, available)
    filt = []
    if ratio > 1.0:
        filt.append(f"atempo={min(ratio, 1.35):.5f}")
    filt.extend(["highpass=f=70", "lowpass=f=14500"])
    subprocess.run([
        "ffmpeg", "-loglevel", "error", "-y", "-i", str(source),
        "-af", ",".join(filt), "-c:a", "pcm_s16le", str(output)
    ], check=True)


async def narrate_video(video: Path, segments):
    stem = video.stem
    folder = WORK / stem
    folder.mkdir(parents=True, exist_ok=True)
    total = probe_duration(video)
    prepared = []
    for i, (start, end, text) in enumerate(segments):
        mp3 = folder / f"{i:02d}.mp3"
        wav = folder / f"{i:02d}.wav"
        await synthesize(text, mp3)
        fit_audio(mp3, wav, max(.5, end - start - .15))
        prepared.append((wav, start))

    cmd = ["ffmpeg", "-loglevel", "error", "-y"]
    for wav, _ in prepared:
        cmd += ["-i", str(wav)]
    chains = []
    labels = []
    for i, (_, start) in enumerate(prepared):
        delay = int(start * 1000)
        chains.append(f"[{i}:a]adelay={delay}|{delay}[a{i}]")
        labels.append(f"[a{i}]")
    chains.append(
        f"{''.join(labels)}amix=inputs={len(labels)}:duration=longest:normalize=0,"
        f"apad=pad_dur={total:.3f},atrim=0:{total:.3f},"
        "loudnorm=I=-16:LRA=7:TP=-1.5[narr]"
    )
    narration = folder / "narration.m4a"
    cmd += ["-filter_complex", ";".join(chains), "-map", "[narr]", "-c:a", "aac", "-b:a", "160k", str(narration)]
    subprocess.run(cmd, check=True)

    replacement = folder / f"{stem}.mp4"
    subprocess.run([
        "ffmpeg", "-loglevel", "error", "-y", "-i", str(video), "-i", str(narration),
        "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "copy",
        "-map_metadata", "0", "-movflags", "+faststart", "-shortest", str(replacement)
    ], check=True)
    shutil.move(str(replacement), str(video))
    print(f"Narrated {video.name} with {VOICE}")


async def main():
    WORK.mkdir(parents=True, exist_ok=True)
    for video in sorted(JOURNEYS.glob("*.mp4")):
        await narrate_video(video, parse_srt(JOURNEYS / f"{video.stem}-captions.srt"))
    for stem, segments in LIVE_SCRIPTS.items():
        await narrate_video(LIVE / f"{stem}.mp4", segments)


if __name__ == "__main__":
    asyncio.run(main())
