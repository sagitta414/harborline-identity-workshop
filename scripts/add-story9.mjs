// One-off: add story 9 (Aiko Tanaka, an agent with an identity) and the live console links to every keyed map.
import {readFile, writeFile} from 'node:fs/promises';
const rd = async f => readFile(new URL('../' + f, import.meta.url), 'utf8');
const wr = async (f, s) => writeFile(new URL('../' + f, import.meta.url), s, 'utf8');
const SITE = 'https://harborlinecc7795.z1.web.core.windows.net';
function insertAfterKwame(src, entry, occurrence = 0) {
  // find the Nth "kwame:" key at line start, then the next "\n};" and insert the entry before it
  const re = /\n\s*kwame\s*:/g; let m, i = 0, at = -1;
  while ((m = re.exec(src))) { if (i++ === occurrence) { at = m.index; break; } }
  if (at < 0) throw new Error('kwame key not found (occurrence ' + occurrence + ')');
  const close = src.indexOf('\n};', at + 1);
  if (close < 0) throw new Error('map close not found');
  const before = src.slice(0, close).replace(/\s+$/, '');
  const sep = before.endsWith(',') ? '' : ',';
  return before + sep + '\n' + entry + src.slice(close);
}

// ---------------------------------------------------------------- data.js
let data = await rd('dist/data.js');
if (!data.includes("id:'aiko'")) {
  data = data.replace("URLS.external='https://entra.microsoft.com/?tid=5b978a26-961f-40b9-877d-bfedaec7463d';",
    "URLS.external='https://entra.microsoft.com/?tid=5b978a26-961f-40b9-877d-bfedaec7463d';\nURLS.agents='" + SITE + "/agents.html';URLS.hr='" + SITE + "/hr.html';URLS.manager='" + SITE + "/manager.html';URLS.checklist='" + SITE + "/checklist.html?welcome';URLS.people='" + SITE + "/people.html';URLS.transfer='" + SITE + "/transfer.html';URLS.shift='" + SITE + "/shift.html?device=hl-kiosk-01';URLS.devices='" + SITE + "/devices.html';URLS.vendors='" + SITE + "/vendors.html';URLS.contractor='" + SITE + "/contractor.html';URLS.offboarding='" + SITE + "/offboarding.html';URLS.franchiseTeam='" + SITE + "/franchise-team.html';URLS.enterpriseApps='https://entra.microsoft.com/#view/Microsoft_AAD_IAM/StartboardApplicationsMenuBlade/~/AppAppsPreview';");
  const consoles = {
    sofia: "console:{name:'Manager Console and New Hire Checklist',url:'manager',who:'priya.natarajan (manager) and sofia.alvarez (checklist)',does:'Priya sees Sofia in her team with her device, checklist progress and passkey state and hands over the Temporary Access Pass. Sofia’s laptop opens the New Hire Checklist on first sign-in; the ticks she cannot fake come from the directory. Harborline HR (grace.liu) is where the hire date was written.',also:[['New Hire Checklist','checklist'],['Harborline HR','hr']]},",
    elena: "console:{name:'Franchise Onboarding Desk',url:'franchiseTeam',who:'lena.fischer@baysidehotels.example (External ID)',does:'Lena, the Bayside owner, invites Elena and sets her Franchise Hub role herself. The invitation email goes out, and the role is applied the first time that address signs in. Nobody at head office creates the account.',also:[['Franchise Hub','" + SITE + "/franchise.html']]},",
    jordan: "console:{name:'Property Transfer Console',url:'transfer',who:'grace.liu',does:'Grace sees Jordan’s Bayside identity and his parked workforce record side by side, with the peers at Harbor View and what they hold. Convert to managed checks the licence pool, enables the record, assigns the Guest Services Lead package; return reverses it. Reclaim a seat when the pool is empty.',also:[['Harborline HR','hr']]},",
    sam: "console:{name:'Shift Board',url:'shift',who:'sam.okoro or hank.doyle',does:'Who is on the desk and since when, the report-only prompt count for HL-CA04 on Sam’s real sign-ins, and End shift, which revokes his sessions in Entra and records the handover. Hank’s Manager Console shows the desk as on shift.',also:[['Manager Console','manager']]},",
    samfed: "console:{name:'Franchise Device Standard',url:'devices',who:'ines.moreau@fed.arrow-creations.us (through HarborPass) or chris.park (brand view)',does:'The Bayside IT lead sees only the devices her company owns, the brand policies she cannot switch off, and how she signed in: through HarborPass, MFA accepted from the franchisee. Chris sees the whole estate.',also:[]},",
    tom: "console:{name:'Vendor Access Review',url:'vendors',who:'priya.natarajan or chris.park',does:'Non-employee accounts ranked by an explainable risk score. Tom is first: past end date, dormant, a second key in External ID. End contract runs the vendor expiry workflow on demand; Start an access review creates a real review of vendor accounts.',also:[['Offboarding Folio','offboarding']]},",
    nadia: "console:{name:'Contractor Pass',url:'contractor',who:'nadia.haddad (pass) and hank.doyle (Manager Console)',does:'Her own view: days left, sponsor, the Contact Center contractor package that expires with the engagement, how she signs in. A request for more time lands in Hank’s Manager Console; approval moves the date and the package together.',also:[['Manager Console','manager'],['Harborline HR','hr']]},",
    kwame: "console:{name:'Offboarding Folio',url:'offboarding',who:'chris.park',does:'Kwame beside Tom: account state, the HL Employee leaver run with its task count, sessions revoked, remaining groups, apps, packages, licences and devices. Close the departure finishes what a workflow missed. Harborline HR is where the last day was recorded.',also:[['Harborline HR','hr']]},",
  };
  for (const [id, entry] of Object.entries(consoles)) {
    const marker = "{id:'" + id + "',";
    if (!data.includes(marker)) throw new Error('persona not found: ' + id);
    data = data.replace(marker, marker + entry);
  }
  const aiko = `,
{id:'aiko',proves:'An agent is a workforce identity: registered with an owner, scoped by application roles, approved by Security, calling other agents with its own token, refused at the gateway when it steps outside its scopes',label:'',name:'Aiko Tanaka',initials:'AT',portrait:'./assets/personas/aiko-tanaka.svg',role:'An agent with an identity',job:'Guest Services Lead · head office',company:'Story 9 · Agents · identity, scope and proof',headline:'The newest member of staff<br><span>is software.</span>',intro:'Aiko builds a concierge agent that answers late-checkout and upgrade questions by asking Housekeeping and Revenue. It has to exist as something Entra can see, hold only the access its purpose needs, and be switched off like anyone else.',account:'aiko.tanaka@arrow-creations.us',question:'Who owns an agent, what can it reach, and how would you prove what it did?',talk:'Run it live in Agent Studio: build as Aiko, approve as Chris with one scope refused, run the late checkout, then the payroll question the gateway refuses. Every step lands in the same directory and sign-in log as a person.',caution:'The property data the agents answer from is illustrative. The identities, the application roles, the tokens, the refusals and the sign-in log entries are real. Reading the service principal sign-in log takes about 40 seconds.',close:'The agent has an identity, an owner, a scope and a sign-in log. Nothing it does is invisible.',cases:[33,34],agent:null,console:{name:'Agent Studio',url:'agents',who:'aiko.tanaka (build and run) and chris.park (approvals)',does:'Fill in the Concierge example and register: a real application and service principal with Aiko as owner. Chris unticks Send messages and approves: application role assignments on the Agent Gateway. Run the late checkout: Housekeeping and Revenue answer with their own identities; the message step is refused. Run the payroll question: refused with the reason. Activity shows the agent’s own sign-ins.',also:[['Enterprise applications','enterpriseApps'],['Sign-in logs','logs']]},moments:[
{time:'BUILD',short:'Register',title:'She builds it in Agent Studio.',body:'Name, purpose, the scopes it needs and the agents it may call. The studio registers a real application and service principal in the workforce tenant with Aiko as owner, disabled until approved. Requested is not granted.',signal:'An application and a service principal of its own',detail:'Entra ID · Application and service principal (agent identity)',node:0,setup:['Open Agent Studio as Aiko and use Fill in the Concierge example.','Register the agent and read the evidence panel.','Open Enterprise applications and find Agent: Front Desk Concierge (Aiko Tanaka).'],evidence:'Confirm the enterprise application exists, is disabled, lists Aiko as owner and has no permissions yet.',links:[['Open Agent Studio','agents'],['Enterprise applications','enterpriseApps']]},
{time:'APPROVE',short:'Scopes',title:'Security decides the scopes.',body:'Chris grants Reservations, Housekeeping, Revenue and Agents.Invoke as application roles on the Harborline Agent Gateway and refuses Messaging.Send. A 90-day credential is issued to the platform; nobody types it.',signal:'Application role assignments are the consent',detail:'Entra ID · Application roles, admin consent',node:1,setup:['Open Agent Studio as Chris; the Approvals card lists the requested scopes with risk levels.','Untick Send messages and approve.','Open the agent’s Permissions in Enterprise applications.'],evidence:'The granted roles appear as application permissions on the service principal; the refused role does not.',links:[['Approve in Agent Studio','agents'],['Enterprise applications','enterpriseApps']]},
{time:'RUN',short:'Token',title:'It signs in as itself.',body:'Client credentials against the workforce tenant. The token carries exactly the roles Security granted, and the sign-in lands in the service principal sign-in log like any workload identity.',signal:'The roles claim is the whole authorisation',detail:'Entra ID · Client credentials, sign-in logs',node:2,setup:['As Aiko, run Can room 412 check out late tomorrow?.','Read the first transcript line: signed in as itself, roles in the token.','Open Activity and sign-ins.'],evidence:'A service principal sign-in for the agent against the Harborline Agent Gateway appears in the Entra sign-in log.',links:[['Run in Agent Studio','agents'],['Sign-in logs','logs']]},
{time:'HOPS',short:'Agents',title:'It asks other agents.',body:'Housekeeping and Revenue answer with their own identities: a second and third token, each checked at the gateway against the caller’s scopes and allow-list. The message step is refused because Messaging.Send was not granted, and a payroll question is refused with the reason.',signal:'A refusal at the gateway is the demo',detail:'Azure Functions + Entra ID · Token validation, workload identities',node:3,setup:['Read the Housekeeping and Revenue hops: their own application ids and roles.','Point at the refused message step and its reason.','Run the payroll question and read the refusal.'],evidence:'HTTP 403 with the missing role or the allow-list named; the platform agents’ own sign-ins in the log.',links:[['Run in Agent Studio','agents'],['Conditional Access for workload identities','ca']]},
{time:'RETIRE',short:'Leaver',title:'It is retired like a leaver.',body:'Disable the principal, drop the roles. Access reviews cover application role assignments the same way they cover people; an agent nobody owns any more is the vendor who never checked out, in software.',signal:'Disable, remove roles, keep the evidence',detail:'Entra ID Governance · Access reviews, retire',node:3,setup:['Retire the agent from Agent Studio.','Open the enterprise application: disabled, no permissions.','Open Access reviews and show a review of application role assignments.'],evidence:'The service principal is disabled and holds no application roles; its history stays in the sign-in log.',links:[['Retire in Agent Studio','agents'],['Access reviews','reviews']]}]}`;
  const end = data.lastIndexOf('\n];');
  data = data.slice(0, end) + aiko + data.slice(end);
  await wr('dist/data.js', data);
}

