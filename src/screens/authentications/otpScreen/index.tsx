import { View, Image, ViewStyle, TextStyle, Dimensions } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppText, ContainerView, AppButton, Loader } from "../../../components";
import { physicianImage, RightArrowLineIcon } from "../../../utils/imagePaths";
import styles from "./styles";
import logger from "../../../utils/logger";
import { countDownTimer, getMaskedNumber } from "../../../utils/utils";
import OTPInputComponent from "../../../components/baseComponents/otpInputComponent";
import { screenNames } from "../../../enums";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { constants } from "../../../enums/constants";
import { getOTP, getOTPForRegisteration, getValidateOTP } from "../helper";
import LinearGradient from "react-native-linear-gradient";
import BackgroundTimer from "react-native-background-timer";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParams, screenNames.OTPSCREEN>;

const ZEROTIMEFORMAT = "00:00";
const OTPScreen = ({ navigation, route }: Props) => {
  const TIME = 599;
  const refff = useRef<any>();
  const childRef = useRef<any>();
  const [timer, setTimer] = useState("10:00");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { params: { resetData } = {} } = route;
  const { phoneNUmber, username, from, code } = resetData;
  const [resendCode, setResendCode] = useState(code);

  const onCodeFilled = async (code: string) => {
    setIsError(false);
    setLoading(true);
    const params = {
      phoneNumber: phoneNUmber,
      verificationCode: code,
    };
    logger.log(params);
    const res = await getValidateOTP(params);

    if (res.result) {
      clearTimer();
      setLoading(false);
      from === "Register"
        ? navigation.replace(screenNames.REGISTER, { mobileNo: phoneNUmber })
        : navigation.navigate(screenNames.CONFIRMPASSWORD, {
            resetData: {
              ...resetData,
              code: resendCode,
            },
          });
    } else {
      setLoading(false);
      setIsError(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => clearTimer();
    }, [])
  );

  useEffect(() => {
    setTimeout(() => {
      refff.current = countDownTimer(TIME, (time: number, timer: string) => {
        setTimer(() => timer);
      });
    }, 200);
    return () => clearTimer();
  }, []);

  useEffect(() => {
    logger.log("timer :", timer);

    if (timer === ZEROTIMEFORMAT) {
      clearTimer();
    }
  }, [timer]);

  const clearTimer = () => {
    BackgroundTimer.stopBackgroundTimer();
  };

  const resentOTP = async () => {
    setIsError(false);
    setLoading(true);
    let res;
    if (from === "Register") {
      res = await getOTPForRegisteration(
        phoneNUmber,
        () => {
          setLoading(false);
          refff.current = countDownTimer(
            TIME,
            (time: number, timer: string) => {
              setTimer(() => timer);
            }
          );
        },
        () => {
          setLoading(false);
          setIsError(true);
        }
      );
    } else {
      refff.current = countDownTimer(TIME, (time: number, timer: string) => {
        setTimer(() => timer);
      });
      res = await getOTP(username);
    }

    if (res.succeded) {
      setLoading(false);
      setResendCode(res.code);
      refff.current = countDownTimer(TIME, (time: number, timer: string) => {
        setTimer(() => timer);
      });
    } else {
      setLoading(false);
      setIsError(true);
    }
  };

  return (
    <ContainerView
      hideStatusSpacer
      isBackRequired
      backArrowStyle={styles.backArrow as ViewStyle}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.8 }}
        colors={["#FAFEFE", "#C6F7F4"]}
        style={styles.container as ViewStyle}
      >
        <AppText style={styles.titleName}>
          {from === "Register" ? constants.REGISTER : constants.RESETPASSWORD}
        </AppText>
        <View style={styles.otpInputContainer}>
          <AppText style={styles.enterOtp}>
            {constants.SENTOTP}
            {getMaskedNumber(phoneNUmber)}
          </AppText>
          <OTPInputComponent
            style={styles.otpInput as ViewStyle}
            onCodeFilled={onCodeFilled}
            isError={isError}
            ref={childRef}
          />

          {timer !== ZEROTIMEFORMAT ? (
            <AppText style={styles.enterOtp}>
              Code Expires In
              <AppText style={[styles.timer]}>{` ${timer} `}</AppText>
              seconds
            </AppText>
          ) : (
            <AppButton
              style={{ alignSelf: "flex-end" }}
              onPress={() => {
                childRef.current.method1();
                resentOTP();
              }}
            >
              <AppText style={styles.textStyle as TextStyle}>
                RESEND OTP <RightArrowLineIcon />
              </AppText>
            </AppButton>
          )}
        </View>
        {/* </View> */}
        {loading && <Loader isLabelRequired={false} />}
      </LinearGradient>
    </ContainerView>
  );
};

export default OTPScreen;
