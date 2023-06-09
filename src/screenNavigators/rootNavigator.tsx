import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenNames } from "../enums/screenNames";
import DrawerNavigation from "./drawerNavigation";
import RegisterScreen from "../screens/authentications/register";
import Login from "../screens/authentications/login";
import OTPScreen from "../screens/authentications/otpScreen";
import Profile from "../screens/profile";
import EditProfile from "../screens/editProfile";
import EpisodeDetails from "../screens/episodes/episodeDetails";
import TOCInformation from "../screens/tocInformation";
import Notifications from "../screens/notifications";
import SplashSreen from "../screens/splashScreen";
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import PreSurgery from "../screens/presurgery";
import Chat from "../screens/messages/chat";
import ConfirmPasswords from "../screens/authentications/confirmPasswords";
import ResetPassword from "../screens/authentications/resetPassword";
import PreRegister from "../screens/authentications/preRegister";
import CreateConversation from "../screens/messages/createConversion";
import PDFViewer from "../screens/pdfViewer";
import {
  getEncryptedStorage,
  removeEncryptedStorage,
} from "../utils/encryptedStorage";
import {
  constants,
  encriptedStorageKeys,
  notificationTypes,
  SESSION_TIMEOUT,
} from "../enums/constants";
import AboutApp from "../screens/aboutscreen";
import { global } from "../global";
import {
  clearLoginDetails,
  setLoginDetails,
} from "../redux/slicers/loginSlice";
import { useAppDispatch } from "../components";
import { clearChatIdsAction } from "../redux/slicers/chatIdsSlice";
import { clearCarePlanDetails } from "../redux/slicers/carePlanSlice";
import { clearconfigDetails } from "../redux/slicers/configSlice";
import { clearDashBoardData } from "../redux/slicers/dashboardSlice";
import { cleardischargeData } from "../redux/slicers/dischargeSlice";
import { clearEpisodeData } from "../redux/slicers/episodeSlice";
import { clearProfileDetails } from "../redux/slicers/profileSlice";
import { clearpatientprofileData } from "../redux/slicers/patientProfileSlice";
import UserInactivity from "react-native-user-inactivity";

import logger from "../utils/logger";
import SessionExpireModal from "../components/blockComponents/SessionExpireModal";
import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
} from "react-native";
import BackgroundTimer from "react-native-background-timer";
import FaceAndTouchIDEnable from "../screens/faceAndTouchIDEnable";
import { isAndroid, isParsable, setFCMToken } from "../utils/utils";
import { clearMessages } from "../redux/slicers/messageSlice";
import { fetchAccessToken } from "../screens/messages/helper";
import { setTwilioClient } from "../screens/helper";
import { getInstallerPackageName } from "react-native-device-info";

