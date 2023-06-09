import React from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import { themes } from "../../../enums/themes";
import AppText from "../appText";
import styles from "./styles";

type props = {
  isLabelRequired: boolean;
};

const Loader = ({ isLabelRequired }: props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={themes.Black} />
      {isLabelRequired && (
        <AppText style={styles.label}>Loading, Please wait...</AppText>
      )}
    </View>
  );
};

export default Loader;

Loader.defaultProps = {
  isLabelRequired: true,
};
