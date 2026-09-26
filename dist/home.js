import {people} from './data.js?v=20260925-clientcases1';

const workforceIndexes=[0,2,3,5,6,7,8];
const workforceMeta={
  sofia:['JOINER','First-day readiness','Hire → device → access'],
  jordan:['IDENTITY CHANGE','Franchise to managed','Transfer → property access'],
  sam:['SHARED WORKPLACE','Managed-hotel kiosk','Passkey → app → handover'],
  tom:['GOVERNANCE GAP','Workforce vendor identity','End date → removal → denial'],
  nadia:['TIME-BOUND WORK','Remote contractor','Remote setup → expiry'],
  kwame:['LEAVER','Employee departure','Disable → revoke → prove'],
  aiko:['AGENT IDENTITY','An agent with an identity','Build → approve → prove']
};
const external=[
  {name:'Evan Torres',portrait:'./assets/personas/evan-torres.webp',kind:'PARTNER DEVELOPER',title:'Register an integration. Protect the API.',copy:'A partner signs in, establishes company trust, registers an integration and receives only the machine scope the API allows.',proof:'Sign up → register → allow → deny',href:'#evan/experience',aiHref:'#evan/ai',cta:'Open integration journey',primary:true},
  {name:'Elena Petrova',portrait:'./assets/personas/elena-petrova.webp',kind:'FRANCHISE MANAGER',title:'Run a franchise without becoming an employee.',copy:'External ID handles Elena’s branded sign-in while the Franchise Hub enforces her company, location and role.',proof:'Join → verify business → scoped access',href:'#elena-franchise/experience',aiHref:'#elena-franchise/ai',cta:'Open franchise journey'},
  {name:'Tom Reilly',portrait:'./assets/personas/tom-reilly.webp',kind:'EXTERNAL SUPPLIER',title:'Give a supplier useful work, within a boundary.',copy:'Tom’s supplier identity is separate from his Workforce guest. The Supplier Desk and API enforce ClimateWorks scope.',proof:'Sign in → work order → API decision',href:'#tom-vendor/experience',aiHref:'#tom-vendor/ai',cta:'Open supplier journey'},
  {name:'Marguerite Okafor',portrait:'./assets/personas/marguerite-okafor.svg',kind:'CONTRACTED OPERATOR',title:'Let the company that employs them keep the roster.',copy:'Housekeeping, the spa and valet at Harbor View are run by other companies whose people change every week. Harborline approves the company and the dates. Their own supervisor adds and removes their people, and confirms the roster each month.',proof:'Who holds access → dormant and unconfirmed → close a contract and everyone goes at once',href:'https://harborlinecc7795.z1.web.core.windows.net/operators.html',cta:'Open the operator console',aiHref:'https://harborlinecc7795.z1.web.core.windows.net/operator-team.html',aiLabel:'Open the operator’s own portal'},
  {name:'Sam Okoro',portrait:'./assets/personas/sam-okoro.webp',kind:'FEDERATED FRANCHISE KIOSK',title:'Keep the desk standard. Let the franchise own sign-in.',copy:'The franchise owns the credential and device context; Harborline applies its kiosk standard and verifies the resulting session.',proof:'Federate → Front Desk → clean handover',person:4,aiHref:'#samfed/1/ai',cta:'Open franchise kiosk story'}
];
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function modelCard(item,index,model){
 const action=item.href?`<a class="journey-card-action" href="${item.href}">${esc(item.cta)} →</a>`:`<button class="journey-card-action" data-action="person" data-value="${item.person??index}">${esc(item.cta||'Open workforce story')} →</button>`;
  const secondHref=item.aiLabel?item.aiHref:null;
 const aiHref=item.aiHref||`#${item.id}/1/ai`;
 const secondLink=secondHref?`<a class="journey-card-second" href="${secondHref}">${esc(item.aiLabel)} →</a>`:`<a class="journey-card-ai" href="${aiHref}"><span>✦</span> See how the agent helps</a>`;
return `<article class="journey-card ${model==='external'?'external-model':'workforce-model'} ${item.primary?'featured':''}">
   <div class="journey-card-person"><img src="${esc(item.portrait)}" alt="Portrait of ${esc(item.name)}"><div><span class="journey-kind">${esc(item.kind)}</span><h3>${esc(item.name)}</h3></div></div>
   <h4>${esc(item.title)}</h4><p>${esc(item.copy)}</p>
   <div class="journey-proof"><span>WHAT YOU SHOW</span><strong>${esc(item.proof)}</strong></div><div class="journey-card-actions">${action}${secondLink}</div>
 </article>`;
}

