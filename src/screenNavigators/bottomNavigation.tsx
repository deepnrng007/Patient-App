import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, ViewStyle } from "react-native";
import { useDispatch } from "react-redux";
import {
  AppButton,
  AppText,
  ContainerView,
  Header,
  useAppDispatch,
  useAppSelector,
} from "../components";
import DotSymbol from "../components/baseComponents/dotSymbol";
import { screenNames } from "../enums";
import { encriptedStorageKeys } from "../enums/constants";
import { global } from "../global";
import { clearCarePlanDetails } from "../redux/slicers/carePlanSlice";
import { clearconfigDetails } from "../redux/slicers/configSlice";
import { clearDashBoardData } from "../redux/slicers/dashboardSlice";
import { cleardischargeData } from "../redux/slicers/dischargeSlice";
import { clearEpisodeData } from "../redux/slicers/episodeSlice";
import { clearLoginDetails } from "../redux/slicers/loginSlice";
import { clearpatientprofileData } from "../redux/slicers/patientProfileSlice";
import { clearProfileDetails } from "../redux/slicers/profileSlice";
import Home from "../screens/home";
import Messages from "../screens/messages/AllChatUsers";
import Phone from "../screens/phone";
import { removeEncryptedStorage } from "../utils/encryptedStorage";
import {
  Call,
  CallFilled,
  Document,
  ErrorImage,
  HomeIconActive,
  HomeIconInactive,
  MsgFilled,
} from "../utils/imagePaths";
import logger from "../utils/logger";
import { RootStackParams } from "./rootNavigator";
import styles from "./styles";

export type bottomNavigationParams = {
  HOME: undefined;
  PHONE: undefined;
  MESSAGE: undefined;
};

const BottomTabs = createMaterialBottomTabNavigator<bottomNavigationParams>();

type navigationProps = NativeStackNavigationProp<
  RootStackParams,
  screenNames.BOTTOMNAVIGATION
>;

const BottomNavigation = () => {
  const navigation = useNavigation<navigationProps>();
  const dispatch = useDispatch();
  const { login } = useAppSelector((state) => {
    return {
      login: state.login,
    };
  });
  const { loginDetails } = login;

  const signOut = async () => {
    dispatch(clearLoginDetails());
    dispatch(clearCarePlanDetails());
    dispatch(clearconfigDetails());
    dispatch(clearDashBoardData());
    dispatch(cleardischargeData());
    dispatch(clearEpisodeData());
    dispatch(clearProfileDetails());
    dispatch(clearpatientprofileData());

    const res = await removeEncryptedStorage(encriptedStorageKeys.LOGINDETAILS);
    if (res) navigation.navigate(screenNames.LOGIN);
  };

  return (
    <ContainerView hideStatusSpacer style={styles.container as ViewStyle}>
      <View style={styles.headerContainer}>
        {global.ISPENDINGAPPROVAL ? (
          <AppButton
            style={styles.signout as ViewStyle}
            onPress={() => {
              signOut();
            }}
          >
            <AppText style={styles.signoutText}>Sign Out</AppText>
          </AppButton>
        ) : (
          <Header />
        )}
      </View>

      {global.ISPENDINGAPPROVAL ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ErrorImage />
          <AppText style={styles.errorTest}>
            Your profile is pending for approval
          </AppText>
        </View>
      ) : (
        <BottomTabs.Navigator
          keyboardHidesNavigationBar={false}
          barStyle={styles.barStyle}
        >
          <BottomTabs.Screen
            name={screenNames.HOME}
            component={Home}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ focused }) => (
                <View style={styles.tabBarIcon}>
                  {focused ? (
                    <>
                      <View style={{ height: 20 }}>
                        <HomeIconActive />
                      </View>
                      <DotSymbol style={styles.activeDot as ViewStyle} />
                      <AppText style={styles.tabLabel}>Home</AppText>
                    </>
                  ) : (
                    <>
                      <View style={{ height: 20 }}>
                        <HomeIconInactive />
                      </View>
                      <DotSymbol style={styles.dotStyle as ViewStyle} />
                      <AppText
                        style={[styles.tabLabel, styles.tabLabelInactive]}
                      >
                        Home
                      </AppText>
                    </>
                  )}
                </View>
              ),
            }}
          />
          <BottomTabs.Screen
            name={screenNames.PHONE}
            component={Phone}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ focused }) => (
                <View style={styles.tabBarIcon}>
                  {focused ? (
                    <>
                      <View style={{ height: 20 }}>
                        <CallFilled />
                      </View>

                      <DotSymbol style={styles.activeDot as ViewStyle} />
                      <AppText style={styles.tabLabel}>Phone</AppText>
                    </>
                  ) : (
                    <>
                      <View style={{ height: 20 }}>
                        <Call />
                      </View>
                      <DotSymbol style={styles.dotStyle as ViewStyle} />
                      <AppText
                        style={[styles.tabLabel, styles.tabLabelInactive]}
                      >
                        Phone
                      </AppText>
                    </>
                  )}
                </View>
              ),
            }}
          />
          <BottomTabs.Screen
            name={screenNames.MESSAGE}
            component={Messages}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ focused }) => (
                <View style={styles.tabBarIcon}>
                  {focused ? (
                    <>
                      <View style={{ height: 22 }}>
                        <MsgFilled />
                      </View>

                      <DotSymbol style={styles.activeDot as ViewStyle} />
                      <AppText style={styles.tabLabel}>Messages</AppText>
                    </>
                  ) : (
                    <>
                      <View style={{ height: 22 }}>
                        <Document />
                      </View>
                      <DotSymbol style={styles.dotStyle as ViewStyle} />
                      <AppText
                        style={[styles.tabLabel, styles.tabLabelInactive]}
                      >
                        Messages
                      </AppText>
                    </>
                  )}
                </View>
              ),
            }}
          />
        </BottomTabs.Navigator>
      )}
    </ContainerView>
  );
};

export default BottomNavigation;
