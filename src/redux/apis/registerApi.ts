import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { postRequest } from "../../connectivity/axiosClient";
import { LOGIN_URL, REGISTER_URL } from "../../connectivity/endpoints";
import { REGISTER_API } from "../../utils/actionName";
import logger from "../../utils/logger";

export const registerApi = createAsyncThunk(
  REGISTER_API,
  async (params: any) => {
    logger.log(Config.RESET_PASSWORDURL);
    const res = await postRequest(
      REGISTER_URL,
      params,
      Config.RESET_PASSWORDURL
    );

    return res?.data;
  }
);
