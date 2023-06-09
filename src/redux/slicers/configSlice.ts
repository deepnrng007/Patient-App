import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { fetchConfig } from "../apis/fetchConfig";

type stateTypes = {
  configError: string | null;
  configLoading: boolean;
  configStatus: string | null;
  configData: any;
};

const initialState: stateTypes = {
  configError: null,
  configLoading: false,
  configStatus: null,
  configData: {},
};

const configSliceReducer = createSlice({
  name: "loginSlicer",
  initialState: initialState,
  reducers: {
    clearconfigDetails: (state) => {
      state.configData = {};
    },
  },
  extraReducers: {
    [fetchConfig.pending as any]: (state) => {
      logger.log("Pending");
      state.configLoading = true;
      state.configStatus = "Pending";
      state.configError = null;
    },
    [fetchConfig.fulfilled as any]: (state, action: PayloadAction<any>) => {
      logger.log("Fulfilled", action.payload);
      state.configLoading = false;
      state.configStatus = "Fulfilled";
      state.configData = action.payload;
    },
    [fetchConfig.rejected as any]: (state, action: PayloadAction<any>) => {
      logger.log("Rejected", action);
      state.configLoading = false;
      state.configStatus = "Rejected";
      state.configError = action.payload;
    },
  },
});

export default configSliceReducer.reducer;
export const { clearconfigDetails } = configSliceReducer.actions;
