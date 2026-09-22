# Changelog

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
