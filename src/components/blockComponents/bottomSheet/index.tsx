import React from "react";
import { View, ViewStyle } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useDispatch } from "react-redux";
import { AppButton, AppText } from "../..";
import { themes } from "../../../enums";
import { makeCall } from "../../../redux/apis/callApi";
import logger from "../../../utils/logger";
import { styles } from "./styles";
import { bottomSheetProps } from "./types";

const BottomSheet = (props: bottomSheetProps) => {
  const { currentContact, refRBSheet, onPress, onCancel } = props;
  logger.log(currentContact);
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnPressBack={true}
      customStyles={{
        wrapper: styles.wrapper,
        container: styles.container,
      }}
    >
      <View style={styles.bottomSheetView}>
        <View style={styles.textView}>
          <AppText style={styles.name}>{currentContact.name}</AppText>
          <AppText style={styles.contactType}>
            {currentContact.contactType}
          </AppText>
        </View>
        <View style={styles.buttonsView}>
          <AppButton
            style={
              [
                styles.callButton,
                currentContact.contactType === "Physician" && {
                  backgroundColor: themes.green,
                  opacity: 0.6,
                },
              ] as ViewStyle
            }
            onPress={
              currentContact.contactType !== "Physician" ? onPress : () => {}
            }
          >
            <AppText style={styles.callText}>Make a Call</AppText>
          </AppButton>
          <AppButton style={styles.cancelButton} onPress={onCancel}>
            <AppText style={styles.cancelText}>Cancel</AppText>
          </AppButton>
        </View>
      </View>
    </RBSheet>
  );
};

export default BottomSheet;
