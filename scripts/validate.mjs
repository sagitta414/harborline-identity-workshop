import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {people,URLS} from '../dist/data.js';
import {agenda,cases} from '../dist/workshop.js';
import {architectures,momentCases} from '../dist/architecture-models.js';
import {evanGuide,partnerPage} from '../dist/partner.js';
import {homePage} from '../dist/home.js';
assert.equal(people.length,9);
assert.equal(new Set(people.map(p=>p.id)).size,9);
assert.equal(evanGuide().cases.length,8);
assert.equal(evanGuide().name,'Evan Torres');
assert.equal(agenda.find(a=>a.route==='evan/experience')?.minutes,60);
const partnerLive=partnerPage('live');
for(const label of ['Evan signs in','Integration registered','App-only token','Allow or deny'])assert.ok(partnerLive.includes(label),`Missing partner handoff: ${label}`);
assert.doesNotMatch(partnerLive,/Nadia Haddad|NADIA’S|LIVE · Harborline Integration Exchange connected/);
const renderedHome=homePage();
assert.equal((renderedHome.match(/external-model/g)||[]).length,4);
assert.equal((renderedHome.match(/workforce-model/g)||[]).length,7);
assert.equal((renderedHome.match(/journey-card-ai/g)||[]).length,11);
const partnerAI=partnerPage('ai');
for(const label of ['Partner API Evidence Agent','IDENTITY SIGNALS','HUMAN DECISION','APPLICATION PROOF'])assert.ok(partnerAI.includes(label),`Missing partner AI story element: ${label}`);
assert.deepEqual(cases.map(c=>c.id),Array.from({length:34},(_,i)=>i+1));
assert.equal(agenda.reduce((sum,a)=>sum+a.minutes,0),480);
let previousEnd=null;
const mins=t=>Number(t.split(':')[0])*60+Number(t.split(':')[1]);
for(const a of agenda){assert.equal(mins(a.end)-mins(a.time),a.minutes);if(previousEnd)assert.equal(a.time,previousEnd);previousEnd=a.end;}
for(const p of people){assert.ok(p.moments.length>=3);for(const id of p.cases)assert.ok(cases.find(c=>c.id===id));for(const m of p.moments){assert.ok(m.setup.length&&m.evidence&&m.links.length);assert.ok(m.node>=0&&m.node<=4);for(const [,key] of m.links)assert.ok(URLS[key],`Unresolved portal link: ${key}`);}}
for(const c of cases)assert.ok(URLS[c.target],`Unresolved case link: ${c.target}`);
for(const c of cases){const a=architectures[c.id];assert.ok(a,`Missing architecture: ${c.id}`);assert.equal(a.nodes.length,4);assert.ok(a.nodes.every(n=>n.length===3&&n.every(Boolean)));assert.equal(a.flows.length,3);for(const field of ['outcome','decision','custom','proof','ai'])assert.ok(a[field],`Missing ${field}: ${c.id}`);}
for(const p of people){assert.equal(momentCases[p.id].length,p.moments.length);for(const ids of momentCases[p.id])for(const id of ids)assert.ok(p.cases.includes(id),`Architecture ${id} is not connected to ${p.id}`);}
const html=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
for(const [,asset] of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g))await access(new URL('../dist/'+asset,import.meta.url));
const home=await readFile(new URL('../dist/home.js',import.meta.url),'utf8');
const app=await readFile(new URL('../dist/app.js',import.meta.url),'utf8');
assert.match(home,/EXTERNAL &amp; FRANCHISE IDENTITY/);
assert.match(home,/INTERNAL WORKFORCE IDENTITY/);
assert.doesNotMatch(home+app,/Rewards|loyalty/i);
assert.match(app,/all nine stories, the live consoles and all three partner portals/);
for(const p of people){assert.ok(p.console&&p.console.name&&p.console.url&&p.console.who&&p.console.does,`Missing live console: ${p.id}`);assert.ok(URLS[p.console.url]||/^https:/.test(p.console.url),`Unresolved console link: ${p.id}`);}
console.log('Validated nine day-in-the-life personas with live consoles, the partner developer journey, 34 use cases, all portal mappings, contiguous 480-minute agenda and local entrypoint assets.');
