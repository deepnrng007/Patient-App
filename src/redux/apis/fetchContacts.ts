import { createAsyncThunk } from "@reduxjs/toolkit";
import Config from "react-native-config";
import { getRequest } from "../../connectivity/axiosClient";
import { CONTACT_URL } from "../../connectivity/endpoints";
import { FETCH_CONTACT } from "../../utils/actionName";
import logger from "../../utils/logger";

export const fetchContacts = createAsyncThunk(
  FETCH_CONTACT,
  async (userID: number) => {
    logger.log("uril :", `${Config.ROOT_URL}${CONTACT_URL}?userId=${userID}`);
    const res = await getRequest(
      `${CONTACT_URL}?userId=${userID}`,
      Config.MESSAGING_BASE_URL
    );
    logger.log("fetchContacts :", res.data);
    return res.data;
  }
);
