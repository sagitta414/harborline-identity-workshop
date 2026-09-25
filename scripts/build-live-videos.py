from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import subprocess, shutil

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp-live-video"
OUT = ROOT / "dist" / "media" / "live-walkthroughs"
WORK = SOURCE / "rendered"
OUT.mkdir(parents=True, exist_ok=True)
WORK.mkdir(parents=True, exist_ok=True)

FONT = "C:/Windows/Fonts/segoeui.ttf"
BOLD = "C:/Windows/Fonts/segoeuib.ttf"
REGULAR = ImageFont.truetype(FONT, 25)
SMALL = ImageFont.truetype(BOLD, 15)
TITLE = ImageFont.truetype(BOLD, 48)
SUBTITLE = ImageFont.truetype(FONT, 25)

def wrap(draw, text, font, width):
    words, lines, line = text.split(), [], ""
    for word in words:
        trial = f"{line} {word}".strip()
        if draw.textbbox((0, 0), trial, font=font)[2] <= width:
            line = trial
        else:
            if line: lines.append(line)
            line = word
    if line: lines.append(line)
    return lines

def title_card(name, eyebrow, title, subtitle):
    im = Image.new("RGB", (1280, 720), "#071f30")
    d = ImageDraw.Draw(im)
    for x in range(1280):
        t = x / 1279
        d.line((x, 0, x, 720), fill=(7, int(31 + 28*t), int(48 + 32*t)))
    d.rounded_rectangle((74, 70, 138, 134), 18, fill="#00b6a7")
    d.text((95, 82), "H", font=ImageFont.truetype(BOLD, 34), fill="white")
    d.text((74, 194), eyebrow.upper(), font=SMALL, fill="#51e3d5")
    y = 232
    for line in wrap(d, title, TITLE, 1020):
        d.text((74, y), line, font=TITLE, fill="white")
        y += 58
    y += 18
    for line in wrap(d, subtitle, SUBTITLE, 980):
        d.text((74, y), line, font=SUBTITLE, fill="#c9dbe3")
        y += 36
    d.text((74, 650), "MAJORKEY · HARBORLINE IDENTITY IN ACTION", font=SMALL, fill="#86a6b5")
    path = WORK / f"{name}.png"
    im.save(path)
    return path

def caption(name, source_name, eyebrow, copy, color="#00b6a7"):
    im = Image.open(SOURCE / f"{source_name}.png").convert("RGB")
    if im.size != (1280, 720):
        im = im.resize((1280, 720), Image.Resampling.LANCZOS)
    overlay = Image.new("RGBA", im.size, (0,0,0,0))
    d = ImageDraw.Draw(overlay)
    d.rectangle((0, 586, 1280, 720), fill=(4, 23, 35, 238))
    d.rectangle((0, 586, 11, 720), fill=color)
    d.text((40, 606), eyebrow.upper(), font=SMALL, fill=color)
    y = 636
    for line in wrap(d, copy, REGULAR, 1185)[:2]:
        d.text((40, y), line, font=REGULAR, fill="white")
        y += 31
    im = Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB")
    path = WORK / f"{name}.png"
    im.save(path)
    return path

def render_video(filename, scenes):
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise RuntimeError("ffmpeg not found")
    transition = 0.65
    cmd = [ffmpeg, "-y"]
    for path, duration in scenes:
        cmd += ["-loop", "1", "-t", str(duration), "-i", str(path)]
    filters = []
    for i, _ in enumerate(scenes):
        filters.append(f"[{i}:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,format=yuv420p[v{i}]")
    current = "v0"
    elapsed = scenes[0][1]
    for i in range(1, len(scenes)):
        out = f"x{i}"
        offset = elapsed - transition
        filters.append(f"[{current}][v{i}]xfade=transition=fade:duration={transition}:offset={offset:.2f}[{out}]")
        current = out
        elapsed += scenes[i][1] - transition
    filters.append(f"[{current}]format=yuv420p[final]")
    cmd += ["-filter_complex", ";".join(filters), "-map", "[final]", "-an", "-c:v", "libx264", "-profile:v", "high", "-preset", "medium", "-crf", "19", "-movflags", "+faststart", str(OUT / filename)]
    subprocess.run(cmd, check=True)

