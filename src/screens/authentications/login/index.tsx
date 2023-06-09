import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { View, ViewStyle, Image, Dimensions } from "react-native";
import Config from "react-native-config";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import {
  AppButton,
  AppText,
  useAppDispatch,
  useAppSelector,
} from "../../../components";
import AvoidKeyboardComponent from "../../../components/baseComponents/avoidKeyboardComponent";
import ErrorModal from "../../../components/baseComponents/errorModal";

import LoginButton from "../../../components/baseComponents/loginButton";
import SnackBarComponent from "../../../components/baseComponents/snackBarComponent";
import TextField from "../../../components/baseComponents/Textfield";
import { screenNames } from "../../../enums";
import {
  AuthenticationTypes,
  constants,
  encriptedStorageKeys,
} from "../../../enums/constants";
import { global } from "../../../global";
import { loginAsyncFetch } from "../../../redux/apis/fetchLogin";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import {
  getEncryptedStorage,
  setEncryptedStorage,
} from "../../../utils/encryptedStorage";

import { ErrorInfo, physicianImage } from "../../../utils/imagePaths";
import logger from "../../../utils/logger";
import { isFieldEmpty } from "../../../utils/validations";
import styles from "./styles";
import ReactNativeBiometrics from "react-native-biometrics";
import { useFocusEffect } from "@react-navigation/native";
import ModalLoader from "../../../components/baseComponents/modalLoader";
import { setFCMToken } from "../../../utils/utils";

type Props = NativeStackScreenProps<RootStackParams, screenNames.LOGIN>;
const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

const Login = (props: Props) => {
  const { navigation } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const { loginDetails, loginLoading, loginError } = useAppSelector(
    (state) => state.login
  );

  const [isBioMetricEnabled, setisBioMetricEnabled] = useState(false);
  const [biometricType, setBiometricType] = useState("");
  const [userNameAndPassword, setuserNameAndPassword] = useState<any>(null);
  const [isBiometricAuth, setisBiometricAuth] = useState(false);

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then((resultObject) => {
      const { biometryType } = resultObject;
      if (biometryType) setBiometricType(biometryType);
    });
  }, []);
  useFocusEffect(
    useCallback(() => {
      getLoginDetails();
      checkToggleValue();
    }, [])
  );

  const checkToggleValue = async () => {
    const res = await getEncryptedStorage(encriptedStorageKeys.ENABLETOUCHID);
    if (res) setisBioMetricEnabled(true);
    else setisBioMetricEnabled(false);
  };

  const promptAuth = () => {
    rnBiometrics
      .simplePrompt({ promptMessage: "Confirm Authentication for Login" })
      .then((resultObject) => {
        const { success } = resultObject;
        if (success) {
          setLoading(true);
          setisBiometricAuth(true);
          onPressLogin(userNameAndPassword);
        } else {
          setisBiometricAuth(false);
        }
      })
      .catch((error) => {
        setisBiometricAuth(false);
        logger.log("simplePrompt error :", error);
      });
  };

  const getLoginDetails = async () => {
    const data = await getEncryptedStorage(encriptedStorageKeys.USERNAMEANDPWD);
    if (data) {
      global.ISFIRSTTIMELOGGED = false;
      setuserNameAndPassword(JSON.parse(data));
    } else global.ISFIRSTTIMELOGGED = true;
  };
  useEffect(() => {
    if (loginError != null) {
      setLoading(false);
      setIsError(true);
    } else {
      setLoading(false);
      setIsError(false);
    }
  }, [loginError]);

  useEffect(() => {
    if (loginDetails.accessToken) {
      navigateTo(
        loginDetails.termsAndConditions,
        loginDetails.isAcceptedTermsAndConditions
      );
    } else {
      setLoading(false);
      // setIsError(true);
    }
  }, [loginDetails]);

  const navigateTo = async (
    termsAndConditions: string,
    isAcceptedTermsAndConditions: boolean
  ) => {
    Config.LOGIN_ACCESS_TOKEN = loginDetails.accessToken as any;
    global.OWNER_EMAILID = loginDetails.ownereMail;
    global.OWNER_USERID = loginDetails.userOwnerId;
    global.LOGIN_ACCESS_TOKEN = loginDetails.accessToken;
    global.ISPENDINGAPPROVAL = loginDetails.isPendingApproval;
    setFCMToken();
    await setEncryptedStorage(encriptedStorageKeys.LOGINDETAILS, loginDetails);
    setLoading(false);
    if (checkValidation())
      await setEncryptedStorage(encriptedStorageKeys.USERNAMEANDPWD, {
        userName,
        password,
      });
    if (
      isAcceptedTermsAndConditions !== undefined &&
      !isAcceptedTermsAndConditions
    )
      navigation.replace(screenNames.PDFVIEWERSCREEN, {
        url: termsAndConditions,
        isBackRequired: false,
      });
    else navigation.replace(screenNames.DRAWERNAVIGATION);
  };

  const checkValidation = () => {
    return !isFieldEmpty(userName) && !isFieldEmpty(password);
  };

  const onPressLogin = async (userAndPassword?: any) => {
    if (checkValidation() || userAndPassword) {
      setLoading(true);
      dispatch(
        loginAsyncFetch({
          userName: userName,
          password: password,
          ...userAndPassword,
        })
      );
    }
  };

  const resetPassword = () => {
    navigation.navigate(screenNames.RESETPASSWORD);
  };
  const navigateToRegister = () => {
    navigation.navigate(screenNames.PREREGISTER);
  };

  const getTypeOfAuth = () => {
    if (biometricType === AuthenticationTypes.TOUCHID) return constants.TOUCHID;
    else if (biometricType === AuthenticationTypes.FACEID)
      return constants.FACEID;
    else return constants.TOUCHID;
  };

  const showTouchID = () => {
    if (biometricType) promptAuth();
  };
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      colors={["#FAFEFE", "#C6F7F4"]}
      style={styles.container as ViewStyle}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isBiometricAuth && <ModalLoader isVisible={loading} />}
          <AppText style={styles.registerTitle}>{constants.LOGIN}</AppText>
          <AppButton onPress={navigateToRegister}>
            <AppText style={styles.LoginTitle}>{constants.REGISTER}</AppText>
          </AppButton>
        </View>
        <AvoidKeyboardComponent style={{ flex: 1, marginTop: scale(50) }}>
          <View style={styles.inputContainer}>
            <TextField
              title={constants.USERNAME}
              hintText={constants.USERNAME}
              onChange={setUserName}
              value={userName}
              keyboardType='default'
              showTooltip={() => {}}
            />
            <TextField
              title={constants.PASSWORD}
              hintText={constants.PASSWORD}
              onChange={setPassword}
              value={password}
              keyboardType='default'
              isPassword
            />

            <AppButton
              onPress={resetPassword}
              style={{ alignSelf: "flex-end" }}
            >
              <AppText style={styles.forgotPassword}>Forgot password</AppText>
            </AppButton>

            <LoginButton
              onPress={onPressLogin}
              enable={checkValidation()}
              loading={isBiometricAuth ? false : loading}
              label={constants.CONFIRM}
            />
          </View>
        </AvoidKeyboardComponent>
        {biometricType.length > 0 && isBioMetricEnabled && (
          <AppText style={styles.loginWithTouch} onPress={showTouchID}>
            {constants.LOGINWITH} {getTypeOfAuth()}
          </AppText>
        )}
        {error ? (
          <SnackBarComponent
            onClose={() => {
              setIsError(false);
            }}
            message={constants.INVALIDLOGIN}
          ></SnackBarComponent>
        ) : null}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Login;
