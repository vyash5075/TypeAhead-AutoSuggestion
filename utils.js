import { FRUITS } from "./data";

export const getSuggestions = (keyword) => {
  const result = FRUITS.filter(
    (i) => i.substr(0, keyword.length).toLowerCase() === keyword.toLowerCase()
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(result);
    }, 1000);
  });
};

export const debounce = (fn, delay = 500) => {
  let timerCtx;
  return function () {
    const self = this;
    const args = arguments;
    clearTimeout(timerCtx);
    timerCtx = setTimeout(() => fn.apply(this, args), delay);
  };
};