jordan = [
    (title_card("jordan-title", "Workforce identity · live Azure evidence + application action", "Jordan’s property transfer, shown in action.", "A longer browser capture: current Entra assignments, allowed and denied property access, and a completed front-desk task."), 4.5),
    (caption("jordan-a", "jordan-02-franchise", "01 · Before the transfer", "Jordan begins in the franchise property view. The application keeps the two property contexts separate."), 5.0),
    (caption("jordan-b", "jordan-01-graph", "02 · Live Azure read", "Microsoft Graph confirms Jordan’s workforce account, Harbor View membership and two Harborline app assignments."), 6.0),
    (caption("jordan-c", "jordan-03-managed", "03 · Managed-property context", "The Front Desk switches to Harbor View and exposes the work attached to the current property context."), 5.0),
    (caption("jordan-d", "jordan-04-denied", "04 · Deny test", "Jordan tries the old Bayside property. The roster, rooms and service queue stay unavailable." , "#ff785a"), 6.0),
    (caption("jordan-e", "jordan-05-arrivals", "05 · Allow test", "Back at Harbor View, Jordan can reach the arrival list and begin normal front-desk work."), 4.5),
    (caption("jordan-f", "jordan-06-guest", "06 · Business task", "Jordan opens Maya Chen’s reservation and sees only the ready rooms that match the booking."), 4.5),
    (caption("jordan-g", "jordan-07-room-selected", "07 · Decision", "Room 608 is selected before the application commits the check-in."), 3.5),
    (caption("jordan-h", "jordan-08-checked-in", "08 · Outcome", "Maya is now in house in room 608. Identity led to the permitted property, then to useful work."), 6.0),
    (title_card("jordan-end", "The proof chain", "Person → Entra assignment → property boundary → business outcome", "Use the Azure read to explain why access exists. Use the application action to prove what that access permits."), 4.5),
]

sofia = [
    (title_card("sofia-title", "Workforce identity · browser-only Azure flow", "Sofia’s first shift, from source to useful work.", "No VM. The capture uses the real Harborline HR entry, real Microsoft sign-in, live Graph evidence and the working Front Desk application."), 4.5),
    (caption("sofia-a", "sofia-01-hr", "01 · Authoritative source", "Harborline HR owns the hire, property and manager attributes that Entra reacts to."), 5.0),
    (caption("sofia-b", "sofia-02-signin", "02 · Protected application", "The Front Desk requests a Workforce tenant session and explains the passkey-capable sign-in handoff."), 5.0),
    (caption("sofia-c", "sofia-03-microsoft", "03 · Real Microsoft Entra sign-in", "The browser reaches Microsoft Entra. Private credentials and MFA are intentionally never recorded."), 5.5),
    (caption("sofia-d", "sofia-04-graph", "04 · Live Azure read", "Microsoft Graph confirms Sofia’s enabled member account, property groups, FIDO2 cohort and Front Desk assignment."), 6.0),
    (caption("sofia-e", "sofia-05-app", "05 · Role-specific return", "Sofia arrives in the Front Desk experience under her own name with the property’s work ready."), 5.0),
    (caption("sofia-f", "sofia-06-arrivals", "06 · Start useful work", "She opens the arrival list instead of landing on a generic identity success page."), 4.0),
    (caption("sofia-g", "sofia-07-guest", "07 · Open the guest", "The application exposes the reservation and the ready-room decision for this task."), 4.5),
    (caption("sofia-h", "sofia-08-room-selected", "08 · Commit the task", "Sofia selects room 714 and confirms the check-in."), 3.5),
    (caption("sofia-i", "sofia-09-checked-in", "09 · Visible business result", "The guest state changes to In house and room 714 appears immediately."), 5.5),
    (caption("sofia-j", "sofia-10-ended", "10 · Clean handoff", "End shift clears the guest workspace before the next colleague takes over the shared desk."), 5.0),
    (title_card("sofia-end", "What the audience sees", "Source → Entra sign-in → Azure assignment → application task → clean handoff", "This is the longer browser-based version. It avoids the VM while keeping the identity and business outcome connected."), 4.5),
]

render_video("jordan-transfer-live.mp4", jordan)
render_video("sofia-source-to-shift-live.mp4", sofia)

# Use the opening captured scenes as the library posters.
Image.open(WORK / "jordan-title.png").save(OUT / "jordan-transfer-live-poster.png")
Image.open(WORK / "sofia-title.png").save(OUT / "sofia-source-to-shift-live-poster.png")
print(OUT)
