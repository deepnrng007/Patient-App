import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { getRequest } from "../../connectivity/axiosClient";
import { CONFIG_URL } from "../../connectivity/endpoints";
import { global } from "../../global";
import { FETCH_CONFIG } from "../../utils/actionName";
import logger from "../../utils/logger";

export const fetchConfig = createAsyncThunk(FETCH_CONFIG, async () => {
  const accessToken = global.LOGIN_ACCESS_TOKEN as any;

  const res = await getRequest(CONFIG_URL, Config.ROOT_URL, accessToken);
  logger.log("fetchConfig :", res.data);
  return res.data;
});
