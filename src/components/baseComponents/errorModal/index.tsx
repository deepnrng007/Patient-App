import React from "react";
import { ActivityIndicator, Modal, View, ViewStyle } from "react-native";
import { themes } from "../../../enums/themes";
import { ErrorInfo } from "../../../utils/imagePaths";
import AppText from "../appText";
import LoginButton from "../loginButton";
import { styles } from "./styles";

type props = {
  isVisible: boolean;
  onPress: any;
  currentContact?: any;
  message?: string;
  Icon: any;
};

const ErrorModal = ({
  isVisible,
  onPress,
  currentContact,
  message,
  Icon,
}: props) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <View style={styles.parentView}>
        <View style={styles.activityIndicatorWrapper}>
          <Icon width={83} height={83} />
          {message ? (
            <AppText style={styles.erroMessage}>{message}</AppText>
          ) : (
            <View style={{ alignItems: "center" }}>
              <AppText style={styles.erroMessage}>
                Some error occured while calling
              </AppText>
              {currentContact && (
                <AppText style={styles.username}>{currentContact.name}</AppText>
              )}
            </View>
          )}

          <LoginButton
            onPress={onPress}
            enable={true}
            label={"OK"}
            removeIcon
            style={{ width: "100%", height: 50 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

ErrorModal.defaultProps = {
  isVisible: true,
};
