import { configureStore } from "@reduxjs/toolkit";
import callSlice from "./slicers/callSlice";
import carePlanSlice from "./slicers/carePlanSlice";
import chatIdsSlice from "./slicers/chatIdsSlice";
import configSlice from "./slicers/configSlice";
import contactSlice from "./slicers/contactSlice";
import dashboardSlice from "./slicers/dashboardSlice";
import dischargeSlice from "./slicers/dischargeSlice";
// import dashBoardReducer from "./slicers/dashboardSlice";
import episodeSlice from "./slicers/episodeSlice";
import loginSlice from "./slicers/loginSlice";
import messageSlice from "./slicers/messageSlice";
import patientProfileSlice from "./slicers/patientProfileSlice";
import profileSlice from "./slicers/profileSlice";
import registeteSlice from "./slicers/registeteSlice";
import userDataSlice from "./slicers/userSlice";

export const store = configureStore({
  reducer: {
    dashBoard: dashboardSlice,
    userData: userDataSlice,
    login: loginSlice,
    message: messageSlice,
    chatId: chatIdsSlice,
    contact: contactSlice,
    profile: profileSlice,
    carePlan: carePlanSlice,
    episdoe: episodeSlice,
    call: callSlice,
    config: configSlice,
    patientProfile: patientProfileSlice,
    discharge: dischargeSlice,
    register: registeteSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
