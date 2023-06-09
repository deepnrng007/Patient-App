import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { getRequest } from "../../connectivity/axiosClient";
import {
  CONFIG_URL,
  DISCHARGE_DETAILS_URL,
} from "../../connectivity/endpoints";
import { global } from "../../global";
import { DISCHARGE_DETAILS } from "../../utils/actionName";
import logger from "../../utils/logger";

export const fetchDischargeDetails = createAsyncThunk(
  DISCHARGE_DETAILS,
  async (params: any) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN;

    logger.log(
      "fetchDischargeDetails",
      `${DISCHARGE_DETAILS_URL}${params.patientID}`
    );
    const res = await getRequest(
      `${DISCHARGE_DETAILS_URL}${params.patientID}`,
      Config.ROOT_URL,
      accessToken
    );
    logger.log("fetchDischargeDetails :", res.data);
    return res.data;
  }
);
