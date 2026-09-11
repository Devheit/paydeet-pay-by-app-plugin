import {
  validCurrencyMap,
} from '../const/app-constants.js';

function validateMainProps(props) {
  const expectedProps = {
    amount: validateNumber,
    apiKey: validateString,
    currency: validateCurrency,
    businessId: validateString,
    isTesting: validateTestMode,
  };

  for (const key in expectedProps) {
    if (props[key] === undefined || !expectedProps[key](props[key])) {
      return { key, isValid: false };
    }
  }

  return { isValid: true };
}

function validateNumber(number) {
  if (typeof number !== 'number' || number <= 0) {
    return false;
  }
  return true;
}

function validateString(string) {
  if (typeof string !== 'string' || string.length === 0) {
    return false;
  }
  return true;
}

function validateCurrency(currency) {
  return validCurrencyMap[currency] ? true : false;
}

function validateTestMode(isTestMode) {
  if (typeof isTestMode !== 'boolean') {
    return false;
  }
  return true;
}
export default validateMainProps;