// ---------------------------------------------------------------- app.js: the console card + story count
let app = await rd('dist/app.js');
if (!app.includes('function consoleCard(')) {
  app = app.replace('function mainContent(){const content=baseContent();return state.tab===\'live\'?content+accessProofCard(person()):content;}',
    "function consoleCard(p){const c=p.console;if(!c)return '';const also=(c.also||[]).map(l=>link(...l)).join('');return `<section class=\"console-card\"><div class=\"eyebrow\">Live console for this story</div><h3 class=\"content-title\">${escape(c.name)}</h3><p>${escape(c.does)}</p><p class=\"console-who\">Sign in as <code>${escape(c.who)}</code>. The page opens for the role in the token, not the person; a wrong account shows Not available.</p><div class=\"launch-list\">${link('Open '+c.name,c.url)}${also}</div></section>`;}\nfunction mainContent(){const content=baseContent();const c=consoleCard(person());return state.tab==='live'?content+accessProofCard(person())+c:content+c;}");
  app = app.replace('Check all eight stories and all three partner portals', 'Check all nine stories, the live consoles and all three partner portals');
  await wr('dist/app.js', app);
}

// ---------------------------------------------------------------- home.js
let home = await rd('dist/home.js');
if (!home.includes('aiko:')) {
  home = home.replace('const workforceIndexes=[0,2,3,5,6,7];', 'const workforceIndexes=[0,2,3,5,6,7,8];');
  home = home.replace("  kwame:['LEAVER','Employee departure','Disable → revoke → prove']", "  kwame:['LEAVER','Employee departure','Disable → revoke → prove'],\n  aiko:['AGENT IDENTITY','An agent with an identity','Build → approve → prove']");
  await wr('dist/home.js', home);
}

