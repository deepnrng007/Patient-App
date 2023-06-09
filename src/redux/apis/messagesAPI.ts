import { postRequest } from "./../../connectivity/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ALL_CONVERSATION_LIST } from "../../connectivity/endpoints";
import { LIST_CONVERSATION } from "../../utils/actionName";
import logger from "../../utils/logger";
import Config from "react-native-config";

export const getAllConversationList = createAsyncThunk(
  LIST_CONVERSATION,
  async (params: any) => {
    logger.log(
      "getAllConversationList*****************************",
      ALL_CONVERSATION_LIST,
      params
    );
    const response = await postRequest(
      ALL_CONVERSATION_LIST,
      params,
      Config.MESSAGING_BASE_URL
    );
    return response?.data;
  }
);
