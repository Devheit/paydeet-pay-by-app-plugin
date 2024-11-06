import { appRootId } from '../const/app-constants';
import setupDom, { tearDownDom } from './dom-setup';

function closeApp(appReference) {
  if (typeof appReference.close === 'function') {
    tearDownDom();
    return appReference.close().then(() => {
      console.info(
        '<====== Thank you for using the pay by app experience powered by https://www.paydeet.com/ ======>'
      );
    });
  }
}

function checkout({ amount, merchantId }) {
  setupDom();
  let appRef;
  if (!amount) {
    return {
      success: false,
      message: 'Please provide a valid amount.',
      callbackUrl: null,
    };
  }
  if (!merchantId) {
    return {
      success: false,
      message: 'Please provide a valid merchantId.',
      callbackUrl: null,
    };
  }

  appRef = PayByAppWidget({
    merchantId,
    amount,
    onCloseApp: async (response) => {
      await closeApp(appRef);
      return response;
    },
  });

  appRef.render(`#${appRootId}`).then(() => {
    console.info(
      '<====== Welcome to the pay by app experience powered by https://www.paydeet.com/ ======>'
    );
  });
}

export default checkout;