// ---------------------------------------------------------------- ai-guide.js (three maps)
let ai = await rd('dist/ai-guide.js');
if (!ai.includes('aiko:')) {
  ai = insertAfterKwame(ai, " aiko:{title:'Keep every agent accountable',benefit:'Correlate the agent’s registration, granted scopes, sign-ins and refused hops so its owner and Security can see exactly what it did and why.',input:'Application and service principal records, application role assignments, service principal sign-ins, gateway decisions and run transcripts.',output:'A per-agent accountability brief: owner, scopes, activity, refusals and what to retire.',decision:'The owner keeps the agent; Security approves scope changes; retirement is a recorded decision.',moments:['Explain why a hop was refused and which scope it would have needed.','Flag agents whose scopes exceed their stated purpose.','Prepare a review of application role assignments.']}", 0);
  ai = insertAfterKwame(ai, "  aiko:{name:'Agent Accountability Agent',status:'AGENT PATTERN',role:'Tie an agent’s identity, scopes, sign-ins and refusals into one reviewable record.',sources:['Enterprise apps','Sign-in logs','Gateway decisions'],result:'An owner-facing accountability brief'}", 1);
  ai = insertAfterKwame(ai, " aiko:{control:'Agent Studio and Microsoft Entra admin center · Enterprise applications',portal:'agents',observe:'Read the agent’s granted roles, its sign-ins and the refused hops in its transcripts without changing anything.',change:'Preview a scope change by registering a second agent with one extra scope in Agent Studio; approval stays with Security.',verify:'Confirm the application role assignments and the sign-in entries match the transcript.',undo:'Retire the preview agent: the principal is disabled and the roles removed, and the log keeps the history.'}", 2);
  await wr('dist/ai-guide.js', ai);
}

