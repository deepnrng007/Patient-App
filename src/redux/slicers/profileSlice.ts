import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { fetchProfile } from "../apis/fetchProfile";

type stateTypes = {
  profileError: string | null;
  profileLoading: boolean;
  profileStatus: string | null;
  profileData: any;
  profileUpdated: boolean;
  profileUpdating: boolean;
};

const initialState: stateTypes = {
  profileError: null,
  profileLoading: false,
  profileStatus: null,
  profileData: {},
  profileUpdated: false,
  profileUpdating: false,
};

const profileSliceReducer = createSlice({
  name: "profileSlicer",
  initialState: initialState,
  reducers: {
    clearProfileDetails: (state) => {
      state.profileData = {};
    },
  },
  extraReducers: {
    [fetchProfile.pending as any]: (state) => {
      logger.log("Pending");
      state.profileLoading = true;
      state.profileStatus = "Pending";
      state.profileError = null;
      state.profileUpdated = false;
      state.profileUpdating = true;
    },
    [fetchProfile.fulfilled as any]: (state, action: PayloadAction<any>) => {
      logger.log("Fulfilled", action.payload);
      state.profileLoading = false;
      state.profileStatus = "Fulfilled";
      state.profileData = action.payload;
      state.profileUpdated = true;
      state.profileUpdating = false;
    },
    [fetchProfile.rejected as any]: (state, action: PayloadAction<any>) => {
      logger.log("Rejected", action);
      state.profileLoading = false;
      state.profileStatus = "Rejected";
      state.profileError = action.payload;
      state.profileUpdated = false;
      state.profileUpdating = false;
    },
    // [editProfile.pending as any]: (state) => {
    //   logger.log("Pending");
    //   state.profileUpdated = false;
    //   state.profileUpdating = true;
    // },
    // [editProfile.fulfilled as any]: (state, action: PayloadAction<any>) => {
    //   logger.log("Fulfilled", action.payload);
    //   state.profileUpdated = true;
    //   state.profileUpdating = false;
    // },
    // [editProfile.rejected as any]: (state, action: PayloadAction<any>) => {
    //   logger.log("Fulfilled", action.payload);
    //   state.profileUpdated = false;
    //   state.profileUpdating = false;
    // },
  },
});

export default profileSliceReducer.reducer;
export const { clearProfileDetails } = profileSliceReducer.actions;
