import { getAllConversationList } from "./../apis/messagesAPI";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logger from "../../utils/logger";

export type stateTypes = {
  conversationListError: string | null;
  conversationListLoading: boolean;
  conversationListStatus: string | null;
  conversationList: any;
};

const initialState: stateTypes = {
  conversationListError: null,
  conversationListLoading: false,
  conversationListStatus: null,
  conversationList: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    clearMessages: (state) => {
      state.conversationList = [];
    },
  },
  extraReducers: {
    [getAllConversationList.pending as any]: (state) => {
      logger.log("pending");

      state.conversationListLoading = true;
      state.conversationListStatus = "Pending";
      state.conversationListError = null;
    },
    [getAllConversationList.fulfilled as any]: (
      state,
      action: PayloadAction<any>
    ) => {
      // logger.log("fullfilled:", action.payload);
      state.conversationListLoading = false;
      state.conversationListStatus = "Fulfilled";
      state.conversationList = action.payload;
      state.conversationListError = null;
    },
    [getAllConversationList.rejected as any]: (state, action: any) => {
      logger.log("state error:", action);
      state.conversationListLoading = false;
      state.conversationList = null;
      state.conversationListStatus = "Rejected";
      state.conversationListError = JSON.stringify(action.error.message);
    },
  },
});

export default messageSlice.reducer;
export const { clearMessages } = messageSlice.actions;
