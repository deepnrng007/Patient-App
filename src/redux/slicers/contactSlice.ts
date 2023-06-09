import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";
import { fetchContacts } from "../apis/fetchContacts";

type stateTypes = {
  contactError: string | null;
  contactLoading: boolean;
  status: string | null;
  contactList: any;
};

const initialState: stateTypes = {
  contactError: null,
  contactLoading: false,
  status: null,
  contactList: [],
};

const contactSlicer = createSlice({
  name: "contactsList",
  initialState: initialState,
  reducers: {
    clearContacts: (state) => {
      contactList = [];
    },
  },
  extraReducers: {
    [fetchContacts.pending as any]: (state) => {
      logger.log("loading");
      state.contactLoading = true;
      state.status = "Pending";
      state.contactError = null;
    },
    [fetchContacts.fulfilled as any]: (state, action: PayloadAction<any>) => {
      logger.log("fulfilled", action.payload);
      state.contactLoading = false;
      state.status = "Fulfilled";
      state.contactList = action.payload;
      state.contactError = null;
    },
    [fetchContacts.rejected as any]: (state, action: any) => {
      logger.log("rejected", action.error);
      state.contactLoading = false;
      state.status = "Rejected";
      state.contactError = action.error.message;
    },
  },
});

export default contactSlicer.reducer;
