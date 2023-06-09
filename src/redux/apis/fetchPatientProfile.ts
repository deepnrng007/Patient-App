import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { getRequest } from "../../connectivity/axiosClient";
import { PATIENT_PROFILE_URL } from "../../connectivity/endpoints";
import { global } from "../../global";
import { PATIENT_PROFILE } from "../../utils/actionName";
import logger from "../../utils/logger";

export const fetchPatientProfile = createAsyncThunk(
  PATIENT_PROFILE,
  async (params: any) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN as any;

    logger.log("fetchPatientProfile :", `${PATIENT_PROFILE_URL}${params.id}`);
    logger.log("fetchPatientProfile :", accessToken);
    logger.log("fetchPatientProfile :", params.id);
    const res = await getRequest(
      `${PATIENT_PROFILE_URL}${params.id}`,
      Config.ROOT_URL as any,
      accessToken
    );
    return res.data;
  }
);
