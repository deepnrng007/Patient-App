import moment from "moment";
import { Alert, Dimensions, Platform, ToastAndroid } from "react-native";
import { scale } from "react-native-size-matters";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { themes } from "../enums";
import logger from "./logger";
import DocumentPicker, { types } from "react-native-document-picker";
import { stat } from "react-native-fs";
import {
  encriptedStorageKeys,
  mediaTypes,
  trackStatus,
} from "../enums/constants";
import BackgroundTimer from "react-native-background-timer";
import { global } from "../global";
import {
  getEncryptedStorage,
  removeEncryptedStorage,
  setEncryptedStorage,
  setEncryptedStorageString,
} from "./encryptedStorage";
import {
  checkFeatureFlag,
  deleteTwilioBinding,
  setTwilioNoticationBind,
} from "../screens/helper";

export const isAndroid = () => Platform.OS === "android";

export const getShadow = () => {
  return Platform.select({
    ios: {
      shadowColor: themes.Black1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.4,
      shadowRadius: scale(5),
    },
    android: {
      elevation: 5,
    },
  });
};

export const disableShadow = () => {
  return Platform.select({
    ios: {
      shadowColor: themes.Black1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: {
      elevation: 0,
    },
  });
};

export const getStatusBarSpacer = () => {
  return Platform.select({
    android: 0,
    ios: getStatusBarHeight(),
  });
};

export const getAvatarInitials = (textString: string): string => {
  if (!textString) return "";

  const text = textString.trim();

  const textSplit = text.split(" ");

  if (textSplit.length <= 1) {
    return text.charAt(0);
  }

  const initial1 =
    textSplit[0] != "null" && textSplit[0] != "undefined"
      ? textSplit[0].charAt(0)
      : "";

  const initial2 =
    textSplit[textSplit.length - 1] != "null" &&
    textSplit[textSplit.length - 1] != "undefined"
      ? textSplit[textSplit.length - 1].charAt(0)
      : "";

  return initial1 + initial2;
};

export const notifyMsg = (msg: string) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
};

export const getDatesBetweetTwoDates = (startDate: string, endDate: string) => {
  const dateMove = new Date(startDate);
  let strDate = startDate;
  let datesObject = {};

  const betweenDates = {
    color: themes.greenOpacity60,
    textColor: themes.White,
  };
  const startEndDates = {
    color: themes.green,
    textColor: themes.White,
  };
  if (!endDate) {
    return {
      [strDate]: {
        startingDay: true,
        ...startEndDates,
        customStyles: themes.calenderStartDatesStyle,
      },
    };
  }
  while (strDate < endDate) {
    strDate = dateMove.toISOString().slice(0, 10);
    let format = {};

    if (strDate === startDate) {
      format = {
        [strDate]: {
          startingDay: true,
          ...startEndDates,
          customStyles: themes.calenderStartDatesStyle,
        },
      };
    } else if (strDate === endDate) {
      format = {
        [strDate]: {
          endingDay: true,
          ...startEndDates,
          customStyles: themes.calenderEndDatesStyle,
        },
      };
    } else {
      format = {
        [strDate]: {
          ...betweenDates,
          customStyles: themes.calenderBetweenDateStyle,
        },
      };
    }
    datesObject = {
      ...datesObject,
      ...format,
    };
    dateMove.setDate(dateMove.getDate() + 1);
  }
  return datesObject;
};

export const getSingleDateStyle = (strDate: string) => {
  return {
    [strDate]: {
      customStyles: themes.calenderSingleDateStyle,
    },
  };
};

export const getDeviceDimenstion = (type: "height" | "width") => {
  if (type == "width") return Dimensions.get("screen").width;
  else return Dimensions.get("screen").height;
};

export const arrangeDatesIndesc = (datesList: string[]) => {
  const sorted = datesList.sort((a, b) => {
    const aDate = new Date(a);
    const bDate = new Date(b);
    logger.log("arrangeDatesIndesc 2 :", bDate.getTime());
    return aDate.getTime() - bDate.getTime();
  });
  return sorted;
};