// ---------------------------------------------------------------- architecture-models.js
let arch = await rd('dist/architecture-models.js');
if (!arch.includes('aiko:')) {
  arch = arch.replace('kwame:[[7],[7],[7]]};', 'kwame:[[7],[7],[7]],aiko:[[33],[33],[33],[33,34],[34]]};');
  await wr('dist/architecture-models.js', arch);
}

// ---------------------------------------------------------------- company-playbooks.js
let cp = await rd('dist/company-playbooks.js');
if (!cp.includes('aiko:')) {
  cp = insertAfterKwame(cp, " aiko:{company:'A hospitality group wants staff to build small agents for guest-facing tasks without creating a population of unowned, over-privileged software identities.',before:'Agents run under a shared service account or a person’s own token. Nobody can say which agent did what, scopes are whatever the shared credential has, and retiring an agent means hoping someone remembers.',outcome:'Each agent is its own identity with an owner, a purpose, application roles trimmed to that purpose, a sign-in history and a retirement path.',owners:'The builder owns the agent; Security owns scope approval; the platform team owns the gateway and the credential lifecycle; identity governance owns reviews.',prerequisites:'An API registration that defines the scopes as application roles, a gateway that validates tokens and enforces an allow-list, a studio or process that registers agents with owners, and a review cadence for application role assignments.',deploy:['Define the scope catalogue as application roles on the gateway API, with risk levels and the purpose each scope serves.','Register every agent as its own application and service principal, disabled until approved, with the builder as owner and the purpose in the notes.','Route scope approval to Security; grant application role assignments per agent and refuse what the purpose does not need.','Issue credentials to the platform, never to people; validate every call at the gateway and log the decision; make agent-to-agent hops use the next agent’s own identity.','Review application role assignments on a schedule and retire agents by disabling the principal and removing the roles.'],proof:'An agent completes an allowed task with its own token, a hop outside its scopes is refused with the reason, and the agent’s sign-ins are visible in the tenant’s sign-in log.',metric:'Track agents without an owner, scopes granted beyond the stated purpose, refused hops per agent and time from retirement decision to disabled principal.',fallback:'If the gateway or the credential store is unavailable, agents stop; they never fall back to a person’s token. Keep a manual retire path in the admin center.',question:'Could you list every agent in the estate, its owner and its scopes, and prove what one of them did yesterday?',reference:'access',moments:['Aiko registers the Concierge agent in Agent Studio: an application and a service principal with her as owner, disabled until approved.','Chris approves with Messaging.Send refused: application role assignments on the Agent Gateway are the consent.','The agent signs in with client credentials; the roles claim is the whole authorisation and the sign-in is in the log.','Housekeeping and Revenue answer with their own identities; the message step and the payroll question are refused at the gateway with the reason.','Retire: the principal is disabled, the roles removed, the history kept; access reviews cover application role assignments.']}", 0);
  await wr('dist/company-playbooks.js', cp);
}

