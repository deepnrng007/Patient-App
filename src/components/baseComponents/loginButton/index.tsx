import { ViewStyle } from "react-native";
import React from "react";
import AppButton from "../appButton";
import styles from "./styles";
import { themes } from "../../../enums";
import { RoundTickIcon } from "../../../utils/imagePaths";
import AppText from "../appText";
import { ActivityIndicator } from "react-native-paper";

type props = {
  onPress: unknown;
  enable: boolean;
  label: string;
  removeIcon: boolean;
  style?: ViewStyle;
  loading?: boolean;
};
const LoginButton = ({
  onPress,
  enable,
  label,
  removeIcon,
  style,
  loading = false,
}: props) => {
  return (
    <AppButton
      onPress={!enable ? () => {} : onPress}
      style={
        [
          styles.loginBtn,
          enable && {
            opacity: 1,
            backgroundColor: themes.green,
          },
          style,
        ] as ViewStyle
      }
    >
      {loading ? (
        <ActivityIndicator color={themes.White} />
      ) : (
        <>
          {!removeIcon && <RoundTickIcon />}
          <AppText style={styles.loginLabel}>{label}</AppText>
        </>
      )}
    </AppButton>
  );
};

export default LoginButton;

LoginButton.defaultProps = {
  enable: false,
  label: "LoginIn",
  removeIcon: false,
};
