import React from "react";
import { ActivityIndicator, Modal, View, ViewStyle } from "react-native";
import { themes } from "../../../enums/themes";
import AppText from "../appText";
import styles from "./styles";

type props = {
  isVisible: boolean;
};

const ModalLoader = ({ isVisible }: props) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.loaderWrapper}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color={themes.White} />
            <AppText style={styles.textStyle}>Connecting, please wait</AppText>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLoader;

ModalLoader.defaultProps = {
  isVisible: true,
};
