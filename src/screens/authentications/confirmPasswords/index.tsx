import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { scale } from "react-native-size-matters";
import { AppText, ContainerView } from "../../../components";
import AvoidKeyboardComponent from "../../../components/baseComponents/avoidKeyboardComponent";
import LoginButton from "../../../components/baseComponents/loginButton";
import TextField from "../../../components/baseComponents/Textfield";
import PasswordValidationChecks from "../../../components/blockComponents/paswordValidationChecks";
import { langVar, screenNames } from "../../../enums";
import { constants } from "../../../enums/constants";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import {
  KeyIcon,
  physicianImage,
  PwdChangedIcon,
} from "../../../utils/imagePaths";
import logger from "../../../utils/logger";
import { alertBox } from "../../../utils/utils";
import {
  hasLowerCase,
  hasNumber,
  hasSpeialCase,
  hasUpperCase,
  lengthCheck,
} from "../../../utils/validations";
import { updateConfirmPwd } from "../helper";
import styles from "./styles";

type Props = NativeStackScreenProps<
  RootStackParams,
  screenNames.CONFIRMPASSWORD
>;

const validationList = [
  { check: false, label: constants.MIN8CHAR },
  { check: false, label: constants.MIN1NUM },
  { check: false, label: constants.UPPERCASE },
  { check: false, label: constants.LOWERCASE },
  { check: false, label: constants.SPECIALCHAR },
];

const ConfirmPasswords = ({ navigation, route }: Props) => {
  const { params: { resetData } = {} } = route;
  logger.log("-------", route);
  const { username, code } = resetData;
  const [newPassword, setNewPassword] = useState("");
  const [seconds, setSeconds] = useState(3);
  let subscribe: any = null;
  const validate = () => {
    return validationList.every((item) => item.check === true);
  };
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const checkValidationList = (text: string) => {
    if (lengthCheck(text, 8)) validationList[0].check = true;
    else validationList[0].check = false;
    if (hasNumber(text)) validationList[1].check = true;
    else validationList[1].check = false;
    if (hasUpperCase(text)) validationList[2].check = true;
    else validationList[2].check = false;
    if (hasLowerCase(text)) validationList[3].check = true;
    else validationList[3].check = false;
    if (hasSpeialCase(text)) validationList[4].check = true;
    else validationList[4].check = false;
  };

  useEffect(() => {
    //onClickConfirmPassword();
    return () => {
      logger.log("ttttttttttt :", subscribe);
      if (subscribe) clearInterval(subscribe);
    };
  }, []);

  function updateTimer() {
    setSeconds((seconds) => {
      logger.log("update time :", seconds);
      if (seconds === 0) {
        clearInterval(subscribe);
        navigation.replace(screenNames.LOGIN);
      }
      return seconds - 1;
    });
  }

  const onClickConfirmPassword = async () => {
    setIsError(false);
    setLoading(true);
    const params = {
      username,
      password: newPassword,
      confirmPassword: newPassword,
      code,
    };
    logger.log(params);
    const res = await updateConfirmPwd(params);
    logger.log(res);
    if (res.isValid) {
      setLoading(false);
      setIsSuccess(true);
      subscribe = setInterval(() => {
        updateTimer();
      }, 1000);
    } else {
      setLoading(false);
      setIsError(true);
      if (res.errorMessage.includes("reset token"))
        alertBox(constants.OTPSESSIONEXPIRED, () =>
          navigation.navigate(screenNames.LOGIN)
        );
      else alertBox(res.errorMessage);
    }
  };

  const onTextChange = (text: string) => {
    setNewPassword(text);
    checkValidationList(text);
  };
  // logger.log("newPassword :", validationList);

  return (
    <ContainerView
      style={{ flex: 1 }}
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
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <View>
            <AppText style={styles.titleName}>
              {constants.RESETPASSWORD}
            </AppText>
            <TextField
              isPassword
              onChange={onTextChange}
              title={constants.PASSWORD}
              hintText={constants.NEWPASSWORD}
              value={newPassword}
              Icon={KeyIcon}
            />
            {isSuccess ? (
              <>
                <View style={[styles.validation]}>
                  <>
                    <PwdChangedIcon />
                    <AppText style={styles.successLabel}>
                      {constants.PWDCHANGED}
                    </AppText>
                  </>
                </View>
                <AppText style={styles.direction}>
                  {constants.REDIRECTING}:{" "}
                  <AppText style={styles.seconds}>{seconds}</AppText>{" "}
                  {constants.SECONDS}
                </AppText>
              </>
            ) : (
              <View style={[styles.validation, { alignSelf: "flex-start" }]}>
                <PasswordValidationChecks list={validationList} />
              </View>
            )}
          </View>

          {!isSuccess && (
            <LoginButton
              style={{
                width: "100%",
              }}
              loading={loading}
              onPress={() => (validate() ? onClickConfirmPassword() : {})}
              label={"CONFIRM"}
              enable={validate()}
            />
          )}
        </View>
      </LinearGradient>
    </ContainerView>

    // <ContainerView
    //   hideStatusSpacer
    //   isBackRequired
    //   backArrowStyle={styles.backArrow as ViewStyle}
    // >
    //   <LinearGradient
    //     start={{ x: 0, y: 0 }}
    //     end={{ x: 1, y: 0.8 }}
    //     colors={["#FAFEFE", "#C6F7F4"]}
    //     style={styles.container as ViewStyle}
    //   >
    //     <AvoidKeyboardComponent
    //       style={{ flex: 1, paddingHorizontal: scale(20) }}
    //       verticalOffset={-15}
    //     >
    //       <View style={{ flex: 1 }}>
    //         <AppText style={styles.titleName}>
    //           {constants.RESETPASSWORD}
    //         </AppText>
    //         <TextField
    //           isPassword
    //           onChange={onTextChange}
    //           title={constants.PASSWORD}
    //           hintText={constants.NEWPASSWORD}
    //           value={newPassword}
    //           Icon={KeyIcon}
    //         />
    //         {isError && (
    //           <AppText style={styles.ErrorStyle}>
    //             {"Oops! Something went wrong."}
    //           </AppText>
    //         )}

    //         {isSuccess ? (
    //           <>
    //             <View style={[styles.validation]}>
    //               <>
    //                 <PwdChangedIcon />
    //                 <AppText style={styles.successLabel}>
    //                   {constants.PWDCHANGED}
    //                 </AppText>
    //               </>
    //             </View>
    //             <AppText style={styles.direction}>
    //               {constants.REDIRECTING}:{" "}
    //               <AppText style={styles.seconds}>{seconds}</AppText>{" "}
    //               {constants.SECONDS}
    //             </AppText>
    //           </>
    //         ) : (
    //           <View style={[styles.validation, { alignSelf: "flex-start" }]}>
    //             <PasswordValidationChecks list={validationList} />
    //           </View>
    //         )}
    //         <LoginButton
    //           style={{
    //             position: "absolute",
    //             bottom: 0,
    //             width: "100%",
    //             marginBottom: scale(40),
    //           }}
    //           onPress={() => (validate() ? onClickConfirmPassword() : {})}
    //           label={constants.CONFIRM}
    //           enable={validate()}
    //           loading={loading}
    //         />
    //       </View>
    //     </AvoidKeyboardComponent>
    //   </LinearGradient>
    // </ContainerView>
  );
};

export default ConfirmPasswords;
