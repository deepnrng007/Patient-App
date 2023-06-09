/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ViewStyle } from "react-native";
import {
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { View, Keyboard } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import {
  getDateFormatForDay,
  getDeviceDimenstion,
  getFileDetails,
  getFileNameFromPath,
  getMessageFormat,
  getReversedFileType,
  getUTCTimeNow,
  isAndroid,
  isBothTypeSame,
  isEqualIgnoreCase,
  isSameDayMessage,
  isSameUserNameMessage,
  notifyMsg,
  openDocxPDFFiles,
  openGallary,
} from "../../../utils/utils";
import { ClipIcon, SendIcon } from "../../../utils/imagePaths";
import { themes } from "../../../enums";
import AppButton from "../../baseComponents/appButton";
import { scale } from "react-native-size-matters";
import AttachmentBox from "../attachmentBox";
import CameraComponent from "../../baseComponents/cameraComponent";
import {
  attachmentType,
  conversationType,
  encriptedStorageKeys,
  mediaTypes,
  responseStatus,
} from "../../../enums/constants";
import ImageWithLoader from "../../baseComponents/imageWithLoader";
import PreviewMedia from "../previewMedia";
import DisplayDay from "./displayDay";
import DisplayPdf from "./displayPdf";
import EventHOC from "../../baseComponents/eventHOC";
import { hasContainOnlySpaces } from "../../../utils/validations";
import DisplayTextMessage from "./displayTextMessage";
import logger from "../../../utils/logger";
import AppText from "../../baseComponents/appText";
import useAppSelector from "../../customHooks/useAppSelector";
import { Client, Conversation, Message } from "@twilio/conversations";
import Config from "react-native-config";
import { MontserratMedium } from "../../../utils/font";
import { global } from "../../../global";
import { setTwilioClient } from "../../../screens/helper";
import { fetchTwilioids } from "../../../redux/apis/fetchtwilioid";
import useAppDispatch from "../../customHooks/useAppDispatch";
import { useFocusEffect } from "@react-navigation/native";
import { clearChatIdsAction } from "../../../redux/slicers/chatIdsSlice";
import Loader from "../../baseComponents/loader";
import {
  getEncryptedStorage,
  removeEncryptedStorage,
  setEncryptedStorage,
} from "../../../utils/encryptedStorage";

type ChatComponentProps = {
  messages: any[];
  currentUser: any;
  isKeyboardVisible: boolean;
  onEndScrolledReached: any;
  isConversationExist: boolean;
  scrollToIndex?: number;
  isAppInForground: boolean;
  isNameShownforSingleConversation: boolean;
  disableSendOption?: boolean;
  addMessage?: {
    fileSize?: number;
    content: string;
    type: string;
    fileName?: string;
  };
  navigatorID?: string;
  isNewConvo?: boolean;
  isLoadingRequired?: boolean;
};

const ChatComponent = ({
  messages,
  currentUser,
  addMessage,
  isKeyboardVisible,
  onEndScrolledReached,
  isConversationExist,
  scrollToIndex,

  isNameShownforSingleConversation,
  disableSendOption,
  navigatorID,
  isNewConvo,
  isAppInForground,
  isLoadingRequired,
}: ChatComponentProps) => {
  const [messageList, setMessageList] = useState(messages);
  const [scrollTo, setScrollTo] = useState(scrollToIndex);
  const [isAttachmentVisible, setIsAttachmentVisible] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedDocumentData, setSelectedDocumentData] = React.useState<any>();
  const [unreadCount, setunreadCount] = useState(Number.MAX_SAFE_INTEGER);
  const [readCount, setreadCount] = useState(0);
  const [loading, setLoading] = useState(isLoadingRequired);
  const [isFirstTimemsgSend, setisFirstTimemsgSend] = useState(true);
  const CONVERSATIONREF = useRef<any>();
  const isAppOpened = useRef(isAppInForground);
  const unsubscribePartcipantUpdate = useRef<any>();
  let lastMessageIndex: number | null = null;
  const chatListRef = useRef<any>();
  const [viewURL, setViewURL] = useState<any>({
    type: "",
    uri: "",
    isUploading: false,
  });
  const { idsDetails, status, chatIderror } = useAppSelector(
    (state) => state.chatId
  );

  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(clearChatIdsAction());
    }, [])
  );
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (idsDetails?.response === responseStatus && messageList.length === 0) {
      onSend(message);
    }
  }, [idsDetails]);
  useEffect(() => {
    if (isAppInForground) {
      isAppOpened.current = true;
      if (CONVERSATIONREF && CONVERSATIONREF.current)
        CONVERSATIONREF.current.setAllMessagesRead();
    } else isAppOpened.current = false;
  }, [isAppInForground]);

  useEffect(() => {
    if (idsDetails.conversationID && isAppInForground) {
      setEncryptedStorage(
        encriptedStorageKeys.CONVERSATION_ID_KEY,
        idsDetails.conversationID
      );
    } else if (!isAppInForground)
      removeEncryptedStorage(encriptedStorageKeys.CONVERSATION_ID_KEY);
    return () => {
      updateChatVisitTime();
      removeEncryptedStorage(encriptedStorageKeys.CONVERSATION_ID_KEY);
    };
  }, [idsDetails.conversationID, isAppInForground]);

  useEffect(() => {
    if (addMessage && !isConversationExist) {
      const { content, fileName = "", fileSize = 0, type } = addMessage;
      let msg = {};
      msg = getMessageFormat({
        content,
        type: getReversedFileType(type),
        fileSize,
        fileName,
        uploadingFlag: true,
        currentUser,
      });
      setMessageList([msg]);
    }
    return () => {
      logger.log("unsubscribePartcipantUpdate", unsubscribePartcipantUpdate);
      if (unsubscribePartcipantUpdate)
        unsubscribePartcipantUpdate.current.removeAllListeners();
    };
  }, []);

  const setCountValues = () => {
    setunreadCount((prev) => prev + 1);
  };

  const getUnreadMessages = async (conversation: any) => {
    const participants = conversation.getParticipants();
    const count = (await conversation.getMessagesCount()) - 1;
    participants
      .then(async function (currentParticipants: any) {
        if (
          currentParticipants.every(
            (item: any) => item.lastReadMessageIndex !== null
          )
        ) {
          const filteredList = currentParticipants.filter(
            (item: any) => item.identity !== currentUser.ownereMail
          );
          setreadCount(
            Math.max(
              ...filteredList.map((item: any) => item.lastReadMessageIndex)
            ) + 1
          );
          setunreadCount(
            count -
              Math.min(
                ...filteredList.map((item: any) => item.lastReadMessageIndex)
              )
          );
        } else setunreadCount(0);
      })

      .catch((err: any) => logger.log("steppppppppp 8:", err));
  };

  useEffect(() => {
    if (idsDetails.conversationTwilioID) {
      nitializeConvo();
    }
  }, [idsDetails.conversationTwilioID]);

  const updateChatVisitTime = async () => {
    const data = await getEncryptedStorage(
      encriptedStorageKeys.LASTCHATSCREENVISIT
    );
    if (data) {
      const result: any[] = JSON.parse(data);
      const index = result.findIndex(
        (item) => item.convoID === idsDetails.conversationID
      );
      if (index === -1) {
        result.push({
          convoID: idsDetails.conversationID,
          lastVisitTime: getUTCTimeNow(),
        });
        setEncryptedStorage(encriptedStorageKeys.LASTCHATSCREENVISIT, result);
      } else {
        result[index].lastVisitTime = getUTCTimeNow();
        setEncryptedStorage(encriptedStorageKeys.LASTCHATSCREENVISIT, result);
      }
    } else {
      const arr = [];
      arr.push({
        convoID: idsDetails.conversationID,
        lastVisitTime: getUTCTimeNow(),
      });
      setEncryptedStorage(encriptedStorageKeys.LASTCHATSCREENVISIT, arr);
    }
  };

  const nitializeConvo = async () => {
    if (global.TWILIOCLIENT === null)
      await setTwilioClient(global.ACCESS_TOKEN as any);
    fetchConversationMessage(
      global.TWILIOCLIENT,
      idsDetails.conversationTwilioID
    );
  };

  const fetchConversationMessage = (client: any, TwilioID: string) => {
    client
      .getConversationBySid(TwilioID)
      .then((conversation: Conversation) => {
        CONVERSATIONREF.current = conversation;
        conversation.setAllMessagesRead();
        unsubscribePartcipantUpdate.current = conversation.on(
          "participantUpdated",
          async () => {
            await getUnreadMessages(conversation);
          }
        );
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        conversation.on("messageAdded", async (message1: Message) => {
          const {
            body,
            index,
            attributes: { user, fileType, createdAt, fileName, fileSize },
          } = message1["state"];
          logger.log(index, lastMessageIndex, message1["state"]);
          if (
            body &&
            lastMessageIndex !== index &&
            user._id !== currentUser._id
          ) {
            if (isAppOpened.current) conversation.setAllMessagesRead();
            const smg = getMessageFormat({
              content: body,
              type: getReversedFileType(fileType),
              currentUser: user,
              createdAt,
              fileName,
              fileSize,
              isEventTriggered: true,
            });
            onSend(smg);
            lastMessageIndex = index;
          } else {
            if (isFirstTimemsgSend && isAppOpened.current) {
              conversation.setAllMessagesRead();
              setisFirstTimemsgSend(false);
            }
            await getUnreadMessages(conversation);
          }
        });
        logger.log("Conversation handlers configured!!");
      })
      .catch((err: any) => {
        logger.log("conversation: ", err);
      });
  };

  useEffect(() => {
    if (addMessage && isConversationExist) {
      if (messages.length > 0) {
        const { content, fileName = "", fileSize = 0, type } = addMessage;
        let msg = {};
        msg = getMessageFormat({
          content,
          type: getReversedFileType(type),
          fileSize,
          fileName,
          uploadingFlag: true,
          currentUser,
        });
        setMessageList([msg, ...messages]);
      }
    } else if (!addMessage && !isConversationExist && !isNewConvo) {
      setMessageList(messages);
      setTimeout(() => {
        if (chatListRef && scrollTo && scrollTo > 0) {
          chatListRef.current._messageContainerRef.current.scrollToIndex({
            index: scrollTo,
            animated: true,
          });
          setScrollTo(0);
        }
      }, 1500);
    } else if (!addMessage && isConversationExist) setMessageList(messages);
  }, [messages]);

  useEffect(() => {
    uploadTypeOfMedia(selectedDocumentData);
  }, [selectedDocumentData]);

  const createConversation = () => {
    const data = {
      participantsUserId: [currentUser._id, navigatorID],
      type: conversationType.GENERAL,
      ownerUserId: currentUser._id,
      tag: null,
    };
    dispatch(fetchTwilioids(data));
  };

  const uploadTypeOfMedia = (documentData: any) => {
    if (documentData) {
      const { size, fileCopyUri, type, name } = documentData[0]
        ? documentData[0]
        : documentData;
      if (size <= 5242880) {
        if (isBothTypeSame(type, mediaTypes.IMAGE)) {
          if (navigatorID != undefined && messageList.length === 0) {
            createConversation();
            setMessage(
              getMessageFormat({
                type: mediaTypes.IMAGE,
                content: fileCopyUri,
                uploadingFlag: true,
                fileSize: size,
                fileName: name,
                currentUser,
              })
            );
          } else
            onSend(
              getMessageFormat({
                type: mediaTypes.IMAGE,
                content: fileCopyUri,
                uploadingFlag: true,
                fileSize: size,
                fileName: name,
                currentUser,
              })
            );
        } else if (isBothTypeSame(type, mediaTypes.PDF)) {
          if (navigatorID !== undefined && messageList.length === 0) {
            createConversation();
            setMessage(
              getMessageFormat({
                type: mediaTypes.IMAGE,
                content: fileCopyUri,
                uploadingFlag: true,
                fileSize: size,
                fileName: name,
                currentUser,
              })
            );
          } else
            onSend(
              getMessageFormat({
                type: mediaTypes.PDF,
                content: fileCopyUri,
                uploadingFlag: true,
                fileSize: size,
                fileName: name,
                currentUser: currentUser,
              })
            );
        } else if (isBothTypeSame(type, mediaTypes.DOC)) {
          if (navigatorID !== undefined && messageList.length === 0) {
            createConversation();
            setMessage(
              getMessageFormat({
                type: mediaTypes.IMAGE,
                content: fileCopyUri,
                uploadingFlag: true,
                fileSize: size,
                fileName: name,
                currentUser,
              })
            );
          } else
            onSend(
              getMessageFormat({
                type: mediaTypes.DOC,
                content: fileCopyUri,
                uploadingFlag: true,
                fileSize: size,
                fileName: name,
                currentUser: currentUser,
              })
            );
        }
      } else {
        notifyMsg("File size limit Exceed, file size not more than 5MB");
      }
    }
  };

  const onSend = useCallback((message = []) => {
    setMessageList((previousMessages) =>
      GiftedChat.append(previousMessages as any, message)
    );
    setCountValues();
  }, []);

  const openDocuments = async () => {
    setSelectedDocumentData(await openDocxPDFFiles());
  };

  const openGallaryImgVideo = async () => {
    setSelectedDocumentData(await openGallary());
  };

  const onClickAttachment = () => {
    setIsAttachmentVisible(!isAttachmentVisible);
    Keyboard.dismiss();
  };

  const onSelectAttachmentType = (type: string) => {
    setIsAttachmentVisible(false);
    if (type == attachmentType.DOCUMENT) openDocuments();
    else if (type === attachmentType.CAMERA) setIsCameraOn(true);
    else if (type === attachmentType.GALLERY) openGallaryImgVideo();
  };

  const closeCamera = () => {
    setIsCameraOn(false);
  };

  const onMessageSend = (text: string) => {
    setInputMessage("");

    if (navigatorID !== undefined && messageList.length === 0) {
      createConversation();
      setMessage(
        getMessageFormat({
          type: mediaTypes.TEXT,
          content: text,
          uploadingFlag: true,
          fileSize: 0,
          fileName: "",
          currentUser: currentUser,
        })
      );
    } else
      onSend(
        getMessageFormat({
          type: mediaTypes.TEXT,
          content: text,
          uploadingFlag: true,
          fileSize: 0,
          fileName: "",
          currentUser: currentUser,
        })
      );
  };

  const renderMessage = ({
    displayName,
    name,
    content,
    date,
    uploadingFlag,
    isEventTriggered,
    index,
    _id,
    userId,
  }: any) => {
    return (
      <DisplayTextMessage
        displayName={displayName}
        name={name}
        content={content}
        date={date}
        uploadingFlag={uploadingFlag}
        isEventTriggered={isEventTriggered}
        unreadCount={unreadCount}
        index={index}
        _id={_id}
        userId={userId}
        readCount={readCount}
      />
    );
  };

  const renderImage = ({
    type,
    uri,
    uploadingFlag,
    fileSize,
    fileName,
    isEventTriggered,
    index,
    _id,
    userId,
    date,
  }: any) => {
    return (
      <AppButton onPress={() => setViewURL({ uri, type })}>
        <ImageWithLoader
          uri={uri}
          isUploading={uploadingFlag}
          fileSize={fileSize}
          fileName={fileName}
          fileType={type}
          date={date}
          isEventTriggered={isEventTriggered}
          unreadCount={unreadCount}
          index={index}
          _id={_id}
          userId={userId}
          readCount={readCount}
        />
      </AppButton>
    );
  };

  const renderPdfFile = ({
    message,
    date,
    isEventTriggered,
    index,
    _id,
    userId,
  }: any) => {
    const {
      message: { type, content, uploadingFlag, fileSize, fileName },
    } = message;
    return (
      <DisplayPdf
        type={type}
        uri={content}
        uploadingFlag={uploadingFlag}
        fileSize={fileSize}
        fileName={fileName}
        date={date}
        unreadCount={unreadCount}
        index={index}
        _id={_id}
        userId={userId}
        isEventTriggered={isEventTriggered}
        readCount={readCount}
      />
    );
  };

  const renderBubble = (message: any) => {
    const { currentMessage, previousMessage } = message;
    const {
      user: { _id, createdAt, name },
      message: {
        type = "",
        content = "",
        uploadingFlag = false,
        fileSize = 0,
        fileName = "",
      } = {},
      createdAt: localDate,
      isEventTriggered = false,
      index,
    } = currentMessage;
    const userId = currentUser._id;
    const displayName =
      userId !== _id &&
      isSameUserNameMessage(currentMessage, previousMessage) &&
      isNameShownforSingleConversation;
    const date = localDate ? localDate : createdAt;
    return (
      <LinearGradient
        colors={["#BCDFEF", "#94D4B4"]}
        style={[styles.gradient, userId === _id && { padding: 0 }]}
      >
        <View style={[styles.bubble, userId === _id && styles.currentUSer]}>
          {isNameShownforSingleConversation && displayName && (
            <AppText style={styles.name}>{name}</AppText>
          )}
          {isEqualIgnoreCase(type, mediaTypes.TEXT) &&
            renderMessage({
              name,
              content,
              date,
              uploadingFlag,
              isEventTriggered,
              index,
              _id,
              userId,
            })}
          {isEqualIgnoreCase(type, mediaTypes.IMAGE) &&
            renderImage({
              type,
              uri: content,
              uploadingFlag,
              fileSize,
              fileName,
              date,
              isEventTriggered,
              index,
              _id,
              userId,
            })}
          {(isEqualIgnoreCase(type, mediaTypes.PDF) ||
            isEqualIgnoreCase(type, mediaTypes.DOC)) &&
            renderPdfFile({
              message: currentMessage,
              date,
              isEventTriggered,
              index,
              _id,
              userId,
            })}
        </View>
      </LinearGradient>
    );
  };

  const renderDay = (data: any) => {
    const { currentMessage, previousMessage } = data;

    const isDisplayDate = isSameDayMessage(currentMessage, previousMessage);
    const dateText = getDateFormatForDay(currentMessage.createdAt);

    return isDisplayDate ? <DisplayDay dateText={dateText} /> : null;
  };
  const renderToolBar = (props: any) => {
    const isEnableAttachement = !disableSendOption && inputMessage.length === 0;
    return (
      <InputToolbar
        {...props}
        containerStyle={[
          {
            bottom:
              !isAndroid() && isKeyboardVisible
                ? messageList.length > 0
                  ? scale(15)
                  : getDeviceDimenstion("height") > 736
                  ? scale(-15)
                  : scale(15)
                : 0,
          },
        ]}
        renderSend={() => null}
        renderComposer={() => (
          <View style={styles.composerView}>
            <View
              style={
                [
                  styles.textInputContainer,
                  inputMessage && { width: "87%" },
                ] as ViewStyle
              }
            >
              <Composer
                {...props}
                disableComposer={disableSendOption}
                textInputStyle={{
                  color: themes.gray20,
                  fontFamily: MontserratMedium,
                  paddingTop: 10,
                }}
                placeholder={"Write your message here…"}
                placeholderTextColor={themes.gray20Opacity40}
                onTextChanged={(e) => {
                  if (hasContainOnlySpaces(e)) {
                    props.onTextChanged(e);
                    setInputMessage(e);
                  } else {
                    props.onTextChanged("");
                    setInputMessage("");
                  }
                }}
              />

              <AppButton
                onPress={isEnableAttachement ? onClickAttachment : () => {}}
                style={{ opacity: isEnableAttachement ? 1 : 0.4 }}
              >
                <ClipIcon />
              </AppButton>
            </View>
            <Send {...props} containerStyle={styles.sendButton}>
              <SendIcon />
            </Send>
          </View>
        )}
      />
    );
  };

  const onImageCapture = (uri: string) => {
    if (uri) {
      setViewURL({ type: mediaTypes.IMAGE, uri, isUploading: true });
    }
  };

  const onClosePreviewMedia = () => {
    setViewURL({ type: "", uri: "", isUploading: false });
  };

  const checkScrollToTop = (data: any) => {
    onEndScrolledReached(data);
  };

  const onClickUpload = async (uri: string) => {
    if (uri) {
      closeCamera();
      onClosePreviewMedia();
      const { size, path } = await getFileDetails(uri);
      if (size <= 5242880) {
        if (navigatorID !== undefined && messageList.length === 0) {
          createConversation();
          setMessage(
            getMessageFormat({
              type: mediaTypes.IMAGE,
              content: uri,
              uploadingFlag: true,
              fileSize: size,
              fileName: getFileNameFromPath(path),
              currentUser: currentUser,
            })
          );
        } else
          onSend(
            getMessageFormat({
              type: mediaTypes.IMAGE,
              content: uri,
              uploadingFlag: true,
              fileSize: size,
              fileName: getFileNameFromPath(path),
              currentUser: currentUser,
            })
          );
      }
    }
  };

  logger.log("readCount");
  logger.log(readCount);

  return (
    <View style={{ flex: 1 }}>
      <PreviewMedia
        data={viewURL}
        onClose={onClosePreviewMedia}
        onClickUpload={onClickUpload}
      />
      <CameraComponent
        viewURL={viewURL}
        onClosePreviewMedia={onClosePreviewMedia}
        onClickUpload={onClickUpload}
        visible={isCameraOn}
        onCloseCamera={closeCamera}
        onCaptured={onImageCapture}
      />
      {isAttachmentVisible && !isKeyboardVisible && (
        <AppButton
          onPress={() => setIsAttachmentVisible(false)}
          style={
            [
              styles.attachmentContainer,
              {
                bottom: isAndroid()
                  ? scale(55)
                  : getDeviceDimenstion("height") > 736
                  ? scale(85)
                  : scale(55),
              },
            ] as ViewStyle
          }
        >
          <AttachmentBox onPress={onSelectAttachmentType} />
        </AppButton>
      )}

      {!loading ? (
        <GiftedChat
          ref={(component) => (chatListRef.current = component)}
          listViewProps={{
            onEndReached: (data: any) => checkScrollToTop(data),
          }}
          shouldUpdateMessage={(props: any, nextProps: any) =>
            props.extraData !== nextProps.extraData
          }
          messages={
            messageList.map((m, index) => {
              return { ...m, index: index };
            }) as any
          }
          onSend={(message) => onMessageSend(message[0].text.trim())}
          user={currentUser}
          showAvatarForEveryMessage
          maxComposerHeight={scale(80)}
          renderBubble={renderBubble}
          renderAvatar={() => null}
          renderDay={renderDay}
          renderInputToolbar={renderToolBar}
          extraData={unreadCount}
        />
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default EventHOC(ChatComponent);

ChatComponent.defaultProps = {
  onEndScrolledReached: () => {},
  isConversationExist: false,
  isNameShownforSingleConversation: false,
  disableSendOption: false,
  isNewConvo: false,
};
