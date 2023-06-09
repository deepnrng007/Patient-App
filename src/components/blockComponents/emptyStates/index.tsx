import { View } from "react-native";
import React from "react";
import styles from "./styles";
import AppText from "../../baseComponents/appText";

type EmptyStatesProps = {
  Icon?: any;
  title?: string;
  message?: string;
};
const EmptyStates = ({ Icon, title, message }: EmptyStatesProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Icon />
      </View>
      <View style={styles.box2}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.message}>{message}</AppText>
      </View>
    </View>
  );
};

export default EmptyStates;
