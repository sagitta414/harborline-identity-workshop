import {companyStories} from './company-playbooks.js';
import {cases} from './workshop.js';
import {userAccount,userMoments} from './perspectives.js';

// Authored workshop instructions. These describe checks, never live tenant state.
const s=(action,why,look)=>({action,why,look});
const guides={
  elena:[
   [[10,5],[
    s('In the Franchise Hub (private window) choose Owner sign in, then Create one. Show the partner sign-up page and its fields.','Elena onboards herself; the flow collects company and hotel.','Do not complete registration unless a mailbox is open for the code. Switch to the pre-made Elena.'),
    s('In the External ID tenant open Users and open Elena Petrova. Show company Bayside Hotels LLC and the hotel attribute.','Her identity exists only in the external directory.','Search the workforce tenant for petrova and show there is nothing.'),
    s('Open External Identities → User flows → Harborline partner sign-up and show the three attached applications.','One flow serves every partner portal.','Confirm the three partner applications use the prepared flow.')
   ]],
   [[10,26],[
    s('Sign in as Elena on the Franchise Hub and land on the scorecard for Ballard Locks House.','The flow lands her in the application with no second step.','Confirm the Franchise Manager chip in the header.'),
    s('Open the Supplier Desk with the same account and show the no-company screen.','Same sign-in, different application, different decision.','The Supplier Desk reads a different claim; she has none.'),
    s('Open the sign-in logs in the External ID tenant and find her sign-in.','Evidence of the external sign-in lives in the external tenant.','Point at the application name and the result.')
   ]],
   [[14,33],[
    s('Open Enterprise applications → Harborline Franchise Hub → Users and groups. Show Elena with Franchise.Manager.','The role is the whole authorization model.','Compare with Lena (Franchise.Owner) and jeff (Brand.QA).'),
    s('As Elena open Royalties. Read the refusal on screen.','The API refused; the page never received statements.','Do not present the refusal as an error.'),
    s('As Lena open Royalties and show the statements. Then open Team and roles as Elena and show the verified roles claim.','Same page, different token.','The claim is issued by Entra, read by the API.')
   ]],
   [[5,29],[
    s('Search the workforce tenant for petrova.','There is no Harborline account to reset or remove.','Nothing found is the point.'),
    s('Explain self-service password reset in the external tenant and show the sign-in page link.','Recovery is hers, not the help desk\'s.','Do not reset anything live.'),
    s('In a rehearsal, remove her role and reload the hub to show the no-role screen. Restore it.','Departure is a role removal.','Restore before the next demo.')
   ]]
  ],
  samfed:[
   [[24,20],[
    s('Open Intune → Devices and open the kiosk device. Show enrollment, Entra join and group membership.','The franchisee owns the hardware; Harborline manages it.','Ownership shows as corporate because it is enrolled, not because Harborline bought it.'),
    s('Open the compliance policy and its assignment to the kiosk device group.','Compliance applies by group, not by owner.','Say the policies are report-only in the lab.'),
    s('Compare with the managed-hotel kiosk from story 4.','Same profile, two ownership models.','Keep the two devices side by side.')
   ]],
   [[24,30],[
    s('Open Protection → Conditional Access → HL-CA04 and show the shared-device sign-in frequency.','One policy set governs both kiosks.','Report-only: show the what-if result rather than enforcement.'),
    s('Open Domain names and show fed.arrow-creations.us as Federated and arrow-creations.us as Managed.','Domain ownership and who verifies the password are separate decisions.','Point at HarborPass as the federation target.'),
    s('Explain that HarborPass stands in for the franchisee\'s Okta, Ping or AD FS.','Swapping the provider is a metadata change.','Do not claim it is a customer\'s real provider.')
   ]],
   [[19,26],[
    s('In a private window open My Apps and enter sam.fed@fed.arrow-creations.us. Follow the redirect to HarborPass.','Home realm discovery hands the sign-in to the franchisee.','Watch the URL leave Entra.'),
    s('Enter the password at HarborPass and approve the number match. Land back in the application.','The franchisee verified its own employee.','Harborline never saw the credential.'),
    s('Find the sign-in event in the workforce sign-in logs and show the federated identity provider.','Evidence stays in Entra even though verification happened elsewhere.','If HarborPass cold-starts, wait; it arrives.')
   ]]
  ],
 jordan:[
  [[1,2,9],[
   s('In entra.microsoft.com, confirm the workforce directory in the account menu. Open Entra ID → Users → All users; search for vale. Open each matching Jordan record in a separate tab.','Jordan is one person, but the lab has multiple identity records. Choosing the wrong record can make a successful change appear to fail.','Compare the display name, user principal name, object ID, user type and account status. Do not identify the account by display name alone.'),
   s('Open Properties for the intended workforce record. Compare its job information, employee identifier, manager and hire date with the contractor record and its contract-end source.','The authoritative source and effective dates decide when employment changes. An email alias does not prove two records are the same identity.','The reference handover is 20–21 September 2026. Record the current values; if a date is absent in this blade, show the prepared source record instead.'),
   s('Open Groups and Applications on each record. Describe what Jordan can use before the handover and which assignments need continuity.','A conversion must preserve the right work context while retiring obsolete access.','A visible before-state of identities and access, with an agreed target employee identity.')
  ]],
  [[7,9,33],[
   s('Open ID Governance → Lifecycle workflows → Workflows. Select HL Employee pre-hire. Inspect its execution conditions, scope, trigger attribute and offset.','Jordan must enter the workflow at the right time and satisfy its scope.','Compare the actual scope and trigger with Jordan’s verified attributes; do not infer inclusion from the workflow name.'),
   s('Open the workflow task list, then its history. Find Jordan by the confirmed identity and open the relevant run and task results.','Configuration describes intent; task history shows whether preparation happened.','Note execution time, user, task status and any failure. If no run exists, explain that the prepared configuration is the demo result.'),
   s('Open the prepared conversion case in the identity-agent application. Review the old and new identities, overlap, licenses, ownership and prerequisites. Stop at the proposal unless an execution demo has been prepared.','Jordan needs a coordinated handover; a generated proposal does not establish identity continuity.','Separate the proposed changes, the person authorized to approve them, and the execution/audit evidence required afterward.')
  ]],
  [[14,15,17,28],[
   s('Open the Front Desk property-access preview beside Entra. Step Jordan from Bayside franchise to Harbor View managed, try the now-denied property, then step him back.','The room sees the transfer change a useful application outcome, not only a directory field.','The property decision in Front Desk is scripted. Compare it with actual assignments and a fresh protected application sign-in before claiming tenant enforcement.'),
   s('Open Entra ID → Enterprise applications → All applications. Find Harborline Opera PMS. Inspect Properties, Users and groups, and its configured single sign-on method.','Jordan works across two properties, so both app assignment and property context matter.','Confirm the target application and Jordan’s actual assignment. Inspect app-role definitions on the corresponding app registration if needed.'),
   s('In the application’s single sign-on configuration, inspect Attributes & Claims where available. Follow the configured claims mapping and custom claims provider to the source of property and role values.','The application should receive the correct business context without an unmanageable collection of groups.','Distinguish configured claims from an issued token. Inspect a token only in a prepared diagnostic app; do not paste live tokens into the workshop.'),
   s('Open ID Governance → Entitlement management → Access packages. Compare the Harbor View and Bayside Guest Services Lead packages: resource roles, request policies, approvers, expiry and assignments.','Property access and privileged Admin access require deliberate scope and approval.','Show the two actual packages and their policy differences. A package’s existence is separate from Jordan having an assignment.')
  ]],
  [[18,7],[
   s('Open Jordan’s verified user record → Authentication methods. Review registered methods, then open Authentication methods → Policies to check his eligible methods.','A first sign-in needs a usable bootstrap and a method Jordan can keep using.','Confirm the intended account and an available method before switching to the user profile.'),
   s('Use Jordan’s separate browser profile inside the VM. Open myaccess.microsoft.com and inspect his active assignments and available packages. Open a relevant package to show its request requirements.','Jordan should understand what he can request and whether approval is needed.','If demonstrating a real request, explain that submission starts the configured approval process; show the resulting request status.'),
   s('Open mysignins.microsoft.com/security-info, then myapplications.microsoft.com. Show a registered method or deliberately enroll a supported one; launch the assigned application.','The end of the story is Jordan getting into the application with the intended access.','A working sign-in and actual application permissions. Enrollment requires the prepared authenticator/device, not just a policy toggle.')
  ]]
 ],
 sofia:[
  [[3,7],[
   s('In Entra ID → Users → All users, search Sofia Alvarez and confirm sofia.alvarez@arrow-creations.us. Open Properties and inspect her hire date, manager, department and account state.','Sofia’s first day begins with a reliable source record.','Compare the source’s 15 September 2026 hire date with current attributes; identify who owns any missing data.'),
   s('Open ID Governance → Lifecycle workflows → HL Employee pre-hire. Compare execution conditions with Sofia’s attributes and inspect each configured task.','The pre-hire process should prepare the identity before Sofia reaches the property.','Explain what each configured task actually prepares, without adding tasks that are not present.'),
   s('Open workflow history and locate Sofia’s execution. Inspect the user result and individual task results, then return to her record to verify the resulting assignments.','Sofia benefits only when the preparation succeeds.','A timestamped run and the resulting state, or an explicit explanation of why this is a configuration walkthrough.')
  ]],
  [[20,21,23],[
   s('In intune.microsoft.com, open Devices → All devices and search HL-FRONT-01. Match the record to the prepared hl-frontline-01 VM. Inspect its enrollment, primary user, last check-in and compliance.','The named frontline device is part of Sofia’s working experience.','Verify the actual device, not a similarly named record; a stale compliance result is not proof of its current condition.'),
   s('Inspect HL-Devices-Frontline membership and the device’s assigned configuration, compliance and Windows update policies. Open relevant status details.','Policy targeting determines what Sofia’s device receives.','Show assignments alongside per-device results, including pending or failed settings.'),
   s('On the prepared device, show Windows Settings → Accounts → Access work or school and the managed desktop. Open a prepared application.','The client sees how management reaches the device Sofia uses.','This proves the current managed device. A full Autopilot first-boot demonstration requires a separate eligible device and reset plan.')
  ]],
  [[7,18,23],[
   s('Open Sofia’s Entra user record → Groups and Applications. Note direct assignments and relevant group memberships.','Her housekeeping role should determine useful access.','Record the actual assigned applications rather than assuming the job title grants them.'),
   s('Open Entitlement management → Access packages and compare the built Guest Services Lead packages with the housekeeping experience you propose.','The existing package pattern can inform a new role without implying that it is already deployed.','Label housekeeping as proposed unless the current tenant contains that package and policy.'),
   s('Switch to Sofia’s browser profile, open My Apps, check the account menu, then launch one visible assigned tile. Open My Access to compare available requests.','Sofia’s test is whether she can start her job without a support ticket.','The actual tile and application result; no tile may indicate assignment or application visibility needs investigation.')
  ]],
  [[18],[
   s('In Authentication methods → Policies, inspect Temporary Access Pass and the chosen strong method. Compare include/exclude scope with Sofia’s groups.','Bootstrap access and the long-term method both need to be enabled for the correct person.','Confirm policy eligibility and a compatible authenticator/device before beginning registration.'),
   s('In Sofia’s user record → Authentication methods, inspect existing methods. For a prepared enrollment demo, an authorized operator can create a Temporary Access Pass with an appropriate lifetime and use policy. Deliver it privately.','A TAP is a temporary bootstrap credential, not a permanent shared demo password.','Its validity and allowed use must cover the registration session. The actual TAP must never be placed on this public page.'),
   s('In Sofia’s separate session, sign in with the prepared method and open Security info → Add sign-in method. Complete only the method supported by the device, then verify it appears in Security info.','The user should finish with a method she can use again.','Show the registered method and an intentional follow-up sign-in. Explain that SMS being enabled means the tenant is not wholly passwordless.')
  ]]
 ],nadia:[
  [[4,22],[
   s('In Intune, find Windows enrollment and the remote Autopilot deployment profile. Inspect its deployment mode, join type and out-of-box settings.','Nadia receives her device at home without an onsite technician.','The settings should match the intended remote experience; the lab source marks this scenario as needing a device.'),
   s('Inspect the profile assignment to HL-Autopilot-RemoteCC, its membership rule or members, and the matching Enrollment Status Page assignment.','A correct profile helps only when the intended device receives it.','Verify a prepared device is registered and targeted; show which required apps can block setup.'),
   s('With an eligible prepared device, walk through internet connection, Nadia’s sign-in and enrollment status. Otherwise show the configuration and describe these user steps.','The outcome is an internet-only path into work.','Do not reset the working presentation VM. An already-managed desktop is not proof of a fresh Autopilot deployment.')
  ]],
  [[12,18],[
   s('In Entra Authentication methods → Policies, open the configured external authentication method/provider. Inspect its enabled state and targeted groups.','Nadia should use the approved external authenticator in the intended sign-in flow.','Confirm the current provider configuration and HL-AuthMethod-ExternalProvider targeting.'),
   s('Open Nadia’s user record → Groups. Confirm her membership and inspect the relevant Conditional Access scope in Protection → Conditional Access.','Provider registration, user eligibility and a requirement for authentication are separate checks.','Document include/exclude matches and policy state; do not assume every sign-in triggers the external method.'),
   s('In Nadia’s fresh browser session, open My Apps and follow the actual authentication prompt. Then inspect her sign-in log event → Authentication details and Conditional Access.','The prompt and event connect policy to Nadia’s experience.','Show the method and result actually recorded. If the external method is not offered, investigate targeting rather than presenting it as successful.')
  ]],
  [[27,31],[
   s('Reopen Nadia’s contract-end source and current assignments. Record the end date and time zone used by the control.','The end of the engagement must be interpreted consistently.','A future end date is a planned boundary, not evidence that access has already expired.'),
   s('Inspect the applicable expiry workflow’s scope, schedule and tasks. Open the related access review to show its reviewers, recurrence and result-application settings.','Expiry and review require both a decision and a mechanism that applies it.','Identify which control removes which entitlement and who handles exceptions.'),
   s('Describe the post-expiry checks: workflow history, assignment removal, a fresh sign-in result and application access. Use a separately staged test if a live outcome is required.','The client needs evidence that the date caused the intended access change.','Keep Nadia’s future scenario intact; identify every outcome that has not yet been tested.')
  ]]
 ],sam:[
  [[24],[
   s('Open Intune → Devices → Configuration and show the shared-PC profile and the Edge kiosk profile assigned to HL-Devices-Kiosk.','The kiosk only runs the apps the desk needs.','Assignment by device group is the control; the hardware is a lab VM.'),
   s('Open the device record for hl-kiosk-01 and show Entra join, enrollment and compliance.','A shared device is still a managed device.','Compliance may show a grace period; say so.'),
   s('Open the signed-in Harborline Front Desk in a fresh top-level Chrome profile on the onsite laptop. Show the protected kiosk desktop separately.','The application initiates Entra sign-in; the public sample app remains a separate preview. The kiosk VM proves device controls.','Do not start the passkey prompt inside the workshop frame or assume the remote VM can use the laptop’s passkey.' )
  ]],
  [[3,24],[
   s('Open Protection → Conditional Access → Policies → HL-CA04. Show the twelve-hour sign-in frequency for shared devices and the report-only state.','Eight prompts a shift become one when the policy is right.','Report-only: show the what-if outcome, not enforcement.'),
   s('Open Authentication methods and confirm the passkey policy includes Sam’s account. Then inspect his registered methods.','Entra, not the Front Desk page, decides whether a passkey is available at sign-in.','Only describe the method as configured if the policy and registration are visible in the tenant.'),
   s('Open PIM and show Riley Support eligible for Authentication Administrator scoped to one administrative unit.','A lost method mid-shift is recovered by a scoped operator, not a password reset.','Activation is just-in-time; do not activate it live unless rehearsed.')
  ]],
  [[24],[
   s('On the kiosk, sign out of the application and Windows as the profile requires.','The person leaves, the device stays controlled.','Follow the prepared kiosk mode exactly.'),
   s('Open a new session and show nothing of Sam’s remains.','The morning team inherits nothing.','Browser state, sessions and local data are cleared.'),
   s('Mention use case 25, offline behaviour, as a separate demonstration.','Do not imply first-time cloud sign-in works offline.','Keep the two scenarios separate.')
  ]]
 ],
 tom:[
  [[5,6,27],[
   s('Open Entra ID → Users → All users → Tom Reilly. Confirm tom.reilly@arrow-creations.us and inspect account status and the prepared contract-end source.','Tom’s HVAC engagement has ended; the question is whether access ended with it.','Compare the reference 31 July date with current values. Show current enabled/disabled state without editing it.'),
   s('Open Groups and Applications. Inspect remaining memberships and assignments. Open Sign-in logs with a relevant date range and application filter.','An enabled flag, a remaining assignment and actual use are different kinds of evidence.','Record the precise event date and result. No event in the selected log window does not prove no historical activity.'),
   s('Choose an application actually assigned to Tom’s Workforce account. In a fresh persona browser session, attempt to open it and record the result. If an approved removal is run later, repeat the same request in a new session.','A before-and-after result on the same protected resource shows what Workforce cleanup changed.','Match the Workforce account, application, time and failure reason in its sign-in and audit records. Do not disable Tom merely to present the starting state.')
  ]],
  [[5,6,31],[
   s('Open Lifecycle workflows → HL Vendor contract expiry. Compare its scope and trigger attributes with Tom’s actual record.','A configured workflow can miss a person when scope or source data is wrong.','Show the exact match or mismatch; a past contract date does not itself execute a workflow.'),
   s('Open its history, locate Tom and inspect per-task status and timestamps. If no run exists, identify that gap explicitly.','The failure might be eligibility, scheduling, execution or downstream removal.','Do not choose a cause without evidence; distinguish a missing run from a failed task.'),
   s('Open ID Governance → Access reviews. Inspect the prepared reviews, their resource scope, reviewers, status and application of results.','A review only changes access if it reaches a decision and the result is applied.','The reference reviews were staged and had not run. Show their present state and remaining action owner.')
  ]],
  [[34],[
   s('Open the prepared review-agent case for Tom. Read the cited identity, end date, assignments and activity evidence before its recommendation.','An actionable review starts with evidence tied to the correct person.','Check freshness, source and scope; separate scenario narrative from actual retrieved records.'),
   s('Walk through each proposed change, affected entitlement, approver and execution owner. Explain the effect on Tom’s next sign-in and existing app sessions.','The reviewer needs to understand the consequences before approving cleanup.','A proposed disable or removal remains a proposal until the relevant control executes.'),
   s('If a cleanup was intentionally approved and run, show the execution result and audit trail, refresh Tom’s record, and use a fresh persona session to verify access. Otherwise finish at the decision point.','The outcome needs both administrative evidence and a user-side result.','Keep the before-state, decision and after-state separate; record failures and remaining downstream access.')
  ]],
  [[5],[
   s('Switch to the External ID tenant (harborlineext) and open Users → Tom Reilly. Show the ClimateWorks HVAC company attribute.','The same human holds a second identity in a second population.','This account is untouched by the workforce leaver process.'),
   s('In a separate persona session, sign in to the real Supplier Desk as tom.reilly@climateworks.example and open a ClimateWorks resource. After a separately approved external removal, retry that same resource in a fresh session.','The External ID supplier relationship has a different lifecycle from Tom’s Workforce identity.','Use the private External ID credential. Match the External ID sign-in and API allow or deny response; a Workforce denial is not proof that Supplier Desk access ended.'),
   s('Ask who owns the external lifecycle for vendors in the client’s environment.','Two populations need two owners and two end dates.','Tie it back to use case 5, population placement.')
  ]]
 ],
 kwame:[
  [[27,33],[
   s('Open Kwame Mensah in All users and verify kwame.mensah@arrow-creations.us. Compare his departure source with the account status.','Kwame provides a second leaver case to contrast with Tom.','The reference departure is 10 September and the script describes a disabled account; verify current values.'),
   s('Open Tom’s record in another administrator tab. Compare both end dates and current enabled flags using the same fields.','The same business event can produce different outcomes when controls or scope differ.','Explain only the differences supported by the two records; do not treat either snapshot as a live fact.'),
   s('Identify an application Kwame had assigned before departure. In a prepared fresh user profile, try to open that protected app using the privately held lab credential. Record the actual result and corresponding sign-in event.','A fresh attempt against a named application tests the user-facing departure boundary.','Use the event’s actual reason to explain a denial. Do not re-enable Kwame to make the demonstration succeed; a missing assignment and a disabled account are different results.')
  ]],
  [[27,31,33],[
   s('Open the applicable leaver workflow → History. Find Kwame’s run and inspect each configured task’s result and time.','Disabling, revoking and removing access are separate outcomes.','Use actual task results; do not assume the workflow name implies all three actions occurred.'),
   s('On Kwame’s user record, inspect Groups and Applications. Compare expected removals with current assignments and any relevant downstream provisioning records.','A disabled identity can still have stale entitlements or a separate application account.','List access that remains and whether a downstream app confirms removal.'),
   s('Inspect directory audit and sign-in records for the relevant disable/revocation actions. In the prepared application, distinguish a fresh sign-in from an existing session.','Existing sessions and application behavior need their own verification.','Do not claim that the account-disabled flag proves every application session has ended.')
  ]],
  [[34],[
   s('Build the story in timestamp order: departure source, workflow run, directory changes, application records and observed user result. Show each supporting screen.','The next team should be able to reconstruct what happened.','Normalize time zones and identify any missing link in the chain.'),
   s('Inspect the prepared scenario’s claim of post-termination activity against sign-in and application logs. Check identity, event time, result and application.','A scenario claim becomes a finding only when records support it.','If the event cannot be found or is outside retention, state that limit rather than implying it occurred.'),
   s('Return to Tom’s evidence and compare the two outcomes. Ask who owns source data, workflow failures and downstream exceptions in the client’s environment.','The workshop should end with an operational owner and acceptance criteria.','Agree how the client will prove the account, sessions and entitlements are closed, and who handles anything still open.')
  ]]
 ],
 aiko:[
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
 ]
};