// ---------------------------------------------------------------- demo-guide.js (two maps)
let dg = await rd('dist/demo-guide.js');
if (!dg.includes('aiko:')) {
  dg = insertAfterKwame(dg, ` aiko:[
  [[33],[
   s('Open Agent Studio as aiko.tanaka@arrow-creations.us, use Fill in the Concierge example and click Register the agent.','The agent becomes a principal of its own, with Aiko as owner, disabled until approved.','Read the evidence panel: application id, service principal created, owner set, scopes requested.'),
   s('In the Entra admin center open Enterprise applications and find Agent: Front Desk Concierge (Aiko Tanaka).','The studio created a real object the tenant can govern.','Disabled, owner Aiko, no permissions yet.'),
   s('Ask the room who owns the agents already running in their estate.','Ownership is the first control, before scope.','Most rooms cannot answer for every agent.')
  ]],
  [[33],[
   s('Open Agent Studio as chris.park@arrow-creations.us. In Approvals untick Send messages and click Approve with ticked scopes.','Requested is not granted; Security trims to the purpose.','Evidence panel: scopes granted, Messaging.Send refused, credential issued to the platform, principal enabled.'),
   s('Open the agent’s Permissions blade in Enterprise applications.','Application role assignments are the consent.','Four application permissions on the Harborline Agent Gateway; no Messaging.Send.'),
   s('Ask who in the client’s organisation approves what an agent may reach.','Scope approval needs a named owner.','If the answer is the builder, the control is missing.')
  ]],
  [[33],[
   s('Back as Aiko, run: Can room 412 check out late tomorrow?','The agent signs in with client credentials and gets a token with exactly the granted roles.','First transcript line: signed in as itself, roles listed, audience api://harborline-agent-gateway.'),
   s('Open Activity and sign-ins (about 40 seconds to read).','Every agent sign-in is a service principal sign-in in the tenant log.','Entries for Harborline Agent Gateway with the agent as the principal.'),
   s('Open Sign-in logs in the admin center and filter to service principal sign-ins.','The same evidence, in Microsoft’s own log.','The agent and the platform agents appear as principals.')
  ]],
  [[33,34],[
   s('Read the Housekeeping and Revenue hops in the transcript.','Each platform agent answers with its own identity and roles; the gateway checked the caller’s scopes and allow-list first.','Their application ids and roles are shown under each hop.'),
   s('Point at the refused message step, then run the payroll question.','A refusal at the gateway is the demonstration: HTTP 403 with the missing scope or the allow-list named.','The agent answers honestly that it cannot help with pay.'),
   s('Open Conditional Access and explain workload identity policies.','Guardrails for agents use the same policy engine as people.','Optional: a policy that blocks the agent signing in from outside Azure.')
  ]],
  [[34],[
   s('Click Retire on the agent.','Retirement is the leaver pattern for software.','Evidence panel: principal disabled, roles removed.'),
   s('Open the enterprise application again.','The object stays; it can do nothing.','Disabled, no permissions, sign-in history intact.'),
   s('Open Access reviews and show a review of application role assignments.','Agents are reviewed like people.','Same review engine, same evidence.')
  ]]
 ]`, 0);
  dg = insertAfterKwame(dg, ` aiko: [
  ['Build the agent as Aiko','Read the evidence: identity, owner, scopes requested','Find it in Enterprise applications'],
  ['Approve as Chris with one scope refused','Read the granted roles on the principal','Explain who approves scope in your estate'],
  ['Run the late checkout','Read the token line and the answer','Open Activity: the agent’s own sign-ins'],
  ['Read the agent-to-agent hops','Point at the refused message step','Run the payroll question and read the refusal'],
  ['Retire the agent','Confirm the principal is disabled and roleless','Show access reviews for application roles']
 ]`, 1);
  await wr('dist/demo-guide.js', dg);
}