export const getNameAlphabets = (name: string) => {
  return name
    .split(" ")
    .map((item: string) => item.substring(0, 1).toUpperCase())
    .slice(0, 2)
    .join("");
};

const checkSameDayDates = (currentMessage: any, previousMessage: any) => {
  if (!previousMessage || !previousMessage.createdAt) {
    return false;
  }

  const currentMassageDate = moment(currentMessage.createdAt).toDate();
  const previousMessageDate = moment(previousMessage.createdAt).toDate();

  if (!currentMassageDate || !previousMessageDate) {
    return false;
  }
  return (
    currentMassageDate.toDateString() === previousMessageDate.toDateString()
  );
};

export const isSameDayMessage = (currentMessage: any, previousMessage: any) => {
  if (currentMessage && !checkSameDayDates(currentMessage, previousMessage))
    return true;
  else return false;
};

const checkSameUserName = (currentMessage: any, previousMessage: any) => {
  if (!previousMessage || !previousMessage.user || !previousMessage.user.name) {
    return false;
  }
  const currentMassageName = currentMessage.user.name;
  const previousMessageName = previousMessage.user.name;
  if (!currentMassageName || !previousMessageName) {
    return false;
  }
  return currentMassageName === previousMessageName;
};

export const isSameUserNameMessage = (
  currentMessage: any,
  previousMessage: any
) => {
  if (currentMessage && !checkSameUserName(currentMessage, previousMessage))
    return true;
  else return false;
};

export const getDateFormatForDay = (date: string, format = "MMMM DD, YYYY") => {
  const dateFormat1 = moment(date).toDate();

  if (dateFormat1.toDateString() === new Date().toDateString()) return "Today";
  if (dateFormat1.toDateString() === getYesterdayDate()) return "Yesterday";
  else
    return moment(dateFormat1).format(format) == "Invalid date"
      ? "N/A"
      : moment(dateFormat1).format(format);
};

export const getDateDiffFromToday = (date: string) => {
  const date1 = new Date(date);
  const today = new Date();
  const diff = today.getTime() - date1.getTime();
  logger.log(diff);
  return diff;
};

export const getYesterdayDate = () => {
  return new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toDateString();
};

export const secondsToMMSS = (secs: number) => {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);

  const h = Math.floor(secs / 3600);
  const m = Math.floor(secs / 60) - h * 60;
  const s = Math.floor(secs - h * 3600 - m * 60);

  return `${pad(m)}:${pad(s)}`;
};

export const openDocxPDFFiles = () => {
  return new Promise((resolve, reject) => {
    DocumentPicker.pick({
      allowMultiSelection: true,
      type: [types.doc, types.docx, types.pdf],
      copyTo: "documentDirectory",
    })
      .then((res: any) => resolve(res))
      .catch((err: any) => {
        reject(err);
      });
  });
};

export const openGallary = () => {
  return new Promise((resolve, reject) => {
    DocumentPicker.pick({
      allowMultiSelection: true,
      type: [types.images],
      copyTo: "documentDirectory",
    })
      .then((res: any) => resolve(res))
      .catch((err: any) => {
        reject(err);
      });
  });
};

export const getBytesToConvert = (bytes: number | undefined) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes) {
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    const value = Math.round(bytes / Math.pow(1024, i));
    return { sizeValue: value, valueWithType: value + " " + sizes[i] };
  } else return { sizeValue: 0, valueWithType: "0 Byte" };
};

export const getFileDetails = async (path: string) => await stat(path);

export const isBothTypeSame = (type1: string, type2: string) =>
  type1?.toLowerCase().includes(type2?.toLowerCase()) ||
  type2?.toLowerCase().includes(type1?.toLowerCase());

export const getFileNameFromPath = (path: string) =>
  path.split("/").slice(-1)[0];

export const getUploadedPartwithPercentage = (
  percentage: number,
  totalSize: number
) => {
  return (getBytesToConvert(totalSize).sizeValue / 100) * percentage;
};

export const getFileType = (type: string) => {
  switch (type) {
    case mediaTypes.IMAGE:
      return "image/jpeg";
    case mediaTypes.PDF:
      return "application/pdf";
    case mediaTypes.DOC:
      return "application/doc";
  }
};

