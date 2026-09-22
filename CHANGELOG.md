# Changelog

## 1.4.5 (2026-09-22)

- Every journey now names the agent that supports its business story and shows the path from identity signals through AI analysis, human approval and verified proof.
- Jordan’s Identity Conversion Agent, Sam’s Kiosk Experience Agent and Tom’s Dormant Access Review Agent are clearly marked as prepared agents; other journeys are presented as connected agent patterns rather than completed automations.
- The Workforce AI experience now includes persona imagery, an agent mission card, a four-stage story map and a light Harborline operator console.
- External ID AI pages use the same visual language for Evan, Elena and External Tom, with their identity, application and API boundaries made explicit.
- Every homepage journey includes a direct “See how the agent helps” link.

## 1.4.4 (2026-09-22)

- The External ID section on the home page now lists the four day-in-the-life stories that run on external or franchisee identities (Elena, Jordan, Sam federated, Tom) with the deck's persona labels and "what it proves" lines, linking to each story.
- Personas carry `proves` and `label` fields from slide 5 of the client deck.

## 1.4.3 (2026-09-21)

Word-for-word alignment with the client deck (slides 5, 6, 8 to 15).

- Story titles now match the slide titles (Sam: One sign-in for the whole night audit; Tom: The guest who never checked out; Kwame: Checkout, done properly).
- Persona descriptors match slide 5 and the story slides (Head office · new hire, Vendor · ClimateWorks, Employee · leaving, and so on).
- Every moment opens with the deck's own sentence; the presenter guidance follows it.
- Each story carries the deck's closing line, shown at the end of the complete journey.
- Sam's story 4 talk track no longer mentions federation (that is story 5).

## 1.4.2 (2026-09-21)

Demo review follow-ups.

- Guided lab overlay (the two-screen live stage) now uses the light Harborline theme; it was the last dark purple surface and the one the room sees most.
- "Open protected session" was clipped inside the admin pane at 1280 x 720; the pane now scrolls and the placeholder is compact enough to fit a projector.
- MajorKey wordmark in the overlay toolbar switched to the dark variant.

## 1.4.1 (2026-09-21)

Critical review of every button and story.

- Partner developer journey tabs routed to Nadia's day-in-the-life story (`#nadia/...`), because `nadia` became a persona id. Journey routes are now `tom-vendor`, `elena-franchise` and `evan` everywhere.
- Tom's fourth moment built its AI agent link with `undefined`; the AI guide now carries four prompts for Tom, and Sam's and Nadia's prompts match their three moments (the old federation and recovery prompts are gone from story 4).
- Company playbook moment texts realigned: Sam (kiosk, no federation), Tom (fourth moment, the second key in the external tenant), Nadia (three moments).
- Franchise journey now matches the tenant and story 2: Elena Petrova is the franchise manager at Bayside Hotels LLC for Ballard Locks House (HL-SEA-04); Cannery Pier Hotel (Northlake Hotels LLC) is denied; Royalties stay with the owner, Lena Fischer. Live pane initials EP and ET.
- Vendor journey properties match the Supplier Desk contract: Elliott Landing, Ballard Locks House and Cannery Pier.
- Stale Leo Fischer and Maya Chen references removed from the presenter context, company playbooks, use-case depth and the recovery use case.
- Crawl: 122 routes, every button clicked, 0 script errors, 0 broken hashes; all 45 external links (portals, Entra, Intune, identity agents, HarborPass, remote gateway) respond.

## 1.4.0 (2026-09-21)

Light Harborline theme, in the IHG style.

- The whole workshop now renders on white pages with light-blue surfaces, navy headings, blue labels and the orange Harborline mark, replacing the dark purple MajorKey theme (`harborline-light.css`, loaded last).
- Covers home, the eight persona stories (story, live, AI, admin and user views), the three partner journeys, dialogs and form inputs. Contrast audited on each route type.
- MajorKey wordmark switched to a dark variant for light backgrounds (`assets/majorkey-logo-dark.svg`).

## 1.3.3 (2026-09-21)

Harborline Hotels brand made visible across the workshop.

- Harborline mark and wordmark (orange on charcoal, matching the live portals and the External ID sign-in) added to the home header, the persona workshop header, the persona identity card and all three partner journey pages (`harborline-brand.css`, `assets/harborline-mark.svg`).
- Partner journey pages recoloured from teal, amber and blue to the Harborline orange: headline accents, stage header, tabs, kickers, primary buttons.
- Franchise journey identities now match the tenant: Elena Petrova of Bayside Hotels LLC, hotels HL-SEA-04 and HL-SEA-07, with Northlake Hotels LLC (HL-PDX-02) as the denied franchisee. Partner developer journey names Tidewater Channel Systems instead of Crestline.

## 1.3.2 (2026-09-21)

Harborline brand pass on the partner journeys.

- Two-sided live stage styles (vendor, franchise and partner live views) restored into `external-live.css`; they had been lost when the loyalty stylesheet was retired. Retinted to the Harborline orange and charcoal palette.
- Live pane initials and uppercase name leftovers corrected (Tom Reilly, Elena Petrova, Evan Torres).

## 1.3.1 (2026-09-21)

Critical alignment pass against the client deck (slides 3, 5, 6, 8 to 16, 27).

- Each story's use cases now match slide 6 exactly, and each step carries the deck's title and the Microsoft product behind it (slides 8 to 15).
- Story 4 (Sam, managed-hotel kiosk) reduced to the deck's three steps; the federated sign-in lives only in story 5. Story 6 (Tom) gains the deck's fourth step, the second key on the Supplier Desk. Story 7 (Nadia) reduced to three steps.
- Workshop agenda rebuilt in the deck's order (eight stories plus the partner journeys), still a contiguous 480 minutes.
- Use-case catalog areas renamed and regrouped to the deck's nine areas and counts (slide 3).
- AI guidance restated to match slide 27: agents recommend and make no changes; the one rehearsed write is the presenter's.
- Hero subtitle names Sofia as the first story.

## 1.3.0 (2026-09-21)

Aligned the workshop with *Harborline Reference Lab - Use Cases and Journeys (3).pptx* and with the identities that exist in the two tenants.

### Day in the life
- Eight stories in the deck's order: Sofia (corporate new hire), Elena (franchisee user onboarding), Jordan (franchise to managed, and back), Sam (managed-hotel shared kiosk), Sam federated (franchise kiosk, external version), Tom (vendor contract ended), Nadia (remote contractor), Kwame (termination).
- New personas Elena Petrova and the federated Sam Okoro, wired through every module (data, architecture moment cases, user moments, demo guide, company playbook, journey narrative, AI guide, highlights).
- Nadia Haddad moved from the partner journey into the day in the life as story 7.
- Headlines, roles and intros follow the deck slides.

### Partner journeys
- Vendor journey is now Tom Reilly of ClimateWorks HVAC (the same identity as story 6 and the Supplier Desk account).
- Franchise journey is now Elena Petrova of Bayside Hotels LLC (the same identity as story 2 and the Franchise Hub account).
- Partner developer journey is now Evan Torres of Tidewater Channel Systems, an External ID account that exists in the tenant.
- Customer loyalty journey removed: the client does not run a rewards programme. `loyalty.js`, `loyalty.css` and the Rewards portal link are gone.

### Validation
- `scripts/validate.mjs` expects eight personas.
- Unused portraits removed; Elena reuses a portrait file under her own name.
