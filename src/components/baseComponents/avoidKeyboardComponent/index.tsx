import { KeyboardAvoidingView, Platform, ViewStyle } from "react-native";
import React from "react";
import { isAndroid } from "../../../utils/utils";
import { scale } from "react-native-size-matters";

type props = {
  children: any;
  style?: ViewStyle;
  verticalOffset?: number;
  isAndroid: boolean;
};

const AvoidKeyboardComponent = ({
  children,
  style,
  verticalOffset,
  isAndroid,
}: props) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : verticalOffset}
      behavior={isAndroid ? "padding" : "height"}
      style={[{ flex: 1 }, style]}
      enabled={Platform.OS === "ios" ? true : true}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default AvoidKeyboardComponent;

AvoidKeyboardComponent.defaultProps = {
  verticalOffset: scale(100),
  isAndroid: !isAndroid(),
};
