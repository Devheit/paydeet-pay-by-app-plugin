import { validCurrencyMap } from '../const/app-constants';

function validateMainProps(props) {
  const expectedProps = {
    amount: validateNumber,
    apiKey: validateString,
    currency: validateCurrency,
  };

  for (const key in expectedProps) {
    if (props[key] === undefined || !expectedProps[key](props[key])) {
      return {key, isValid: false};
    }
  }

  return {isValid: true};
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

export default validateMainProps
