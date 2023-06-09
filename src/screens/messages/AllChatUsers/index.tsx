import React, { useCallback, useEffect, useState } from "react";
import {
  AppButton,
  AppText,
  ContainerView,
  Loader,
  useAppDispatch,
  useAppSelector,
} from "../../../components";

import {
  FlatList,
  NativeEventEmitter,
  NativeModules,
  View,
  ViewStyle,
} from "react-native";
import { getDateFormatForDay, isAndroid } from "../../../utils/utils";
import styles from "./styles";
import { screenNames, themes } from "../../../enums";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import moment from "moment";
import GroupImages from "../../../components/baseComponents/groupImages";
import { getAllConversationList } from "../../../redux/apis/messagesAPI";

import { constants } from "../../../enums/constants";
import logger from "../../../utils/logger";
import { clearMessages } from "../../../redux/slicers/messageSlice";
import NotFoundOrError from "../../../components/baseComponents/notFoundOrError";
import { scale } from "react-native-size-matters";
import { checkNavigatorConvExist } from "../helper";
import NewNavConversation from "../../../components/blockComponents/newNavConversation";
import { clearChatIdsAction } from "../../../redux/slicers/chatIdsSlice";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<
  RootStackParams,
  screenNames.ALLCHATMESSAGES
>;

const AllChatMessages = (props: Props) => {
  const dispatch = useAppDispatch();
  const { conversationList = [], conversationListError } = useAppSelector(
    (state) => state.message
  );
  const { loginDetails } = useAppSelector((state) => state.login);

  const [newConvCard, showNewConvCardExist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isocused, setisocused] = useState(false);

  const [resp, setResp] = useState({
    navigatorID: "",
    navigatorName: "",
  });

  const { navigation } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [list, setList] = useState([]);

  useEffect(() => {
    let eventListener: any = null;
    if (isAndroid()) {
      const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
      eventListener = eventEmitter.addListener("getAllConversations", () => {
        searchMessages("");
      });
    } else {
      const nativeEventSupport = new NativeEventEmitter(
        NativeModules.NativeEventManager
      );
      nativeEventSupport.addListener("getAllConversations", () => {
        searchMessages("");
      });
    }
    return () => {
      dispatch(clearChatIdsAction());
      if (eventListener) eventListener.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setisocused((prev) => true);
      checkNavigatorConv();
      searchMessages("");
      return () => setisocused(false);
    }, [])
  );

  logger.log("lllllll", loading);
  logger.log("lllllll", conversationList);

  const checkNavigatorConv = async () => {
    const response = await checkNavigatorConvExist(loginDetails.userOwnerId);
    logger.log("exissssss");
    logger.log(response);

    setResp(response);

    if (!response.isConvExists && response.navigatorID != null) {
      showNewConvCardExist(true);
    } else {
      showNewConvCardExist(false);
    }
  };
  useEffect(() => {
    if (conversationList && !conversationList.conversationDetails) {
      setLoading(false);
      setList([]);
    } else if (conversationList && conversationList.conversationDetails) {
      setList(conversationList.conversationDetails);
      setLoading(false);
    } else {
      setList([]);
      setLoading(false);
    }
  }, [conversationList]);

  const searchMessages = (text: string) => {
    if (text.length === 0) {
      dispatch(
        getAllConversationList({
          userID: loginDetails.userOwnerId,
          searchKeyword: "",
          limit: 100,
          offset: 0,
        })
      );
    }
  };

  const navigateToChat = (
    conversionName: string,
    conversationID: number,
    twilioConversationId: string
  ) => {
    navigation.navigate(screenNames.CHAT, {
      conversionName,
      conversationID,
      twilioConversationId,
    });
  };
  const createConversation = () => {
    navigation.navigate(screenNames.CREATECONVERSION, {
      navigatorID: resp?.navigatorID,
      navigatorName: resp?.navigatorName,
    });
  };

  const renderItems = ({ item }: any) => {
    const {
      name,
      conversationID,
      twilioConversationId,
      lastMessageDateTime,
      type,
      groupConversationIcon,
    } = item;

    const typ = type.includes("EPISODE") ? type.substring(0, 7) : type;

    const isUnread = false;
    return (
      <View
        style={[
          { flex: 1 },
          { backgroundColor: isUnread ? themes.unredMessageBG : themes.White },
        ]}
      >
        <AppButton
          onPress={() => {
            navigateToChat(name, conversationID, twilioConversationId);
          }}
          style={styles.row as ViewStyle}
        >
          <View style={styles.col1}>
            <GroupImages
              groupConversationIcon={groupConversationIcon}
              name={item.name}
            />
          </View>
          <View style={styles.col2}>
            <View style={styles.nameDate}>
              <AppText style={styles.name} numberOfLines={1}>
                {item.name}
              </AppText>
              {lastMessageDateTime != null ? (
                <AppText style={styles.date}>
                  {getDateFormatForDay(
                    lastMessageDateTime.substring(0, 10),
                    "MMM DD"
                  ) +
                    " " +
                    moment(lastMessageDateTime).format("hh:mm a")}
                </AppText>
              ) : null}
            </View>
            <AppText style={styles.message} numberOfLines={1}>
              {item.lastMessageContent}
            </AppText>
            <View style={styles.badge}>
              <AppText style={styles.convesionType}>{typ}</AppText>
            </View>
          </View>
        </AppButton>
      </View>
    );
  };

  const isConvoExist =
    conversationList &&
    conversationList.conversationDetails &&
    conversationList.conversationDetails.length > 0;

  return loading ? (
    <ContainerView style={{ backgroundColor: themes.White, flex: 1 }}>
      <Loader />
    </ContainerView>
  ) : list.length > 0 ? (
    <ContainerView style={styles.container as ViewStyle}>
      <AppText style={styles.pageTitle}>{constants.MESSAGES}</AppText>

      {newConvCard ? (
        <NewNavConversation onPress={createConversation} />
      ) : (
        <></>
      )}
      {isConvoExist && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={list}
          renderItem={renderItems}
          style={{ paddingTop: scale(10) }}
          keyboardShouldPersistTaps={true}
        />
      )}
    </ContainerView>
  ) : (
    <ContainerView
      style={{ backgroundColor: themes.White, padding: scale(20) }}
    >
      <NotFoundOrError
        enableIcon={!isConvoExist}
        type='emptyInbox'
        style={{
          backgroundColor: themes.transparent,
          marginTop: scale(20),
          alignItems: "center",
          justifyContent: "center",
        }}
        isHorizontal={false}
      />
      {newConvCard && <NewNavConversation onPress={createConversation} />}
    </ContainerView>
  );
};

export default AllChatMessages;
