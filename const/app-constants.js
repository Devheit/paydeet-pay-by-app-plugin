import currencies from "../data/currencies.js";
export const appUrl =
  "https://rpzh0vb9c0.execute-api.eu-west-1.amazonaws.com/prod" || "http://localhost:5173/";

export const appRootId = "pay-by-app";

export const frameInClass = "frame-in";

export const frameOutClass = "frame-out";

export const validCurrencyMap = currencies;
