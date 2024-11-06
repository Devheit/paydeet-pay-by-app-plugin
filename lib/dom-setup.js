import { appRootId, frameInClass, frameOutClass } from '../const/app-constants';

function setupDom() {
  const payByApp = document.createElement('div');
  payByApp.setAttribute('id', appRootId);
  document.body.appendChild(payByApp);
}

async function tearDownDom() {
  return new Promise(async function (resolve, reject) {
    const payByApp = document.getElementById(appRootId);
    if (payByApp) {
      // before removing child, simulate shutdown animation
      const frame = payByApp.querySelector('iframe.frame-in');
      if (frame) {
        frame.classList.remove(frameInClass);
        frame.classList.add(frameOutClass);
      }
      frame.addEventListener('animationend', () => {
        document.body.removeChild(payByApp);
        resolve();
      });
    }
  });
}

export { setupDom, tearDownDom };
