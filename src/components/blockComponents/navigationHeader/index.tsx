import { BackHandler, View, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import AppButton from "../../baseComponents/appButton";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import { BackNavigationIcon } from "../../../utils/imagePaths";
import AppText from "../../baseComponents/appText";
import DotSymbol from "../../baseComponents/dotSymbol";
import { props } from "./types";
import { scale } from "react-native-size-matters";
import { screenNames } from "../../../enums";
import { constants, NOTIFICATION } from "../../../enums/constants";
import logger from "../../../utils/logger";

const NavigationHeader = ({
  navigationTitle,
  isFilterRequired,
  isFilterApplied = false,
  RightIcon,
  onPressFilterIcon,
  isBackToAllConvoScreen,
  style,
  isBackRequired,
  customGoBack,
}: props) => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  const handleBackButtonClick = () => {
    goBack();
    return false;
  };

  const goBack = () => {
    if (customGoBack === constants.NOTIFICATION) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: screenNames.DRAWERNAVIGATION as any,
            params: {
              screen: screenNames.BOTTOMNAVIGATION,
              params: {
                screen: screenNames.HOME,
              },
            },
          },
        ],
      });
    } else if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <View style={[styles.container, style]}>
      {isBackRequired ? (
        <AppButton
          onPress={goBack}
          style={
            [
              styles.back,
              !isFilterRequired && { marginRight: scale(-30) },
            ] as ViewStyle
          }
        >
          <BackNavigationIcon />
        </AppButton>
      ) : (
        <View />
      )}
      <View style={styles.navigationTitleView}>
        <AppText numberOfLines={1} style={styles.navigationTitle}>
          {navigationTitle}
        </AppText>
      </View>
      {isFilterRequired ? (
        <AppButton onPress={onPressFilterIcon}>
          {isFilterApplied ? <DotSymbol isNotificationDot /> : null}
          {RightIcon ? <RightIcon /> : null}
        </AppButton>
      ) : (
        <View />
      )}
    </View>
  );
};

export default NavigationHeader;
