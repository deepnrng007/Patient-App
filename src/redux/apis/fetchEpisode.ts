import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { getRequest } from "../../connectivity/axiosClient";
import { EPISODE_URL } from "../../connectivity/endpoints";
import { global } from "../../global";
import logger from "../../utils/logger";

export const fetchEpisode = createAsyncThunk(
  "EpisodeSlicer",
  async (params: any) => {
    const accessToken = global.LOGIN_ACCESS_TOKEN as any;

    const res = await getRequest(
      `${EPISODE_URL}${params.intakeID}`,
      Config.ROOT_URL,
      accessToken
    );

    return res.data;
  }
);
