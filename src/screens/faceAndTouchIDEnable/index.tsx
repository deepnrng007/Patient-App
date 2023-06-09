import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Switch, View } from "react-native";
import { scale } from "react-native-size-matters";
import { AppText, ContainerView } from "../../components";
import EnabledTouchIDModal from "../../components/blockComponents/enabledTouchIDModal";
import { langVar, screenNames, themes } from "../../enums";
import { constants, encriptedStorageKeys } from "../../enums/constants";
import {
  getEncryptedStorage,
  removeEncryptedStorage,
  setEncryptedStorage,
} from "../../utils/encryptedStorage";
import { FaceTouchIdsIcon } from "../../utils/imagePaths";
import styles from "./styles";

const FaceAndTouchIDEnable = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [popupEnable, setpopupEnable] = useState(false);
  const navigation = useNavigation<any>();
  useEffect(() => {
    checkToggleValue();
  }, []);

  const checkToggleValue = async () => {
    const res = await getEncryptedStorage(encriptedStorageKeys.ENABLETOUCHID);
    if (res) setIsEnabled(true);
  };
  const toggleSwitch = async (flag: boolean) => {
    setTimeout(() => {
      setpopupEnable(true);
    }, 300);
    setIsEnabled(flag);
    if (flag)
      await setEncryptedStorage(encriptedStorageKeys.ENABLETOUCHID, {
        success: true,
      });
    else await removeEncryptedStorage(encriptedStorageKeys.ENABLETOUCHID);
  };

  const navigateTo = () => {
    setpopupEnable(false);
    navigation.navigate(screenNames.HOME);
  };

  return (
    <ContainerView
      headerName={constants.FACEANDTOUCHID}
      isBackRequired
      hideStatusSpacer
      style={{ paddingHorizontal: scale(16) }}
    >
      <EnabledTouchIDModal
        visible={popupEnable}
        onClose={() => {}}
        enabled={isEnabled}
        navigateTo={navigateTo}
      />
      <View style={styles.faceidTouchIdIcon}>
        <FaceTouchIdsIcon />
      </View>
      <View style={styles.row}>
        <AppText style={styles.label} allowFontScaling numberOfLines={1}>
          {constants.ENABLETOUCHID}
        </AppText>
        <Switch
          trackColor={{
            false: "rgba(120, 120, 128, 0.16)",
            true: themes.green,
          }}
          ios_backgroundColor="rgba(120, 120, 128, 0.16)"
          thumbColor={themes.White}
          onValueChange={() => toggleSwitch(!isEnabled)}
          value={isEnabled}
        />
      </View>
      <AppText style={styles.description}>
        {constants.ENABLETOUCHIDDESC}
      </AppText>
    </ContainerView>
  );
};

export default FaceAndTouchIDEnable;
