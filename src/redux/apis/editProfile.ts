import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { putRequest } from "../../connectivity/axiosClient";
import { EDITPROFILE_URL } from "../../connectivity/endpoints";
import logger from "../../utils/logger";

export const editProfile = createAsyncThunk(
  "profileSlicer",
  async (params: any) => {
    // const accessToken = Config.LOGIN_ACCESS_TOKEN;

    const res = await putRequest(
      `${Config.ROOT_URL}${EDITPROFILE_URL}`,
      params,
      ""
    );
    return res.data;
  }
);