const highlights = {
 elena: [
  ['Show the partner sign-up page','Find Elena in the external tenant','Prove there is no workforce account'],
  ['Show the flow and its three applications','Land Elena on the scorecard','Find her sign-in in the external logs'],
  ['Show Franchise.Manager on the hub app','Watch the API refuse royalties','Compare with Lena, the owner'],
  ['Search the workforce tenant for petrova','Explain recovery in the external tenant','Rehearse the role removal']
 ],
 samfed: [
  ['Open the franchise kiosk in Intune','Check its compliance assignment','Compare with the managed-hotel kiosk'],
  ['Inspect the shared-device policy','Show the federated domain','Explain HarborPass as the stand-in provider'],
  ['Sign in as sam.fed','Approve the number match at HarborPass','Find the federated sign-in in the logs']
 ],
 jordan: [
  ['Find Jordan’s identity records','Confirm the hire and contract dates','Compare the access he has today'],
  ['Check the pre-hire workflow','Verify Jordan’s execution history','Review the proposed identity handover'],
  ['Show franchise access in Front Desk','Switch to managed and show franchise denied','Switch back and compare Entra assignments'],
  ['Confirm Jordan’s sign-in method','Show his requests and assignments','Launch an application as Jordan']
 ],
 sofia: [
  ['Confirm Sofia’s hire record','Inspect first-day preparation','Verify what actually ran'],
  ['Find Sofia’s frontline device','Check policies and compliance','Show her managed desktop'],
  ['Review Sofia’s current access','Explain the housekeeping access pattern','Open her assigned applications'],
  ['Check eligible authentication methods','Prepare a private bootstrap credential','Show registration and sign-in']
 ],nadia: [
  ['Inspect remote device setup','Verify profile and group targeting','Walk through arrival at the desktop'],
  ['Inspect the external authenticator','Confirm Nadia’s policy scope','Match her prompt to sign-in evidence'],
  ['Verify the engagement end date','Trace expiry and review controls','Define the proof of access removal']
 ],sam: [
  ['Show the kiosk profiles','Open the kiosk device record','Open the kiosk session'],
  ['Show HL-CA04 report-only','Show passkeys for the no-mobile population','Show the scoped recovery operator'],
  ['Sign out as the profile requires','Show the next session is clean','Keep offline behaviour separate']
 ],tom: [
  ['Compare contract end and account state','Inspect access that remains','Observe Tom’s actual sign-in result'],
  ['Check the expiry workflow scope','Locate execution gaps or failures','Review decisions and applied results'],
  ['Read the review agent’s evidence','Explain the proposed cleanup decision','Verify outcomes after approved execution'],
  ['Find Tom in the External ID tenant','Try Supplier Desk in a fresh session','Separate its result from Workforce access']
 ],
 kwame: [
  ['Verify the departure and account state','Compare Kwame’s outcome with Tom’s','Test the fresh sign-in boundary'],
  ['Inspect offboarding task results','Check remaining application access','Verify revocation and session behavior'],
  ['Build the timestamped evidence trail','Validate claims against actual records','Agree owners and completion criteria']
 ],
 aiko: [
  ['Build the agent as Aiko','Read the evidence: identity, owner, scopes requested','Find it in Enterprise applications'],
  ['Approve as Chris with one scope refused','Read the granted roles on the principal','Explain who approves scope in your estate'],
  ['Run the late checkout','Read the token line and the answer','Open Activity: the agent’s own sign-ins'],
  ['Read the agent-to-agent hops','Point at the refused message step','Run the payroll question and read the refusal'],
  ['Retire the agent','Confirm the principal is disabled and roleless','Show access reviews for application roles']
 ]
};

