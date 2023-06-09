import { postRequest } from "./../../connectivity/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CALL_URL } from "../../connectivity/endpoints";
import { LIST_CONVERSATION } from "../../utils/actionName";
import logger from "../../utils/logger";
import Config from "react-native-config";
import { global } from "../../global";

export const makeCall = createAsyncThunk(
  LIST_CONVERSATION,
  async (params: any) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN as any;
    logger.log(accessToken);
    const response = await postRequest(
      CALL_URL,
      params,
      Config.CALL_BASE_URL,
      accessToken
    );
    logger.log("pppppppppppppp :", response?.data);
    return response?.data;
  }
);
