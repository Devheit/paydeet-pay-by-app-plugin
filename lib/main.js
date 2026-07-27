import { appRootId } from '../const/app-constants.js';
import validateMainProps from '../util/validate-props.js';
import { setupDom, tearDownDom } from './dom-setup.js';
import PayByAppWidget from './widget.js';

async function closeWidget(appReference) {
  if (typeof appReference.close === 'function') {
    await tearDownDom();
    appReference
      .close() 
      .then(() => {
        console.info(
          '<====== Thank you for using the pay by app experience powered by https://www.paydeet.com/ ======>',
        );
      })
      .catch((err) => {
        console.error('Failed to close the app', err);
      });
  }
}

async function checkout(props) {
  return new Promise(async (resolve, reject) => {
    const validateResponse = validateMainProps(props);
    if (!validateResponse.isValid) {
      return reject({
        success: false,
        message: `Please provide a valid ${validateResponse.key}`,
        callbackUrl: null,
      });
    }
    const windowDetails = await setupDom();
    let appRef;
    appRef = PayByAppWidget({
      ...props,
      onSuccess: async function (successResponse) {
        await closeWidget(appRef);
        resolve({
          success: true,
          message: successResponse,
          callbackUrl: null,
        });
      },
      windowWidth: windowDetails.windowWidth,
      onError: async function () {
        await closeWidget(appRef);
        reject({
          success: false,
          message: 'Payment failed.',
          callbackUrl: null,
        });
      },
      onClose: async function () {
        await closeWidget(appRef);
        resolve({
          success: false,
          message: 'Payment cancelled.',
          callbackUrl: null,
        });
      },
    });
    appRef.render(`#${appRootId}`).then(() => {
      console.info(
        '<====== Welcome to the pay by app experience powered by https://www.paydeet.com/ ======>',
      );
    });
  });
}

export default checkout;
