import axios from "axios";
import Config from "react-native-config";
import { getRequest, postRequest } from "../../connectivity/axiosClient";
import {
  ACCESSTOKEN_URL,
  CONV_CHECK_URL,
  CREATE_CONVERSATION_URL,
  GETCONVERSATION_URL,
  SENDMESSAGE_URL,
} from "../../connectivity/endpoints";
import { fetchAsync } from "../../connectivity/fetchAsync";
import { responseStatus } from "../../enums/constants";
import { global } from "../../global";
import logger from "../../utils/logger";

export const fetchAccessToken = async (email: string) => {
  const response = await fetchAsync(
    `${Config.MESSAGING_BASE_URL}${ACCESSTOKEN_URL}?emailAddress=${email}`
  );
  if (response?.response === responseStatus) {
    global.ACCESS_TOKEN = response?.accessToken;
    return {
      msgAccessToken: response?.accessToken,
    };
  } else return false;
};

type sendMessageProps = {
  conversationID: number;
  conversationTwilioID: string;
  messageBody?: string | null;
  messageType: string;
  messageOwnerEmailAddress: string;
  messageOwnerUserID: number;
  fileUpload?: any;
};
export const sendMessage = async (params: sendMessageProps) => {
  logger.log("request :", params, `${Config.ROOT_URL}${SENDMESSAGE_URL}`);
  const data = new FormData();
  data.append("conversationID", params.conversationID);
  data.append("messageBody", params.messageBody);
  data.append("conversationTwilioID", params.conversationTwilioID);
  data.append("messageType", params.messageType);
  data.append("messageOwnerEmailAddress", params.messageOwnerEmailAddress);
  data.append("messageOwnerUserID", params.messageOwnerUserID);
  data.append("fileUpload", params.fileUpload);

  const res = await fetchAsync(
    `${Config.MESSAGING_BASE_URL}${SENDMESSAGE_URL}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: data,
    }
  );
  logger.log("responseeee", res);
  return res;
};

export const getMessages = async (params: any) => {
  let res;
  try {
    res = await postRequest(
      GETCONVERSATION_URL,
      params,
      `${Config.MESSAGING_BASE_URL}`
    );
  } catch (e) {
    logger.log(e);
  }

  if (res?.data?.response === responseStatus) {
    logger.log("resposne is:", res?.data?.messageDetails);
    return res?.data?.messageDetails;
  } else return [];
};

export const checkNavigatorConvExist = async (userID: string) => {
  let res;
  try {
    res = await getRequest(
      `${CONV_CHECK_URL}?userID=${userID}`,
      `${Config.MESSAGING_BASE_URL}`
    );
    return res?.data;
  } catch (e) {
    logger.log(e);
  }
};
