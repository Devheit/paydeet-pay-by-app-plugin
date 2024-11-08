import { appRootId } from '../const/app-constants';
import validateMainProps from '../util/validate-props';
import { setupDom, tearDownDom } from './dom-setup';
import PayByAppWidget from './Widget';

async function closeApp(appReference) {
  if (typeof appReference.close === 'function') {
    await tearDownDom();
    appReference
      .close()
      .then(() => {
        console.info(
          '<====== Thank you for using the pay by app experience powered by https://www.paydeet.com/ ======>'
        );
      })
      .catch((err) => {
        console.error('Failed to close the app', err);
      });
  }
}

async function checkout(props) {
  return new Promise((resolve, reject) => {
    const validateResponse = validateMainProps(props);
    if (!validateResponse.isValid) {
      return reject({
        success: false,
        message: `Please provide a valid ${validateResponse.key}`,
        callbackUrl: null,
      });
    }
    setupDom();
    let appRef;
    appRef = PayByAppWidget({
      ...props,
      onSuccess: async (successResponse) => {
        await closeApp(appRef)
        resolve({
          success: true,
          message: successResponse,
          callbackUrl: null,
        });
      },
      onError: async() => {
        await closeApp(appRef);
        reject({
          success: false,
          message: 'Payment failed.',
          callbackUrl: null,
        });
      },
      onClose: async () => {
        await closeApp(appRef);
        resolve({
          success: false,
          message: 'Payment cancelled.',
          callbackUrl: null,
        });
      },
    });
    appRef.render(`#${appRootId}`).then(() => {
      console.info(
        '<====== Welcome to the pay by app experience powered by https://www.paydeet.com/ ======>'
      );
    });
  });
}

export default checkout;
