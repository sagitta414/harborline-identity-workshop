import {broadcastResponseToMainFrame} from '@azure/msal-browser/redirect-bridge';
broadcastResponseToMainFrame().catch(()=>{
  document.body.textContent='The sign-in response could not be returned to Front Desk. Close this tab and try again.';
});
