import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { fetchCarePlan } from "../apis/fetchCarePlan";

type stateTypes = {
  carePlanError: string | null;
  carePlanLoading: boolean;
  carePlanStatus: string | null;
  carePlanData: any;
};

const initialState: stateTypes = {
  carePlanError: null,
  carePlanLoading: false,
  carePlanStatus: null,
  carePlanData: {},
};

const carePlanSliceReducer = createSlice({
  name: "loginSlicer",
  initialState: initialState,
  reducers: {
    clearCarePlanDetails: (state) => {
      state.carePlanData = {};
    },
  },
  extraReducers: {
    [fetchCarePlan.pending as any]: (state) => {
      logger.log("Pending");
      state.carePlanLoading = true;
      state.carePlanStatus = "Pending";
      state.carePlanError = null;
    },
    [fetchCarePlan.fulfilled as any]: (state, action: PayloadAction<any>) => {
      logger.log("Fulfilled", action.payload);
      state.carePlanLoading = false;
      state.carePlanStatus = "Fulfilled";
      state.carePlanData = action.payload[0];
    },
    [fetchCarePlan.rejected as any]: (state, action: PayloadAction<any>) => {
      logger.log("Rejected", action);
      state.carePlanLoading = false;
      state.carePlanStatus = "Rejected";
      state.carePlanError = action.payload;
    },
  },
});

export default carePlanSliceReducer.reducer;
export const { clearCarePlanDetails } = carePlanSliceReducer.actions;
