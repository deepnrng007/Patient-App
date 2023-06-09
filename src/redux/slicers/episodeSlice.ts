import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { fetchEpisode } from "../apis/fetchEpisode";

type stateTypes = {
  episodeError: string | null;
  episodeLoading: boolean;
  episodeStatus: string | null;
  episodeData: any;
};

const initialState: stateTypes = {
  episodeError: null,
  episodeLoading: false,
  episodeStatus: null,
  episodeData: {},
};

const episodeSliceReducer = createSlice({
  name: "EpisodeSlicer",
  initialState: initialState,
  reducers: {
    clearEpisodeData: (state) => {
      state.episodeData = {};
    },
  },
  extraReducers: {
    [fetchEpisode.pending as any]: (state) => {
      logger.log("Pending");
      state.episodeLoading = true;
      state.episodeStatus = "Pending";
      state.episodeError = null;
    },
    [fetchEpisode.fulfilled as any]: (state, action: PayloadAction<any>) => {
      logger.log("Fulfilled", action.payload);
      state.episodeLoading = false;
      state.episodeStatus = "Fulfilled";
      state.episodeData = action.payload;
    },
    [fetchEpisode.rejected as any]: (state, action: PayloadAction<any>) => {
      logger.log("Rejected", action);
      state.episodeLoading = false;
      state.episodeStatus = "Rejected";
      state.episodeError = action.payload;
    },
  },
});

export default episodeSliceReducer.reducer;
export const { clearEpisodeData } = episodeSliceReducer.actions;
