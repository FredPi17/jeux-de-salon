import { isEmpty, debounce, cloneDeep } from "lodash";

export const useLodash = () => {
  return {
    isEmpty,
    debounce,
    cloneDeep,
  };
};
