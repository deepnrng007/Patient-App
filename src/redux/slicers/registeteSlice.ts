import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { loginAsyncFetch } from "../apis/fetchLogin";
import { registerApi } from "../apis/registerApi";

type stateTypes = {
  registerError: any;
  registerLoading: boolean;
  registerStatus: string | null;
  registerDetails: any;
};

const initialState: stateTypes = {
  registerError: {},
  registerLoading: false,
  registerStatus: null,
  registerDetails: {},
};

const registerSliceReducer = createSlice({
  name: "registerSlicer",
  initialState: initialState,
  reducers: {
    clearRegisterDetails: (state) => {
      state.registerDetails = {};
      state.registerError = {};
    },
  },
  extraReducers: {
    [registerApi.pending as any]: (state) => {
      logger.log("Pending");
      state.registerLoading = true;
      state.registerStatus = "Pending";
      state.registerError = {};
    },
    [registerApi.fulfilled as any]: (state, action: PayloadAction<any>) => {
      logger.log("Fulfilled", action.payload);
      state.registerLoading = false;
      state.registerStatus = "Fulfilled";
      if (action.payload.succeeded === true) {
        state.registerDetails = action.payload;
        state.registerError = {};
        logger.log("nonononon", state.registerDetails);
      } else {
        // state.loginDetails = null;
        state.registerError = action.payload;
      }
    },
    [registerApi.rejected as any]: (state, action: PayloadAction<any>) => {
      logger.log("Rejected", action);
      state.registerLoading = false;
      state.registerStatus = "Rejected";
      state.registerError = action.payload;
    },
  },
});

export default registerSliceReducer.reducer;
export const { clearRegisterDetails } = registerSliceReducer.actions;
