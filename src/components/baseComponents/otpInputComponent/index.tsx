import { View, ViewStyle, Keyboard } from "react-native";
import React, { useEffect, useImperativeHandle, useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import RNOtpVerify from "react-native-otp-verify";
import styles from "./styles";
import logger from "../../../utils/logger";
import { alertBox, getOTPfromMessage, isAndroid } from "../../../utils/utils";
import { themes } from "../../../enums";
import { forwardRef } from "react";

type props = {
  style?: ViewStyle;
  codeInputFieldStyle?: ViewStyle;
  onCodeFilled: any;
  isError: boolean;
};

const OTPInputComponent = (
  { style, onCodeFilled, codeInputFieldStyle, isError }: props,
  ref: any
) => {
  const [otp, setOtp] = useState("" as any);
  const [clearInput, setClearInput] = useState(false);
  const getHash = () => {
    RNOtpVerify.getHash()
      .then((code) => logger.log("hash code :", code))
      .catch((error) => logger.log("hash code error :", error));
  };

  useImperativeHandle(ref, () => ({
    // each key is connected to `ref` as a method name
    // they can execute code directly, or call a local method
    method1: () => {
      localMethod1();
    },
    method2: () => {
      console.log("Remote method 2 executed");
    },
  }));
  //...

  // These are local methods, they are not seen by `ref`,
  const localMethod1 = () => {
    setOtp("");
    setClearInput(true);
  };

  const startListeningForOtp = () =>
    RNOtpVerify.getOtp()
      .then((p) => {
        logger.log(p);
        RNOtpVerify.addListener(otpHandler);
      })
      .catch((p) => logger.log(p));

  const otpHandler = (message: string) => {
    const otp = getOTPfromMessage(message);
    if (otp) {
      logger.log("otp issss :", otp);
      setOtp(otp);
      RNOtpVerify.removeListener();
      Keyboard.dismiss();
    }
  };
  useEffect(() => {
    if (isAndroid()) {
      getHash();
      startListeningForOtp();
      return () => RNOtpVerify.removeListener();
    }
  }, []);

  return (
    <View>
      <OTPInputView
        pinCount={4}
        code={otp ? otp : undefined}
        autoFocusOnLoad={false}
        keyboardType={"number-pad"}
        style={[styles.otpContainer, style] as ViewStyle}
        codeInputFieldStyle={
          [
            styles.inputFieldStyle,
            codeInputFieldStyle,
            isError && { color: themes.Red4 },
          ] as ViewStyle
        }
        onCodeFilled={onCodeFilled}
        clearInputs={clearInput}
        onCodeChanged={(code) => {
          setOtp(code);
          setClearInput(false);
        }}
      />
    </View>
  );
};

export default forwardRef(OTPInputComponent);
