import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { getRequest } from "../../connectivity/axiosClient";
import { DASHBOARD_URL } from "../../connectivity/endpoints";
import { global } from "../../global";
import logger from "../../utils/logger";

export const fetchDashboard = createAsyncThunk(
  "dashboardSlicer",
  async (params: any) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN as any;

    logger.log("requessssss");
    const res = await getRequest(
      `${DASHBOARD_URL}${params.userID}`,
      Config.ROOT_URL,
      accessToken
    );

    return res.data;
  }
);