export const getReversedFileType = (type: string) => {
  if (isBothTypeSame(type, mediaTypes.IMAGE)) return mediaTypes.IMAGE;
  else if (isBothTypeSame(type, mediaTypes.PDF)) return mediaTypes.PDF;
  else if (isBothTypeSame(type, mediaTypes.DOC)) return mediaTypes.DOC;
  else return mediaTypes.TEXT;
};

export const getAlphabetsArray = () => {
  const alphabetsString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabetsString.split("");
};

export const getBGColor = (type: string) => {
  if (type === trackStatus.OFFTRACK || type === trackStatus.PENDING)
    return { backgroundColor: themes.RedTransparent20 };
  return {};
};

export const getTextColor = (type: string) => {
  if (type === trackStatus.OFFTRACK || type === trackStatus.PENDING)
    return { color: themes.Red3 };
  return {};
};

export const countDownTimer = (sec: number, callBack: any) => {
  let time: number = sec;
  const timerRef = BackgroundTimer.runBackgroundTimer(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    const timer = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    time = time - 1;
    callBack(time, timer);
  }, 1000);
  return timerRef;
};

export const getDigitsFromText = (text: string) => {
  return text.replace(/[^0-9]/g, "");
};
export const checkDigitsFromText = (text: string) => {
  return text.replace(/[^0-9]/g, "") === "";
};

type msgFormat = {
  type: string;
  content: string;
  uploadingFlag?: boolean;
  fileSize?: number;
  fileName?: string | null;
  currentUser?: any;
  createdAt?: string;
  isEventTriggered?: boolean;
};

export const getMessageFormat = ({
  type,
  content,
  uploadingFlag,
  fileSize,
  fileName,
  currentUser,
  createdAt,
  isEventTriggered = false,
}: msgFormat) => {
  return {
    _id: new Date().getTime(),
    message: {
      type,
      content,
      uploadingFlag,
      fileSize,
      fileName,
    },
    createdAt: createdAt ? createdAt : new Date(),
    isEventTriggered,
    user: currentUser,
  };
};

export const isEqualIgnoreCase = (s1: string, s2: string) =>
  s1.toLowerCase() === s2.toLowerCase();

export const checkForNull = (key: any) => {
  if (key) {
    return key;
  } else {
    return "";
  }
};

const validationList = [
  { check: false, label: "8 or more characters" },
  { check: false, label: "1 Letter" },
  { check: false, label: "1 Number" },
  { check: false, label: "1 special character i.e. $,%,@" },
];

export const getMaskedNumber = (number: string, maskDigits = 4) => {
  const endDigits = number.slice(-maskDigits);
  return endDigits.padStart(number.length, "X");
};

export const getOTPfromMessage = (message: string) => {
  if (message) {
    const match = message.match(/\b\d{4}\b/);
    return match ? match[0] : "";
  } else {
    return "";
  }
};

export const alertBox = (title: string, callback?: any) =>
  Alert.alert("", title, [
    { text: "OK", onPress: () => (callback ? callback() : () => {}) },
  ]);
export const getLocaleTime = (date: string, format = "DD MM YYYY hh:mm a") => {
  return date ? moment(date).local().format(format) : "";
};
export const setFCMToken = async () => {
  const fcmToken = await getEncryptedStorage("FCM_TOKEN_KEY");
  global.FCM_TOKEN = fcmToken as any;
  logger.log("fcmToken", fcmToken);
  const isFeatureEnabled = await checkFeatureFlag();
  if (isFeatureEnabled) {
    if (fcmToken && global.OWNER_EMAILID) {
      const data = await setTwilioNoticationBind(global.OWNER_EMAILID);
      await setEncryptedStorageString(
        encriptedStorageKeys.BINDING_ID,
        data.bindingSid
      );
    }
  } else {
    deleteTwilioBinding();
    removeEncryptedStorage(encriptedStorageKeys.BINDING_ID);
  }
};

export const getUTCTimeNow = () => {
  return new Date(new Date().toUTCString());
};

export const isParsable = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