function externalJourneys(){
 return `<section class="journey-collection external-collection" id="external-journeys" aria-labelledby="external-title">
   <header class="collection-heading"><div><span class="collection-number">01</span><span class="collection-model">EXTERNAL &amp; FRANCHISE IDENTITY</span><h2 id="external-title">People outside the workforce.<br>Access inside a business application.</h2></div><p>Use this collection for customers, franchisees, suppliers and integration partners. Microsoft Entra External ID establishes the person; the application and API enforce the business relationship.</p></header>
   <div class="collection-guide"><span>External tenant</span><i>→</i><span>Branded sign-in</span><i>→</i><span>Business trust</span><i>→</i><span>Application decision</span></div>
   <div class="journey-card-grid external-grid">${external.map((item,i)=>modelCard(item,i,'external')).join('')}</div>
 </section>`;
}

function workforceJourneys(){
 const cards=workforceIndexes.map(index=>{
   const p=people[index],meta=workforceMeta[p.id];
   return modelCard({id:p.id,name:p.name,portrait:p.portrait,kind:meta[0],title:meta[1],copy:p.intro,proof:meta[2],person:index,cta:'Open workforce story'},index,'workforce');
 }).join('');
 return `<section class="journey-collection workforce-collection" id="workforce-journeys" aria-labelledby="workforce-title">
   <header class="collection-heading"><div><span class="collection-number">02</span><span class="collection-model">INTERNAL WORKFORCE IDENTITY</span><h2 id="workforce-title">The employee and collaborator lifecycle.<br>From first day to final removal.</h2></div><p>Use this collection for employees, guests, contractors and shared workplace devices. Follow the source event into identity, authentication, access and application evidence.</p></header>
   <div class="collection-guide"><span>Workforce tenant</span><i>→</i><span>Join or change</span><i>→</i><span>Access and devices</span><i>→</i><span>Removal evidence</span></div>
   <div class="journey-card-grid workforce-grid">${cards}</div>
   <div class="comparison-note"><strong>Two identities, one person</strong><span>Tom’s Workforce vendor record is demonstrated here. His separate External ID supplier identity remains in the External &amp; franchise collection above.</span><a href="#tom-vendor/experience">Compare Tom’s supplier identity →</a></div>
 </section>`;
}

export function homePage(){return `<div class="home-shell"><header class="home-header"><a href="#home" aria-label="MajorKey workshop home"><img src="./assets/majorkey-logo-dark.svg" alt="MajorKey" width="180" height="32"></a><span>IDENTITY EXPERIENCE STUDIO</span><span class="harborline-client topbar-client" aria-label="Client: Harborline Hotels"><img src="./assets/harborline-mark.svg" alt="" width="24" height="24"><b>Harborline</b><small>Hotels &amp; Resorts</small></span><a class="quiet studio-compare" href="#identity-models/overview">Compare identity models</a><a class="quiet studio-clips" href="./clips.html">Demo clips</a><button class="quiet studio-prep" data-action="ready">Presenter preparation</button><button class="quiet" data-action="agenda">Workshop agenda ↗</button></header><main class="home-main">
 <section class="hub-hero"><div><span class="studio-kicker">HARBORLINE IDENTITY WORKSHOP</span><h1>Choose the identity model.<br><em>Then follow the person.</em></h1><p>Every journey connects a recognizable business moment to the administrator control, the user experience and the proof that the outcome occurred.</p><a class="identity-compare-launch" href="#identity-models/overview"><span><b>Not sure which model?</b><small>Compare an employee, a Workforce B2B collaborator and an External ID customer.</small></span><i>Open the comparison →</i></a></div><nav class="model-choice" aria-label="Choose an identity model"><a href="#external-journeys"><b>01</b><span><strong>External &amp; franchise</strong><small>Customers, partners, suppliers and franchisees</small></span><i>↓</i></a><a href="#workforce-journeys"><b>02</b><span><strong>Internal workforce</strong><small>Employees, guests, contractors and shared devices</small></span><i>↓</i></a></nav></section>
 ${externalJourneys()}${workforceJourneys()}
 <footer class="home-footer"><span>MajorKey · Harborline reference lab · Azure edition</span><div><button class="quiet" data-action="catalog">Browse 34 use cases</button><button class="quiet" data-action="ready">Presenter preparation</button></div></footer></main></div><dialog id="modal" aria-labelledby="modal-title"></dialog>`;}
