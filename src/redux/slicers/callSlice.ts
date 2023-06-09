import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { makeCall } from "../apis/callApi";

export type stateTypes = {
  callError: string | null;
  callStatus: string | null;
  callResponse: any | null;
};

const initialState: stateTypes = {
  callError: null,
  callStatus: null,
  callResponse: "",
};

const callSlice = createSlice({
  name: "call",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [makeCall.pending as any]: (state) => {
      logger.log("pending");
      state.callStatus = "Pending";
      state.callError = null;
    },
    [makeCall.fulfilled as any]: (state, action: PayloadAction<any>) => {
      logger.log("fullfilled:", action.payload);

      state.callStatus = "fullfilled";
      state.callError = null;
      state.callResponse = action.payload;
    },
    [makeCall.rejected as any]: (state, action: any) => {
      logger.log("state error:", JSON.stringify(action.error));

      state.callStatus = "Rejected";
      state.callError = JSON.stringify(action.error.message);
    },
  },
});

export default callSlice.reducer;
