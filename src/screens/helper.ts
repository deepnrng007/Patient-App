import Config from "react-native-config";
import { getRequest, postRequest } from "../connectivity/axiosClient";
import { Client } from "@twilio/conversations";
import { global } from "../global";
import logger from "../utils/logger";
import {
  DELETE_BINDING,
  FEATURE_FLAG,
  NOTIFICATION_BINDING,
  TERMSANDCONDITION_URL,
} from "../connectivity/endpoints";
import { isAndroid } from "../utils/utils";
import { constants, encriptedStorageKeys } from "../enums/constants";
import { getEncryptedStorage } from "../utils/encryptedStorage";

// export const getConversationCount = async (userId: string) => {
//   const res = await getRequest(
//     `${CONVERSATION_COUNT_URL}?userID=${userId}`,
//     Config.MESSAGINGURL as any
//   );
//   return res.data;
// };

// export const setTwilioClient = (msgAccessToken: string) => {
//   const client = new Client(msgAccessToken);
//   global.TWILIOCLIENT = client as any;
//   return true;
// };

export const updateTermsAndCondition = async (userID: string) => {
  const res = await postRequest(
    `${TERMSANDCONDITION_URL}`,
    { userID },
    Config.RESET_PASSWORDURL as any
  );
  return res.data;
};

export const setTwilioNoticationBind = async (emailID: string) => {
  const params: any = {
    emailID,
    deviceToken: global.FCM_TOKEN,
    deviceType: isAndroid() ? "android" : "ios",
    userType: "patient",
  };
  logger.log("params");
  logger.log(params);
  if (global.ISLOCALBUILD && Config.ENVIRONMENTNAME === "DEV")
    params["environmentType"] = global.ISLOCALBUILD;
  try {
    const res = await postRequest(
      `${NOTIFICATION_BINDING}`,
      params,
      Config.MESSAGING_BASE_URL as any
    );
    logger.log("setTwilioNoticationBind :", res.data, params);
    return res.data;
  } catch (e) {
    logger.log("error", e);
    return false;
  }
};

export const setTwilioClient = (msgAccessToken: string) => {
  try {
    const client = new Client(msgAccessToken);
    global.TWILIOCLIENT = client as any;
    logger.log("registration Done");
  } catch (e) {
    logger.log("error", e);
  }
};

export const deleteTwilioBinding = async () => {
  const bindingSid = await getEncryptedStorage(encriptedStorageKeys.BINDING_ID);
  logger.log("bindingSid");
  logger.log(bindingSid);

  if (bindingSid !== null) {
    const params: any = {
      bindingSid,
      userType: "patient",
    };
    if (global.ISLOCALBUILD && Config.ENVIRONMENTNAME === "DEV")
      params["environmentType"] = global.ISLOCALBUILD;
    try {
      const res = await postRequest(
        `${DELETE_BINDING}`,
        params,
        Config.MESSAGING_BASE_URL as any
      );
      logger.log("deleteNotificationBinding :", res.data, params);
      return res.data;
    } catch (e) {
      logger.log("error", e);
      return false;
    }
  }
};

export const checkFeatureFlag = async () => {
  const accessToken = global.LOGIN_ACCESS_TOKEN as any;
  try {
    const resp = await getRequest(
      `${FEATURE_FLAG}${constants.PUSHNOTIFICATION}`,
      Config.ROOT_URL,
      accessToken
    );
    logger.log("featureflagResponse", resp);
    return resp.data;
  } catch (e) {
    logger.log("featureflagerror:", e);
    return false;
  }
};
