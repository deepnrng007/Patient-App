import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { getRequest } from "../../connectivity/axiosClient";
import { CAREPLAN_URL } from "../../connectivity/endpoints";
import { global } from "../../global";

export const fetchCarePlan = createAsyncThunk(
  "careplanSlicer",
  async (params: any) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN as any;

    const res = await getRequest(
      `${CAREPLAN_URL}${params.intakeID}`,
      Config.ROOT_URL,
      accessToken
    );

    return res.data;
  }
);