// ---------------------------------------------------------------- journey-narrative.js (three maps)
let jn = await rd('dist/journey-narrative.js');
if (!jn.includes('aiko:')) {
  jn = insertAfterKwame(jn, "  aiko:{outcome:'Let staff build agents that are real identities: owned, scoped to their purpose, observable in the sign-in log and retirable like a leaver.',owner:'The builder, Security, the platform team and identity governance',decisions:['Who owns each agent, and where is that recorded?','Which scopes does the purpose actually need, and who refuses the rest?','How does an agent prove what it did, and to whom?','What happens to the agent when its owner leaves?'],customize:['Define the scope catalogue as application roles on your own gateway API.','Route approval to Security or to the data owners of each scope.','Add workload identity Conditional Access and a review cadence for application role assignments.'],ai:'Correlate each agent’s registration, scopes, sign-ins and refusals into an accountability brief for its owner.',reset:'Retire rehearsal agents from Agent Studio (principal disabled, roles removed) and clear the run history.'}", 0);
  jn = insertAfterKwame(jn, "  aiko:{title:'An agent that can be trusted because it can be seen.',story:[`Aiko wants a concierge agent that answers guest questions by asking the Housekeeping and Revenue agents. Before it does anything, it needs to exist as something Harborline can govern: an application and a service principal of its own, with Aiko as its owner and its purpose on the record.`,`Its access is defined as application roles on the Agent Gateway and granted by Security, trimmed to the purpose. The agent signs in with its own credential and carries exactly those roles; every call is validated at the gateway, and a hop outside its scopes is refused with the reason. When it asks another agent, that agent answers with its own identity.`,`The agent’s sign-ins sit in the same log as a person’s, and its retirement follows the same pattern: disable the principal, remove the roles, keep the evidence. The company can say who built it, what it could reach, what it did and when it stopped.`],takeaway:'Agents are workforce identities. The controls that already exist for people, ownership, least privilege, sign-in evidence, reviews and offboarding, are the controls for agents.'}", 1);
  jn = insertAfterKwame(jn, "  aiko:{fit:'Agent identities across the workforce tenant and partner-facing APIs',workforce:'Agents that act inside Harborline are workforce-tenant applications with application roles, owned by staff and governed with the same reviews.',external:'Agents that a partner builds against Harborline’s APIs are External ID application identities registered through the Integration Exchange, scoped by the Partner API’s roles.',decision:'Classify the agent by who owns it and which resources it reaches. Internal agents live in the workforce tenant; partner agents live in External ID with their own credentials and scopes.',flow:['Register with an owner','Approve scopes','Validate every call','Retire and review'],question:'Which of your agents belong to your workforce tenant, and which are really partner integrations that need an external identity?'}", 2);
  await wr('dist/journey-narrative.js', jn);
}

