import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { getRequest, putRequest } from "../../connectivity/axiosClient";
import { EDITPROFILE_URL, PROFILE_URL } from "../../connectivity/endpoints";
import { global } from "../../global";
import logger from "../../utils/logger";

export const fetchProfile = createAsyncThunk(
  "profileSlicer",
  async (params: any) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN as any;

    if (params.type === "fetch") {
      const res = await getRequest(
        `${PROFILE_URL}${params.userID}`,
        Config.ROOT_URL,
        accessToken
      );

      return res.data;
    } else {
      const res = await putRequest(EDITPROFILE_URL, params, "");

      return res.data;
    }
  }
);
