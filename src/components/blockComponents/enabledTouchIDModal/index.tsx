import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import { AppText } from "../..";
import { constants } from "../../../enums/constants";
import { CheckedGreenCircle } from "../../../utils/imagePaths";
import CustomModal from "../../baseComponents/customModal";
import LoginButton from "../../baseComponents/loginButton";
import styles from "./styles";

type Props = {
  visible: boolean;
  onClose: any;
  enabled: boolean;
  navigateTo: any;
};
const EnabledTouchIDModal = ({
  visible,
  onClose,
  enabled,
  navigateTo,
}: Props) => {
  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <CheckedGreenCircle />
        <AppText style={styles.title}>{constants.SUCCESS}</AppText>
      </View>
      {enabled ? (
        <AppText style={styles.titleDesc}>{constants.SUCCESSENABLED}</AppText>
      ) : (
        <AppText style={styles.titleDesc}>{constants.SUCCESSDISABLED}</AppText>
      )}

      {enabled && (
        <AppText style={styles.titleDesc}>
          {constants.TODISABLE}{" "}
          <AppText style={[styles.titleDesc, styles.bold]}>
            {constants.FACEANDTOUCHID}
          </AppText>{" "}
          <AppText style={styles.titleDesc}>{constants.UNDER}</AppText>{" "}
          <AppText style={[styles.titleDesc, styles.bold]}>
            {constants.MENU}
          </AppText>{" "}
          <AppText style={styles.titleDesc}>{constants.OPTION}</AppText>
        </AppText>
      )}
      <LoginButton
        style={{ marginTop: scale(15) }}
        onPress={navigateTo}
        label={constants.GOTO}
        enable
        removeIcon
      />
    </CustomModal>
  );
};

export default EnabledTouchIDModal;
