import { View, ViewStyle } from "react-native";
import React from "react";
import styles from "./styles";
import AppText from "../appText";
import { CloseWhiteIcon } from "../../../utils/imagePaths";
import AppButton from "../appButton";
import { constants } from "../../../enums/constants";

type props = {
  onClose: any;
  style?: ViewStyle;
  message: string;
};

const SnackBarComponent = ({ onClose, style, message }: props) => {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.errorLabel}>{message}</AppText>
      <AppButton onPress={onClose} style={styles.close as ViewStyle}>
        <CloseWhiteIcon />
      </AppButton>
    </View>
  );
};

export default SnackBarComponent;
