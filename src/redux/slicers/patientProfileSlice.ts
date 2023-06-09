import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { fetchPatientProfile } from "../apis/fetchPatientProfile";
import { fetchProfile } from "../apis/fetchProfile";

type stateTypes = {
  patientprofileError: string | null;
  patientprofileLoading: boolean;
  patientprofileStatus: string | null;
  patientprofileData: any;
};

const initialState: stateTypes = {
  patientprofileError: null,
  patientprofileLoading: false,
  patientprofileStatus: null,
  patientprofileData: {},
};

const patientprofileSliceReducer = createSlice({
  name: "profileSlicer",
  initialState: initialState,
  reducers: {
    clearpatientprofileData: (state) => {
      state.patientprofileData = {};
    },
  },
  extraReducers: {
    [fetchPatientProfile.pending as any]: (state) => {
      logger.log("Pending");
      state.patientprofileLoading = true;
      state.patientprofileStatus = "Pending";
      state.patientprofileError = null;
    },
    [fetchPatientProfile.fulfilled as any]: (
      state,
      action: PayloadAction<any>
    ) => {
      logger.log("Fulfilled", action.payload);
      state.patientprofileLoading = false;
      state.patientprofileStatus = "Fulfilled";
      state.patientprofileData = action.payload;
    },
    [fetchPatientProfile.rejected as any]: (
      state,
      action: PayloadAction<any>
    ) => {
      logger.log("Rejected", action);
      state.patientprofileLoading = false;
      state.patientprofileStatus = "Rejected";
      state.patientprofileError = action.payload;
    },
  },
});

export default patientprofileSliceReducer.reducer;
export const { clearpatientprofileData } = patientprofileSliceReducer.actions;
