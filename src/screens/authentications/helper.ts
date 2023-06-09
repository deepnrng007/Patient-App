import Config from "react-native-config";
import { postRequest } from "../../connectivity/axiosClient";
import {
  PASWORD_RESET,
  REQUEST_OTP,
  RESET_WITH_VERIFYCATION_CODE,
  VERIFY_OTP,
  VERIFY_PHONE,
} from "../../connectivity/endpoints";
import { global } from "../../global";
import logger from "../../utils/logger";

export const getOTP = async (userName: string) => {
  const accessToken = global.LOGIN_ACCESS_TOKEN as any;
  try {
    const res = await postRequest(
      RESET_WITH_VERIFYCATION_CODE,
      { userName },
      Config.RESET_PASSWORDURL,
      accessToken
    );
    return res.data;
  } catch (err: any) {
    logger.log(err);
    return err;
  }
};

export const getOTPForRegisteration = async (
  phoneNumber: string,
  onSuccess: any,
  onFailure: any
) => {
  const accessToken = global.LOGIN_ACCESS_TOKEN as any;
  try {
    const res = await postRequest(
      REQUEST_OTP,
      { phoneNumber },
      Config.MESSAGING_BASE_URL,
      accessToken
    );
    logger.log("response is", res);
    onSuccess(res.data);
  } catch (err: any) {
    onFailure(err);
  }
};

export const checkMobileNo = async (phoneNumber: string) => {
  try {
    const res = await postRequest(
      VERIFY_PHONE,
      { phoneNumber },
      Config.MESSAGING_BASE_URL
    );
    return res.data;
  } catch (err: any) {
    return err;
  }
};

export const getValidateOTP = async (params: any) => {
  const accessToken = global.LOGIN_ACCESS_TOKEN as any;
  logger.log(accessToken);
  try {
    const res = await postRequest(
      VERIFY_OTP,
      params,
      Config.MESSAGING_BASE_URL,
      accessToken
    );
    logger.log(res);
    return res.data;
  } catch (err: any) {
    logger.log(err);
    return err;
  }
};

export const updateConfirmPwd = async (params: any) => {
  const accessToken = global.LOGIN_ACCESS_TOKEN as any;
  try {
    const res = await postRequest(
      PASWORD_RESET,
      params,
      Config.RESET_PASSWORDURL,
      accessToken
    );
    return res.data;
  } catch (err: any) {
    return err;
  }
};