// ---------------------------------------------------------------- perspectives.js
let ps = await rd('dist/perspectives.js');
if (!ps.includes('aiko:')) {
  ps = insertAfterKwame(ps, `  aiko: [
    ['Build the Concierge agent.', 'In Agent Studio as Aiko, use Fill in the Concierge example and register it.', 'Read the evidence panel: the agent is an application and a service principal with you as owner, disabled until approved.'],
    ['Wait for Security.', 'The approval request went to Chris by email; the principal stays disabled.', 'When it is approved, the agent card shows the granted scopes and any refused ones.'],
    ['Run a guest request.', 'Ask: Can room 412 check out late tomorrow?', 'Watch the agent sign in as itself, ask Housekeeping and Revenue, and get refused on the message step.'],
    ['Try something it should not do.', 'Ask the overtime pay question.', 'The gateway refuses the Payroll hop with the reason; the agent says it cannot help.'],
    ['Retire it.', 'Click Retire when the agent is no longer needed.', 'The principal is disabled and its roles removed; the sign-in history stays.']
  ]`, 0);
  await wr('dist/perspectives.js', ps);
}

// ---------------------------------------------------------------- portrait
await wr('dist/assets/personas/aiko-tanaka.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="Aiko Tanaka"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0F4C81"/><stop offset="1" stop-color="#12314d"/></linearGradient></defs><rect width="160" height="160" rx="24" fill="url(#g)"/><circle cx="80" cy="64" r="28" fill="#cfe6f5" opacity=".95"/><path d="M28 140c6-30 26-44 52-44s46 14 52 44z" fill="#cfe6f5" opacity=".95"/><rect x="104" y="98" width="40" height="40" rx="10" fill="#FF7A3D"/><path d="M114 118h20M124 108v20" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`);

// ---------------------------------------------------------------- validator counts
let v = await rd('scripts/validate.mjs');
v = v.replace('assert.equal(people.length,8);', 'assert.equal(people.length,9);').replace("assert.equal(new Set(people.map(p=>p.id)).size,8);", "assert.equal(new Set(people.map(p=>p.id)).size,9);")
  .replace("assert.equal((renderedHome.match(/workforce-model/g)||[]).length,6);", "assert.equal((renderedHome.match(/workforce-model/g)||[]).length,7);")
  .replace("assert.equal((renderedHome.match(/journey-card-ai/g)||[]).length,10);", "assert.equal((renderedHome.match(/journey-card-ai/g)||[]).length,11);")
  .replace("assert.match(app,/all eight stories and all three partner portals/);", "assert.match(app,/all nine stories, the live consoles and all three partner portals/);\nfor(const p of people){assert.ok(p.console&&p.console.name&&p.console.url&&p.console.who&&p.console.does,`Missing live console: ${p.id}`);assert.ok(URLS[p.console.url]||/^https:/.test(p.console.url),`Unresolved console link: ${p.id}`);}")
  .replace("console.log('Validated eight day-in-the-life personas", "console.log('Validated nine day-in-the-life personas with live consoles");
await wr('scripts/validate.mjs', v);
console.log('story 9 and live consoles added');
