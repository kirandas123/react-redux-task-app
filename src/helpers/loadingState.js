import { STATUS } from "../constants";

export const hasFinished = (state) => {
    if (state === STATUS.SUCCESS || state === STATUS.FAILURE) {
      return true;
    }
  
    return false;
};
