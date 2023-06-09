import React from "react";
import { ViewStyle } from "react-native";
import { constants } from "../../../enums/constants";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import styles from "./styles";

type props = {
  onPress: any;
};
const NewNavConversation = ({ onPress }: props) => {
  return (
    <AppButton style={styles.navigatorChat as ViewStyle} onPress={onPress}>
      <AppText style={styles.title}>{constants.HINAVIGATOR}</AppText>
      <AppText style={styles.subtitle}>{constants.NEWCONVERSATION}</AppText>
    </AppButton>
  );
};

export default NewNavConversation;
