import { View } from "react-native";
import React from "react";
import { LeftRightVAlueBoxProps } from "./type";
import styles from "./styles";
import AppText from "../appText";

const LeftRightValueBox = ({
  leftValue,
  rightValue,
  style,
}: LeftRightVAlueBoxProps) => {
  return (
    <View style={[styles.container, style]}>
      <AppText>{leftValue}</AppText>
      <AppText>{rightValue}</AppText>
    </View>
  );
};

export default LeftRightValueBox;

LeftRightValueBox.defaultProps = {
  style: {},
};
