import { View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import AppButton from "../../baseComponents/appButton";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import { DrawerActions } from "@react-navigation/native";
import { MenuHumburger, NotificationIcon } from "../../../utils/imagePaths";
import DotSymbol from "../../baseComponents/dotSymbol";
import AppText from "../../baseComponents/appText";
import { screenNames } from "../../../enums";
import useAppDispatch from "../../customHooks/useAppDispatch";
import useAppSelector from "../../customHooks/useAppSelector";
import { setEncryptedStorage } from "../../../utils/encryptedStorage";
import { encriptedStorageKeys } from "../../../enums/constants";
import { getAvatarInitials } from "../../../utils/utils";
import logger from "../../../utils/logger";

const Header = () => {
  const [name, setName] = useState("");
  const { patientProfile } = useAppSelector((state) => {
    return {
      patientProfile: state.patientProfile,
    };
  });
  const { patientprofileData } = patientProfile;
  const navigation = useNavigation();

  useEffect(() => {
    if (patientprofileData.PatientId) {
      setName(`${patientprofileData.FirstName} ${patientprofileData.LastName}`);
    }
  }, [patientprofileData]);

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const navigateToProfile = () => {
    navigation.navigate(screenNames.PROFILE);
  };
  const navigateToNotifcations = () => {
    navigation.navigate(screenNames.NOTIFICATIONS);
  };
  return (
    <View style={styles.container}>
      <AppButton onPress={openDrawer}>
        <MenuHumburger />
      </AppButton>
      <View style={[styles.container, styles.profile]}>
        {/* <AppButton
          style={styles.iconButton as ViewStyle}
          onPress={navigateToNotifcations}
        >
          <DotSymbol isNotificationDot />
          <NotificationIcon />
        </AppButton> */}
        <AppButton onPress={navigateToProfile}>
          {/* <DotSymbol isNotificationDot /> */}
          <View style={styles.itemContainer}>
            <AppText style={styles.text}>{getAvatarInitials(name)}</AppText>
          </View>
        </AppButton>
      </View>
    </View>
  );
};

export default Header;
