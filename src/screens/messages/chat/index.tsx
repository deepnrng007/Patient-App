import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { BackHandler, NativeModules } from "react-native";
import {
  ContainerView,
  useAppDispatch,
  useAppSelector,
} from "../../../components";
import ChatComponent from "../../../components/blockComponents/chatComponent";
import { screenNames } from "../../../enums";
import { addChatIdsAction } from "../../../redux/slicers/chatIdsSlice";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import logger from "../../../utils/logger";
import { getMessages } from "../helper";

type ChatProps = NativeStackScreenProps<RootStackParams, screenNames.CHAT>;

const Chat = ({ route, navigation }: ChatProps) => {
  const {
    conversionName = "",
    conversationID,
    twilioConversationId,
    message,
    cameFrom = undefined,
    // eslint-disable-next-line no-unsafe-optional-chaining
  } = route?.params;

  const [messagesList, setMessagesList] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const [pagination, setPagination] = useState(1);
  const [addMessage, setAddMessage] = useState(message);

  const recordsPerPage = 20;

  const dispatch = useAppDispatch();
  const { chatIdsData, loginData } = useAppSelector((state) => {
    return {
      chatIdsData: state.chatId,
      loginData: state.login,
    };
  });
  const {
    idsDetails: { isConversationExist = false },
  } = chatIdsData;
  const [isConvoExist, setIsConvoExist] = useState(isConversationExist);
  const {
    loginDetails: { userOwnerId, firstName, ownereMail },
  } = loginData;

  const currentUSer = {
    _id: userOwnerId,
    name: firstName,
    ownereMail,
  };

  logger.log("uusseerr", loginData);
  useEffect(() => {
    if (conversationID)
      NativeModules.JSToNativeEventModule.removeNotification(
        conversationID?.toString()
      );
    if (twilioConversationId) {
      dispatch(
        addChatIdsAction({
          conversationTwilioID: twilioConversationId,
          conversationID,
        })
      );
    }
    if (isConversationExist || twilioConversationId) {
      // const index: number =
      //   messageIndex > recordsPerPage ? messageIndex + 2 : recordsPerPage;
      getConversationList(20);
    } else setLoading(false);

    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);

    return BackHandler.removeEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );
  }, []);

  const getConversationList = async (nofOfRecords?: number) => {
    const limit = nofOfRecords ? nofOfRecords : offset;
    const params = {
      conversationID,
      offset: 0,
      limit: limit,
    };
    logger.log("getConversationList: ", params, nofOfRecords, offset);
    const res = await getMessages(params);
    if (res.length > 0) {
      setOffset(limit * (pagination + 1));
      setPagination(pagination + 1);
      setMessagesList(res as any);
    }
    setLoading(false);
  };

  const onEndScrolledReached = (data: any) => {
    if (messagesList.length >= recordsPerPage) {
      setAddMessage(null);
      setIsConvoExist(false);

      getConversationList();
    }
  };

  const handleBackButtonClick = () => {
    navigation.navigate(screenNames.ALLCHATMESSAGES);
    return true;
  };
  return (
    <ContainerView
      style={{ padding: 0 }}
      hideStatusSpacer
      loading={loading}
      isBackRequired
      headerName={conversionName}
      customGoBack={cameFrom}
    >
      <ChatComponent
        messages={messagesList}
        // scrollToIndex={messageIndex}
        onEndScrolledReached={onEndScrolledReached}
        isConversationExist={isConvoExist}
        isNameShownforSingleConversation={conversionName.split(",").length > 1}
        addMessage={
          addMessage
            ? {
                fileSize: addMessage.size,
                content: addMessage.content
                  ? addMessage.content
                  : addMessage.fileCopyUri,
                type: addMessage.type,
                fileName: addMessage.name,
              }
            : null
        }
        currentUser={currentUSer}
      />
    </ContainerView>
  );
};

export default Chat;
