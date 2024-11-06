import { appRootId, frameInClass, frameOutClass } from '../const/app-constants';

function setupDom() {
  const payByApp = document.createElement('div');
  payByApp.setAttribute('id', appRootId);
  if (!document.startViewTransition) {
    document.body.appendChild(payByApp);
    return;
  }
  document.startViewTransition(() => {
    document.body.appendChild(payByApp);
  });
}

function tearDownDom() {
  const payByApp = document.getElementById(appRootId);
  if (payByApp) {
    // before removing child, simulate shutdown animation
    const frame = payByApp.querySelector('iframe.frame-in');
    frame.classList.remove(frameOutClass);
    frame.classList.remove(frameInClass);
    frame.classList.add(frameOutClass);
    if (!document.startViewTransition) {
      document.body.removeChild(payByApp);
      return;
    }
    document.startViewTransition(() => {
      document.body.removeChild(payByApp);
    });
  }
}

export { setupDom, tearDownDom };
