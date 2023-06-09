import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import fetchAsync from "../../connectivity/fetchAsync";
import { fetchDashboard } from "../apis/fetchDashBoard";

type stateTypes = {
  error: string | null;
  loading: boolean;
  status: string | null;
  data: any;
};

const initialState: stateTypes = {
  error: null,
  loading: false,
  status: null,
  data: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    clearDashBoardData: (state) => {
      state.data = {};
    },
  },
  extraReducers: {
    [fetchDashboard.pending as any]: (state) => {
      state.loading = true;
      state.status = "Pending";
      state.error = null;
    },
    [fetchDashboard.fulfilled as any]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.status = "Fulfilled";
      state.data = action.payload;
      state.error = null;
    },
    [fetchDashboard.rejected as any]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.status = "Rejected";
      state.error = action.payload;
    },
  },
});

export default dashboardSlice.reducer;
export const { clearDashBoardData } = dashboardSlice.actions;
