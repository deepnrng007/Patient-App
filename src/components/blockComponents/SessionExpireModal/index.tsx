import { Modal, ViewStyle, View } from "react-native";
import React from "react";
import { styles } from "./styles";
import AppText from "../../baseComponents/appText";
import AppButton from "../../baseComponents/appButton";
import { constants } from "../../../enums/constants";

type Props = {
  visible: boolean;
  onPress: any;
};
const SessionExpireModal = ({ visible, onPress }: Props) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={() => {}}>
      <View style={styles.container as ViewStyle}>
        <View style={styles.dialogView}>
          <AppText style={styles.title}>{constants.SESSIONEXPIRETITLE}</AppText>
          <AppText style={styles.message}>
            {constants.SESSIONEXPIREMESSAGE}
          </AppText>
          <AppButton style={styles.approveButton} onPress={onPress}>
            <AppText style={styles.approveText}>Okay</AppText>
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

export default SessionExpireModal;
