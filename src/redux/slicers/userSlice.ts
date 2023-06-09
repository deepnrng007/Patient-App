import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import fetchAsync from "../../connectivity/fetchAsync";

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

export const userData = createAsyncThunk("userData", async (params) => {
  return fetchAsync("http://fakeurl.com/post", params);
});

const userDataSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [userData.pending as any]: (state) => {
      state.loading = true;
      state.status = "Pending";
      state.error = null;
    },
    [userData.fulfilled as any]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.status = "Fulfilled";
      state.data = action.payload;
      state.error = null;
    },
    [userData.rejected as any]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.status = "Rejected";
      state.error = action.payload;
    },
  },
});

export default userDataSlice.reducer;
