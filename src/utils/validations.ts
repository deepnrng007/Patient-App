import isEmail from "validator/lib/isEmail";
import logger from "./logger";

export const isFieldEmpty = (text: string) => {
  if (text && text.length > 0) return false;
  else return true;
};

export const lengthCheck = (text: string, length: number) =>
  text.length >= length;

export const isValidEmail = (text: string) => {
  // eslint-disable-next-line no-useless-escape
  return isEmail(text) ? true : false;
};

export const isValidDate = (dob: string) =>
  parseInt(dob.substring(0, 2)) < 12 || parseInt(dob.substring(3, 5)) < 31;

export const hasNumber = (text: string) => /\d/.test(text);
export const hasUpperCase = (text: string) =>
  text.match(/[A-Z]/g) === null ? false : true;
export const hasLowerCase = (text: string) =>
  text.match(/[a-z]/g) === null ? false : true;
export const hasSpeialCase = (text: string) => {
  const specialChars = "@_/%!&";
  for (let i = 0; i < specialChars.length; i++) {
    if (text.indexOf(specialChars[i]) > -1) {
      return true;
    }
  }
  return false;
};

export const hasContainOnlySpaces = (text: string) =>
  text.replace(/\s/g, "").length;
