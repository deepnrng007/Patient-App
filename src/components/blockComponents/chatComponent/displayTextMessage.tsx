import moment from "moment";
import React, { useEffect, useState } from "react";
import AppText from "../../baseComponents/appText";
import useAppSelector from "../../customHooks/useAppSelector";
import { mediaTypes, responseStatus } from "../../../enums/constants";
import { sendMessage } from "../../../screens/messages/helper";
import styles from "./styles";
import { global } from "../../../global";
import { ReadIcon, SendingIcon, SentIcon } from "../../../utils/imagePaths";
import { View } from "react-native";
import { getLocaleTime } from "../../../utils/utils";
import logger from "../../../utils/logger";

type props = {
  displayName: string;
  name: string;
  content: string;
  date: string;
  uploadingFlag: boolean;
  isEventTriggered: boolean;
  unreadCount: number;
  index: number;
  userId: string;
  _id: string;
  readCount: number;
};
const DisplayTextMessage = ({
  isEventTriggered,
  content,
  date,
  uploadingFlag,
  unreadCount,
  index,
  _id,
  userId,
  readCount,
}: props) => {
  const [isSendTickDisplay, setisSendTickDisplay] = useState(!uploadingFlag);
  const { chatIdsData, loginData } = useAppSelector((state) => {
    return {
      loginData: state.login,
      chatIdsData: state.chatId,
    };
  });
  const { loginDetails } = loginData;

  const {
    idsDetails: { conversationTwilioID, conversationID },
  } = chatIdsData;

  useEffect(() => {
    if (uploadingFlag) {
      sendMessageAPI();
    }
  }, []);

  const sendMessageAPI = async () => {
    const data = {
      conversationTwilioID,
      conversationID,
      messageOwnerEmailAddress: loginDetails.ownereMail,
      messageOwnerUserID: loginDetails.userOwnerId,
      messageType: mediaTypes.TEXT,
      fileUpload: new FormData(),
      messageBody: content,
    };

    const res = await sendMessage(data);
    setTimeout(() => {
      if (res?.response === responseStatus) {
        setisSendTickDisplay(true);
      }
    }, 1000);
  };

  const getMessageStatus = () => {
    logger.log("isSendTickDisplay ,readCount , unreadCount");
    logger.log(isSendTickDisplay, readCount, unreadCount, index);
    if (!isSendTickDisplay) return <SendingIcon />;
    else if (isSendTickDisplay && readCount && unreadCount <= index)
      return <ReadIcon />;
    else if (isSendTickDisplay) return <SentIcon />;
  };

  return (
    <>
      <AppText style={styles.message}>{content}</AppText>
      <View style={styles.dateTick}>
        <AppText style={styles.dates}>{getLocaleTime(date, "hh:mm a")}</AppText>
        {userId === _id && getMessageStatus()}
      </View>
    </>
  );
};

export default DisplayTextMessage;

DisplayTextMessage.defaultProps = {
  uploadingFlag: false,
};
