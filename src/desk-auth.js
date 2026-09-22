import {createStandardPublicClientApplication} from '@azure/msal-browser';

// Public identifiers only. The application has no client secret or tenant write permission.
const clientId='414705c7-3636-4d30-85a8-96dd0250f978';
const tenantId='46e49e46-3372-4491-a6e3-3988ca835f8d';
const liveEntry='https://kind-beach-0ba2dc30f.6.azurestaticapps.net/desk-auth.html';
const canSignIn=location.origin===new URL(liveEntry).origin||['localhost','127.0.0.1'].includes(location.hostname);
const redirectUri=new URL('./desk-redirect.html',location.href).href;
const root=document.querySelector('#desk-app');
const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const backLink=new URL('./desk.html',location.href).href;
let msal;

function gate(message='Your Entra account opens a named Front Desk session.',error=''){
  root.innerHTML=`<div class="auth-page"><header class="auth-top"><div class="auth-brand"><img src="./assets/harborline-mark.svg" alt=""><span><strong>Harborline</strong><small>FRONT DESK</small></span></div><span class="auth-environment">WORKFORCE IDENTITY DEMO</span></header><main class="auth-main"><section class="auth-copy"><div class="eyebrow">One sign-in · one application session</div><h1>Start at the desk.<br><em>Arrive as yourself.</em></h1><p>Open Harborline Front Desk with your assigned Microsoft Entra identity. The browser takes you to Entra for sign-in and returns here after the tenant accepts it.</p><ol class="auth-flow"><li><b>01</b><span><strong>Open the application</strong><small>The app requests a Workforce tenant session.</small></span></li><li><b>02</b><span><strong>Sign in at Microsoft Entra</strong><small>Open Sign-in options and choose Face, fingerprint, PIN or security key.</small></span></li><li><b>03</b><span><strong>Return to Front Desk</strong><small>The signed-in account appears in the app header.</small></span></li></ol></section><section class="auth-card" aria-label="Front Desk sign-in"><img src="./assets/harborline-mark.svg" alt=""><span class="auth-card-kicker">HARBORLINE · BALLARD LOCKS HOUSE</span><h2>Your shift starts here.</h2><p>${escape(message)}</p>${error?`<div class="auth-error" role="alert">${escape(error)}</div>`:''}${canSignIn?`<button class="btn primary auth-button" id="start-signin" type="button" ${msal?'':'disabled'}>Sign in with Microsoft Entra <span aria-hidden="true">↗</span></button>`:`<a class="btn primary auth-button" href="${liveEntry}">Open the signed-in app <span aria-hidden="true">↗</span></a>`}<a class="auth-preview-link" href="${backLink}">View the public sample app</a><div class="auth-clarity">Passkey availability is controlled by the tenant and the account. This page does not collect your password or passkey.</div></section></main><footer class="auth-footer"><span>MajorKey identity workshop · Harborline reference lab</span><span>Sample hotel data · no PMS connection</span></footer></div>`;
  root.querySelector('#start-signin')?.addEventListener('click',async()=>{
    try{await msal.loginRedirect({scopes:['openid','profile']});}
    catch(error){console.error('Front Desk sign-in could not start',error);gate('Microsoft Entra sign-in could not start.','Try again in a fresh top-level browser tab.');}
  });
}

async function start(){
  if(!canSignIn){gate('The signed-in application opens on the Harborline Azure site. Continue there in a top-level browser tab.');return;}
  if(window.self!==window.top){
    gate('Open this sign-in in a separate browser tab. Microsoft Entra does not run its interactive prompt inside the workshop frame.');
    return;
  }
  gate('Preparing Microsoft Entra sign-in…');
  try{
    msal=await createStandardPublicClientApplication({
      auth:{clientId,authority:`https://login.microsoftonline.com/${tenantId}`,redirectUri,navigateToLoginRequestUrl:false},
      cache:{cacheLocation:'sessionStorage'}
    });
    const result=await msal.handleRedirectPromise();
    const account=result?.account||msal.getActiveAccount()||msal.getAllAccounts()[0];
    if(!account){gate();return;}
    const token=result?.idToken?result:await msal.acquireTokenSilent({scopes:['openid','profile'],account});
    if(!token?.idToken){gate('The previous session could not be confirmed. Sign in again.');return;}
    msal.setActiveAccount(account);
    window.__deskIdentity={name:account.name||account.username||'Front desk team member',username:account.username||'',tenantId:account.tenantId||''};
    window.addEventListener('desk-signout',()=>msal.logoutRedirect({account,postLogoutRedirectUri:new URL('./desk-auth.html',location.href).href}));
    await import('../dist/desk.js');
  }catch(error){
    console.error('Front Desk authentication failed',error);
    gate('The application did not receive a usable Entra session.','Sign-in was not completed. Check that this account is assigned to Harborline Desk, then try again in a new browser tab.');
  }
}
start();