export function buildDemoGuide(p,index,isUser){
 const m=p.moments[index], [ids,admin]=guides[p.id][index], account=userAccount(p), u=userMoments[p.id][index];
 return {company:companyStories[p.id],personId:p.id,momentIndex:index,name:p.name,time:m.time,title:m.title,why:m.body,perspective:isUser?'User view':'Admin view',job:p.job,story:p.intro,
  ...(['sam','samfed','jordan'].includes(p.id)?{liveUrl:new URL(`./desk.html?stage=1${p.id==='jordan'?'&persona=jordan':p.id==='samfed'?'&persona=samfed':''}`,import.meta.url).href,authUrl:p.id==='sam'?'https://kind-beach-0ba2dc30f.6.azurestaticapps.net/desk-auth.html':undefined,liveLabel:p.id==='jordan'?'Front Desk · property transfer':p.id==='samfed'?'Front Desk · franchise context':'Harborline Front Desk',liveKind:'front desk demo app',demoPreview:true}:{}),
  account,domain:account.split('@')[1],cases:ids.map(id=>cases.find(c=>c.id===id)).filter(Boolean),caution:p.caution,question:p.question,evidence:m.evidence,
  highlights:highlights[p.id][index],admin, user:p.id==='sam'?[
   s('In top-level Chrome, open Harborline Front Desk and select Sign in with Microsoft Entra. On the Microsoft page choose Sign-in options → Face, fingerprint, PIN or security key. Use Sam’s registered passkey, then watch the browser return to Front Desk.','This shows the app-initiated sign-in and the handoff back to a named Front Desk session.','If Sam has no registered passkey or Entra does not offer it, stop and label the passkey proof unverified. Use the kiosk VM separately for device claims.'),
   s('Check the account shown in Front Desk, then find the matching Entra sign-in event and Authentication Details.','The app return shows an Entra session; the sign-in record identifies the method actually used.','Match Sam, Harborline Desk (OIDC), result and time. Do not infer passkey use from the app screen alone.'),
   s('Check in Maya Chen to a ready King room, then mark a cleaned room ready and check in Priya Shah.','Room readiness is a useful, visible business decision; a shared device must not mean shared guest-work attribution.','Show room status and the activity trail change inside the demo app. These are simulated operational changes.'),
   s('Create or finish one guest service request. Choose End shift, then sign out of Entra.','The next worker must not inherit the previous application view or browser account.','The sample work resets in memory; separately prove Windows/browser cleanup on hl-kiosk-01.'),
   s('On the protected kiosk VM, inspect the actual Windows session, browser sign-in and policy evidence.','The OIDC return proves app sign-in, while device controls and Conditional Access require their own evidence.','The guest data is synthetic. A successful client-side sign-in is not proof of server-side PMS authorization.')
  ]:[
   s(`Inside the VM, open ${p.name}’s separate browser profile or a new InPrivate window. Open myapplications.microsoft.com and check the account menu. Use ${account} when asked to sign in.`,`${p.name}’s experience must be shown with the persona identity, separate from the administrator and Windows desktop logins.`,`Use the existing private credential and configured MFA method. For Sam’s federation story, follow HarborPass; do not substitute his workforce account. For leaver stories, denial may be the correct result.`),
   ...u.slice(1).map((action,i)=>s(action,i===0?m.body:`Connect this action to ${p.name}’s job as ${p.job.toLowerCase()} and the current moment: ${m.short}.`,i===0?'Pause on the account menu and relevant application, request or method screen. Explain the result actually shown.':m.evidence)),
   s('Return to the administrator profile and locate the corresponding record, request, assignment or sign-in event. Match the identity and time with what the audience just saw.','The user experience and the underlying control should tell the same story.',m.evidence)
  ],userTitle:u[0]};
}
