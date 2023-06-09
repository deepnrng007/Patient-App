import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { fetchCarePlan } from "../apis/fetchCarePlan";
import { fetchConfig } from "../apis/fetchConfig";
import { fetchDischargeDetails } from "../apis/fetchDischargeDetails";

type stateTypes = {
  dischargeError: string | null;
  dischargeLoading: boolean;
  dischargeStatus: string | null;
  dischargeData: any;
};

const initialState: stateTypes = {
  dischargeError: null,
  dischargeLoading: false,
  dischargeStatus: null,
  dischargeData: {},
};

const dischargeSliceReducer = createSlice({
  name: "loginSlicer",
  initialState: initialState,
  reducers: {
    cleardischargeData: (state) => {
      state.dischargeData = {};
    },
  },
  extraReducers: {
    [fetchDischargeDetails.pending as any]: (state) => {
      logger.log("Pending");
      state.dischargeLoading = true;
      state.dischargeStatus = "Pending";
      state.dischargeError = null;
    },
    [fetchDischargeDetails.fulfilled as any]: (
      state,
      action: PayloadAction<any>
    ) => {
      logger.log("Fulfilled", action.payload);
      state.dischargeLoading = false;
      state.dischargeStatus = "Fulfilled";
      state.dischargeData = action.payload;
    },
    [fetchDischargeDetails.rejected as any]: (
      state,
      action: PayloadAction<any>
    ) => {
      logger.log("Rejected", action);
      state.dischargeLoading = false;
      state.dischargeStatus = "Rejected";
      state.dischargeError = action.payload;
    },
  },
});

export default dischargeSliceReducer.reducer;
export const { cleardischargeData } = dischargeSliceReducer.actions;