export type RootStackParams = {
  HOME: undefined;
  MESSAGES: undefined;
  LOGIN: undefined;
  DRAWERNAVIGATION: undefined;
  BOTTOMNAVIGATION: undefined;
  PHONE: undefined;
  MESSAGE: undefined;
  REGISTER: { mobileNo: string };
  OTPSCREEN: {
    resetData: any;
  };
  ALLCHATMESSAGES: undefined;
  PROFILE: undefined;
  EDITPROFILE: {
    firstName: string;
    lastName: string;
    date: string;
    phone: string;
  };
  EPISODEDETAILS: undefined;
  TOCINFORMATION: { cameFrom?: string; intakeID?: string; patientID?: string };
  NOTIFICATIONS: undefined;
  SPLASHSCREEN: undefined;
  PRESURGERY: undefined;
  CHAT: {
    conversionName: string;
    message?: any;
    conversationID?: number;
    twilioConversationId?: string;
    cameFrom?: string;
  };
  CONFIRMPASSWORD: {
    resetData: any;
  };
  RESETPASSWORD: undefined;
  PREREGISTER: undefined;
  CREATECONVERSION: { navigatorID: string; navigatorName: string };
  PDFVIEWERSCREEN: {
    url: string;
    showButtons?: boolean;
    isBackRequired?: boolean;
  };
  ABOUTSCREEN: undefined;
  FACEIDTOUCHIDENABLE: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [clickedLogout, setClickedLogout] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getdata();
    DeviceEventEmitter.addListener(constants.LOG_OUT_EVENT, signOutEmmitter);
    eventListeners();
  }, []);

  const signOutEmmitter = () => {
    clearAllData();
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: screenNames.LOGIN,
          },
        ],
      });
    }, 100);
  };

  const clearAllData = async () => {
    const res = await removeEncryptedStorage(encriptedStorageKeys.LOGINDETAILS);
    global.PREVIOUSSCREEN = null;
    global.ACCESS_TOKEN = null;
    global.FCM_TOKEN = null;
    global.LOGIN_ACCESS_TOKEN = null;
    global.OWNER_EMAILID = null;
    global.OWNER_USERID = null;
    global.ISREFRESHTOKENCALLED = false;
    global.ISPENDINGAPPROVAL = false;
    dispatch(clearLoginDetails());
    dispatch(clearChatIdsAction());
    dispatch(clearCarePlanDetails());
    dispatch(clearconfigDetails());
    dispatch(clearDashBoardData());
    dispatch(cleardischargeData());
    dispatch(clearEpisodeData());
    dispatch(clearProfileDetails());
    dispatch(clearpatientprofileData());
    dispatch(clearMessages());
  };

  useEffect(() => {
    if (isActive && clickedLogout) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: screenNames.LOGIN,
            },
          ],
        });
      }, 100);
    }
  }, [isActive, clickedLogout]);

  const eventListeners = () => {
    let eventListener: any = null;
    if (isAndroid()) {
      const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
      eventListener = eventEmitter.addListener(
        "onClickNotificationEvent",
        (notificationPayload) => {
          logger.log("android event listner");
          navigationRoute(notificationPayload);
        }
      );
    } else {
      const nativeEventSupport = new NativeEventEmitter(
        NativeModules.NativeEventManager
      );
      nativeEventSupport.addListener(
        "onClickNotificationEvent",
        (notificationPayload) => {
          logger.log("ios event listner");
          navigationRoute(notificationPayload);
        }
      );
    }
  };

  const navigationRoute = async (params: any, path = "" as string) => {
    removeEncryptedStorage(encriptedStorageKeys.NOTIFICATION_PAYLOAD);
    if (isParsable(params)) {
      const notificationPayload = JSON.parse(params);
      if (global.LOGIN_ACCESS_TOKEN) {
        const {
          actionEntityId = "",
          actionType = "",
          title = "",
          twilioConversationId = "",
        } = notificationPayload;
        const statesRoutes = navigation?.getState()?.routes;
        let currentScreen = "";
        if (statesRoutes && statesRoutes.length > 0)
          currentScreen = statesRoutes[statesRoutes.length - 1]?.name;
        if (actionType === notificationTypes.PATIENT_TOC) {
          const items = actionEntityId.split(",");
          const intakeID = items[0];
          const patientID = items[1];
          navigation.navigate(screenNames.TOCINFORMATION, {
            cameFrom: path,
            intakeID,
            patientID,
          });
        } else if (actionType === notificationTypes.NEW_MESSAGE) {
          const params = {
            conversionName: title,
            conversationID: parseInt(actionEntityId),
            twilioConversationId,
            cameFrom: path,
          };
          if (currentScreen === screenNames.CHAT)
            navigation.dispatch(StackActions.replace(screenNames.CHAT, params));
          else navigation.navigate(screenNames.CHAT, params);
        } else if (actionType === notificationTypes.PATIENT_PROFILE) {
          global.ISPENDINGAPPROVAL = false;
          navigationToScreen(screenNames.DRAWERNAVIGATION, {});
        }
      }
    } else logger.log("error while parsing", params);
  };

  const getdata = async () => {
    if (!isAndroid())
      getInstallerPackageName().then((installerPackageName) => {
        if (installerPackageName === "Other") {
          global.ISLOCALBUILD = "local";
        }
      });
    const notificationPayload: any = await getEncryptedStorage(
      encriptedStorageKeys.NOTIFICATION_PAYLOAD
    );

    const loginDetails: any = await getEncryptedStorage(
      encriptedStorageKeys.LOGINDETAILS
    );
    const data = JSON.parse(loginDetails);
    if (data) {
      global.OWNER_EMAILID = data.ownereMail;
      global.OWNER_USERID = data.userOwnerId;
      global.LOGIN_ACCESS_TOKEN = data.accessToken;
      dispatch(setLoginDetails(data));
      setFCMToken();
      const res = await fetchAccessToken(data.ownereMail as any);
      if (res) {
        const { msgAccessToken } = res;
        if (msgAccessToken) setTwilioClient(msgAccessToken);
      }
    }

    setTimeout(() => {
      if (data && notificationPayload) {
        navigationRoute(notificationPayload, constants.NOTIFICATION);
      } else if (loginDetails && !global.ISREFRESHTOKENCALLED) {
        if (
          data["isAcceptedTermsAndConditions"] !== undefined &&
          !data.isAcceptedTermsAndConditions
        )
          navigationToScreen(screenNames.PDFVIEWERSCREEN, {
            url: data.termsAndConditions,
            isBackRequired: false,
          });
        else navigationToScreen(screenNames.DRAWERNAVIGATION, {});
      }
      setShowSplash(false);
    }, 3000);
  };

  const navigationToScreen = (screenName: string, params: any) => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: screenName as any,
          params: params,
        },
      ],
    });
  };

  const logout = async () => {
    setClickedLogout(true);
    setIsActive(true);

    clearAllData();
  };

  return (
    <UserInactivity
      onAction={(active) => {
        logger.log("action", active);
        if (isActive && global.LOGIN_ACCESS_TOKEN) setIsActive(active);
      }}
      timeForInactivity={SESSION_TIMEOUT}
      timeoutHandler={BackgroundTimer}
      skipKeyboard={false}
    >
      {global.LOGIN_ACCESS_TOKEN && (
        <SessionExpireModal visible={!isActive} onPress={() => logout()} />
      )}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {showSplash && (
          <Stack.Screen
            name={screenNames.SPLASHSCREEN}
            component={SplashSreen}
          />
        )}
        <Stack.Screen name={screenNames.LOGIN} component={Login} />
        <Stack.Screen name={screenNames.PREREGISTER} component={PreRegister} />
        <Stack.Screen name={screenNames.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={screenNames.OTPSCREEN} component={OTPScreen} />
        <Stack.Screen
          name={screenNames.PDFVIEWERSCREEN}
          component={PDFViewer}
        />
        <Stack.Screen
          name={screenNames.CONFIRMPASSWORD}
          component={ConfirmPasswords}
        />
        <Stack.Screen
          name={screenNames.RESETPASSWORD}
          component={ResetPassword}
        />
        <Stack.Screen name={screenNames.PROFILE} component={Profile} />
        <Stack.Screen name={screenNames.ABOUTSCREEN} component={AboutApp} />
        <Stack.Screen name={screenNames.EDITPROFILE} component={EditProfile} />
        <Stack.Screen name={screenNames.PRESURGERY} component={PreSurgery} />
        <Stack.Screen
          name={screenNames.NOTIFICATIONS}
          component={Notifications}
        />
        <Stack.Screen
          name={screenNames.EPISODEDETAILS}
          component={EpisodeDetails}
        />
        <Stack.Screen
          name={screenNames.TOCINFORMATION}
          component={TOCInformation}
        />
        <Stack.Screen
          name={screenNames.DRAWERNAVIGATION}
          component={DrawerNavigation}
        />
        <Stack.Screen
          name={screenNames.CREATECONVERSION}
          component={CreateConversation}
        />
        <Stack.Screen name={screenNames.CHAT} component={Chat} />
        <Stack.Screen
          name={screenNames.FACEIDTOUCHIDENABLE}
          component={FaceAndTouchIDEnable}
        />
      </Stack.Navigator>
    </UserInactivity>
  );
};

export default RootNavigator;
