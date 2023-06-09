/* This is component for showing
NavigationHeader, NavigationItems, NavigationFooter Views. */

import React from "react";
import { DeviceEventEmitter, View } from "react-native";

import { DrawerContentScrollView } from "@react-navigation/drawer";
import DrawerElement from "../drawerElement";
import { AppButton, useAppDispatch } from "../..";
import {
  CarePlanIcon,
  CloseIcon,
  EpisodeIcon,
  infoGreen,
  ProfileIcon,
  ScannerIcon,
} from "../../../utils/imagePaths";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import UserInfoCard from "../userInfoCard";
import { DrawerContentProps } from "./types";
import { screenNames } from "../../../enums";
import { scale } from "react-native-size-matters";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import { constants, encriptedStorageKeys } from "../../../enums/constants";
import useAppSelector from "../../customHooks/useAppSelector";
import { deleteTwilioBinding } from "../../../screens/helper";
import { removeEncryptedStorage } from "../../../utils/encryptedStorage";

type navigationProps = NativeStackNavigationProp<
  RootStackParams,
  screenNames.DRAWERNAVIGATION
>;

const DrawerContent = ({ props }: DrawerContentProps) => {
  const navigation = useNavigation<navigationProps>();
  const { patientProfile } = useAppSelector((state) => {
    return {
      patientProfile: state.patientProfile,
    };
  });
  const { patientprofileData = {} } = patientProfile;
  const { FirstName = "", LastName = "" } = patientprofileData;
  const signOut = async () => {
    deleteTwilioBinding();
    DeviceEventEmitter.emit(constants.LOG_OUT_EVENT);
  };

  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
    >
      <AppButton style={styles.closeButton} onPress={closeDrawer}>
        <CloseIcon height={scale(33)} width={scale(33)} />
      </AppButton>
      <View style={styles.navigationHeaderView}>
        <UserInfoCard
          userName={`${FirstName} ${LastName}`}
          onClickSignout={() => signOut()}
        />
      </View>
      <View style={[styles.drawerElementView, { marginTop: scale(50) }]}>
        <DrawerElement
          label={constants.MYPROFILE}
          onNavigate={() => {
            navigation.navigate(screenNames.PROFILE);
          }}
          DrawerIcon={ProfileIcon}
        />
      </View>
      <View style={styles.drawerElementView}>
        <DrawerElement
          label={constants.EPISODEINFORMATION}
          onNavigate={() => {
            navigation.navigate(screenNames.EPISODEDETAILS);
          }}
          DrawerIcon={EpisodeIcon}
        />
      </View>
      <View style={styles.drawerElementView}>
        <DrawerElement
          label={constants.CAREPLAN}
          onNavigate={() => {
            navigation.navigate(screenNames.TOCINFORMATION, {});
          }}
          DrawerIcon={CarePlanIcon}
        />
      </View>
      <View style={styles.drawerElementView}>
        <DrawerElement
          DrawerIcon={ScannerIcon}
          label={constants.FACEANDTOUCHID}
          onNavigate={() => {
            closeDrawer();
            navigation.navigate(screenNames.FACEIDTOUCHIDENABLE);
          }}
        />
      </View>
      <View style={styles.drawerElementView}>
        <DrawerElement
          label={constants.ABOUT}
          onNavigate={() => {
            navigation.navigate(screenNames.ABOUTSCREEN);
          }}
          DrawerIcon={infoGreen}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
