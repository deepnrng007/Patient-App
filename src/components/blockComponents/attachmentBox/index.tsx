import { View, ViewStyle } from "react-native";
import React from "react";
import AppButton from "../../baseComponents/appButton";
import AppText from "../../baseComponents/appText";
import styles from "./styles";
import { attachmentType } from "../../../enums/constants";
import {
  CameraIcon,
  DocumentIcon,
  GallaryIcon,
} from "../../../utils/imagePaths";
import { themes } from "../../../enums";
import { scale } from "react-native-size-matters";

type AttachmentBoxProps = {
  onPress: (type: string) => void;
};

const AttachmentBox = ({ onPress }: AttachmentBoxProps) => {
  return (
    <View style={styles.container}>
      <AppButton
        style={[styles.button, styles.galleryBtn] as ViewStyle}
        onPress={() => onPress(attachmentType.GALLERY)}
      >
        <GallaryIcon />
        <AppText style={[styles.optionLabel, { color: themes.White }]}>
          Gallery
        </AppText>
      </AppButton>

      <AppButton
        style={styles.button as ViewStyle}
        onPress={() => onPress(attachmentType.DOCUMENT)}
      >
        <DocumentIcon />
        <AppText style={styles.optionLabel}>Documents</AppText>
      </AppButton>
      <AppButton
        style={[styles.button, { marginBottom: scale(40) }] as ViewStyle}
        onPress={() => onPress(attachmentType.CAMERA)}
      >
        <CameraIcon />
        <AppText style={styles.optionLabel}>Camera</AppText>
      </AppButton>
    </View>
  );
};

export default AttachmentBox;
