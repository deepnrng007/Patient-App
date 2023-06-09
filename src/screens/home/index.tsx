import {
  ContainerView,
  Loader,
  useAppDispatch,
  useAppSelector,
} from "../../components";
import React, { useCallback, useEffect, useState } from "react";
import logger from "../../utils/logger";
import { screenNames, themes } from "../../enums";
import styles from "./styles";
import { NativeModules, View, ViewStyle } from "react-native";
import LastFewMessages from "../../components/blockComponents/lastFewMessages";
import { list, messages } from "../../utils/jsonData";
import { Disc, ErrorImage, MessageColorIcon } from "../../utils/imagePaths";
import HorizontalFormList from "../../components/blockComponents/horizontalFormList";
import { RootStackParams } from "../../screenNavigators/rootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { constants } from "../../enums/constants";
import { getAllConversationList } from "../../redux/apis/messagesAPI";
import TitleIconCount from "../../components/blockComponents/titleIconCount";
import { fetchDashboard } from "../../redux/apis/fetchDashBoard";
import { fetchConfig } from "../../redux/apis/fetchConfig";
import { fetchPatientProfile } from "../../redux/apis/fetchPatientProfile";
import NotFoundOrError from "../../components/baseComponents/notFoundOrError";
import { scale } from "react-native-size-matters";
import EventHOC from "../../components/baseComponents/eventHOC";
import { checkNavigatorConvExist, fetchAccessToken } from "../messages/helper";
import { global } from "../../global";
import { setTwilioClient } from "../helper";
import NewNavConversation from "../../components/blockComponents/newNavConversation";
import { useFocusEffect } from "@react-navigation/native";
import EnableTouchIDModal from "../../components/blockComponents/enableTouchIDModal";

type Props = NativeStackScreenProps<RootStackParams, screenNames.HOME>;

const Home = ({ navigation, isAppInForground }: Props | any) => {
  const dispatch = useAppDispatch();
  const { message, dashboard, config, patientProfile, login } = useAppSelector(
    (state) => {
      return {
        message: state.message,
        dashboard: state.dashBoard,
        config: state.config,
        patientProfile: state.patientProfile,
        login: state.login,
      };
    }
  );

  useEffect(() => {
    if (isAppInForground) getAccessToken();
  }, [isAppInForground]);

  const getAccessToken = async () => {
    const res = await fetchAccessToken(global.OWNER_EMAILID as any);
    if (res) {
      const { msgAccessToken } = res;
      // const fcmToken = global.FCM_TOKEN;
      if (msgAccessToken) setTwilioClient(msgAccessToken);
    }
  };
  const { conversationList = [], conversationListLoading } = message;

  const { data, error, loading } = dashboard;
  const [messageList, setList] = useState([]);

  const { configLoading } = config;
  const { loginDetails } = login;
  const { patientprofileData, patientprofileError } = patientProfile;

  const [resp, setResp] = useState({ navigatorName: "", navigatorID: "" });
  const [newConvCard, showNewConvCardExist] = useState(false);
  const [visibleTouchIDPopUp, setvisibleTouchIDPopUp] = useState(
    global.ISFIRSTTIMELOGGED
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      checkNavigatorConv();
      dispatch(
        getAllConversationList({
          userID: loginDetails.userOwnerId,
          searchKeyword: "",
          limit: 100,
          offset: 0,
        })
      );
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (conversationList && conversationList.conversationDetails) {
      setList(conversationList.conversationDetails);
    }
  }, [conversationList]);

  useEffect(() => {
    if (patientprofileData.PatientId) {
      logger.log("patientprofileData.PatientId");
      logger.log(patientprofileData.PatientId);
      NativeModules.JSToNativeEventModule.removeNotification(
        `${patientprofileData.PatientId}`
      );
      dispatch(fetchDashboard({ userID: patientprofileData.PatientId }));
    }
  }, [patientprofileData]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchConfig());
      dispatch(fetchPatientProfile({ id: loginDetails.userOwnerId }));
    }, [])
  );

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

  const createConversation = () => {
    navigation.navigate(screenNames.CREATECONVERSION, {
      navigatorID: resp?.navigatorID,
      navigatorName: resp?.navigatorName,
    });
  };

  const navigateToTouchEnable = () => {
    setvisibleTouchIDPopUp(false);
    setTimeout(() => {
      navigation.navigate(screenNames.FACEIDTOUCHIDENABLE);
    }, 200);
  };

  return (
    <>
      {configLoading ? (
        <ContainerView
          style={{
            backgroundColor: themes.White,
            flex: 20,
            height: 200,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Loader />
        </ContainerView>
      ) : (
        <ContainerView
          style={styles.container as ViewStyle}
          isScrollEnable={true}
          loading={false}
        >
          <EnableTouchIDModal
            visible={visibleTouchIDPopUp}
            onPressEnable={navigateToTouchEnable}
            onPressSkip={() => setvisibleTouchIDPopUp(false)}
          />
          <HorizontalFormList
            testID={constants.MYCAREPLAN}
            accessibilityLabel={constants.MYCAREPLAN}
            count={list.length}
            Icon={Disc}
            title={constants.MYCAREPLAN}
            data={data}
            loading={loading}
            emptyIcon={ErrorImage}
            emptyStateTitle={constants.NODATA}
            emptyStateMssage={constants.REFRESH}
            onPress={(name: string) => {
              if (name === "Pre Surgery") {
                navigation.navigate(screenNames.PRESURGERY);
              }
            }}
          />

          {messageList.length > 0 && (
            <View style={styles.nameDate}>
              <TitleIconCount
                title={constants.MESSAGES}
                count={10}
                Icon={MessageColorIcon}
                style={styles.titleCount as ViewStyle}
              />
            </View>
          )}
          {!conversationList ? (
            <ContainerView
              style={{
                backgroundColor: themes.White,
                flex: 20,
                height: 200,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Loader />
            </ContainerView>
          ) : messageList.length > 0 ? (
            <>
              {newConvCard && (
                <ContainerView style={{ marginHorizontal: scale(18) }}>
                  <NewNavConversation onPress={createConversation} />
                </ContainerView>
              )}
              <LastFewMessages
                list={messageList.slice(0, 2)}
                style={
                  [
                    styles.horizontalLisStyle,
                    messages.length === 0 && { padding: 0 },
                  ] as ViewStyle
                }
                testID={"MessagesListsHome"}
                accessibilityLabel={"MessagesListsHome"}
                emptyIcon={ErrorImage}
                emptyStateTitle={constants.NODATA}
                emptyStateMssage={constants.REFRESH}
              ></LastFewMessages>
            </>
          ) : (
            <NotFoundOrError
              type='emptyInbox'
              enableIcon
              style={{
                backgroundColor: "#F9F9F9",
                margin: scale(20),
                borderRadius: scale(10),
                alignItems: "center",
                justifyContent: "center",
                borderWidth: scale(1),
                borderColor: themes.LighGray3,
              }}
              onPress={createConversation}
              showNewConvoCard={newConvCard}
              isHorizontal
            />
          )}
        </ContainerView>
      )}
    </>
  );
};

export default EventHOC(Home);
