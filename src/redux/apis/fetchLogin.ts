import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { postRequest } from "../../connectivity/axiosClient";
import { LOGIN_URL } from "../../connectivity/endpoints";
import logger from "../../utils/logger";

export const loginAsyncFetch = createAsyncThunk(
  "loginSlicer",
  async (params: any) => {
    logger.log(Config.AUTHENTICATION_BASE_URL);
    const res = await postRequest(
      LOGIN_URL,
      params,
      Config.AUTHENTICATION_BASE_URL
    );

    return res?.data;
  }
);
