import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { global } from "../../global";
import logger from "../../utils/logger";
import { loginAsyncFetch } from "../apis/fetchLogin";

type stateTypes = {
  loginError: string | null;
  loginLoading: boolean;
  loginStatus: string | null;
  loginDetails: any;
};

const initialState: stateTypes = {
  loginError: null,
  loginLoading: false,
  loginStatus: null,
  loginDetails: {},
};

const loginSliceReducer = createSlice({
  name: "loginSlicer",
  initialState: initialState,
  reducers: {
    clearLoginDetails: (state) => {
      state.loginDetails = {};
    },
    setLoginDetails: (state, action) => {
      state.loginDetails = action.payload;
    },
  },
  extraReducers: {
    [loginAsyncFetch.pending as any]: (state) => {
      logger.log("Pending");
      state.loginLoading = true;
      state.loginStatus = "Pending";
      state.loginError = null;
    },
    [loginAsyncFetch.fulfilled as any]: (state, action: PayloadAction<any>) => {
      logger.log("Fulfilled", action.payload);
      state.loginLoading = false;
      state.loginStatus = "Fulfilled";
      if (action.payload.succeeded === true) {
        const { id, jwtToken, email, ...rest } = action.payload;
        state.loginDetails = {
          accessToken: jwtToken,
          userOwnerId: id,
          ownereMail: email,
          ...rest,
        };
        state.loginError = null;
        global.ISREFRESHTOKENCALLED = false;
        logger.log("nonononon", state.loginDetails);
      } else {
        // state.loginDetails = null;
        state.loginError = action.payload;
      }
    },
    [loginAsyncFetch.rejected as any]: (state, action: PayloadAction<any>) => {
      logger.log("Rejected", action);
      state.loginLoading = false;
      state.loginStatus = "Rejected";
      state.loginError = action.payload;
    },
  },
});

export default loginSliceReducer.reducer;
export const { clearLoginDetails, setLoginDetails } = loginSliceReducer.actions;
