import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { screenNames, themes } from "../../../enums";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import {
  ScrollView,
  Text,
  View,
  Image,
  Platform,
  ViewStyle,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

import styles from "./styles";
import { BlurView } from "@react-native-community/blur";
import TextField from "../../../components/baseComponents/Textfield";
import {
  isValidEmail,
  hasLowerCase,
  hasNumber,
  hasSpeialCase,
  isFieldEmpty,
  isValidDate,
  lengthCheck,
  hasUpperCase,
} from "../../../utils/validations";
import PasswordValidationChecks from "../../../components/blockComponents/paswordValidationChecks";
import {
  AppButton,
  ContainerView,
  useAppDispatch,
  useAppSelector,
} from "../../../components";
import LoginButton from "../../../components/baseComponents/loginButton";
import { constants } from "../../../enums/constants";
import logger from "../../../utils/logger";
import LinearGradient from "react-native-linear-gradient";
import ErrorModal from "../../../components/baseComponents/errorModal";
import { useFocusEffect } from "@react-navigation/native";
import { clearRegisterDetails } from "../../../redux/slicers/registeteSlice";
import { getOTPForRegisteration } from "../helper";

import { scale } from "react-native-size-matters";
import CountryCodeSelector from "../../../components/baseComponents/countryCodeSelector";
import { MontserratMedium } from "../../../utils/font";
import TextInputComponent from "../../../components/baseComponents/textInputComponent";
import { registerApi } from "../../../redux/apis/registerApi";
import { ErrorInfo, PwdChangedIcon } from "../../../utils/imagePaths";
import AvoidKeyboardComponent from "../../../components/baseComponents/avoidKeyboardComponent";
import moment from "moment";

type Props = NativeStackScreenProps<RootStackParams, screenNames.REGISTER>;

const validationList = [
  { check: false, label: "8 or more characters" },
  { check: false, label: "1 Letter" },
  { check: false, label: "1 UpperCase Letter" },
  { check: false, label: "1 Number" },
  { check: false, label: "1 special character i.e. $,%,@" },
];

const RegisterScreen = ({ navigation, route }: Props) => {
  const { params } = route;
  const { mobileNo } = params;

  const code =
    mobileNo.length === 12
      ? mobileNo.substring(0, 2)
      : mobileNo.substring(0, 3);
  const number =
    mobileNo.length === 12
      ? mobileNo.substring(2, 12)
      : mobileNo.substring(3, 13);

  logger.log(code);
  logger.log(number);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showTooltip, setTooltipVisibility] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState(number);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDOB] = useState("");
  const dispatch = useAppDispatch();
  const [selectCode, setSelectCode] = useState(code);
  const [showSuceesDialog, setShowDialog] = useState(false);
  const { registerDetails, registerError, registerLoading } = useAppSelector(
    (state) => state.register
  );

  const onSelectItem = (item: string) => {
    setSelectCode(item);
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(clearRegisterDetails());
    }, [])
  );

  useEffect(() => {
    if (registerError.userNameExists === true) {
      setErrorMessage("Username already exists.");
    } else if (registerError.phoneNumberAlreadyExists === true) {
      setErrorMessage("Mobile Number is already registered.");
    } else if (registerError.userAlreadyRegistered === true) {
      setErrorMessage("User is already registered.");
    } else if (registerError.phoneNumberDoesNotMatch === true) {
      setErrorMessage(
        "The combination of username and mobile number does not match."
      );
    } else if (registerError.succeeded === false) {
      setErrorMessage("Something went wrong while registering User.");
    } else {
      setErrorMessage("");
    }
  }, [registerError]);

  useEffect(() => {
    if (registerDetails.succeeded === true) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  }, [registerDetails]);

  const navigateToHome = () => {
    navigation.navigate(screenNames.LOGIN);
  };

  const onTextChange = (text: string) => {
    setPassword(text);
    checkValidationList(text);
  };

  const validate = () => {
    return validationList.every((item) => item.check === true);
  };

  const checkValidationList = (text: string) => {
    if (lengthCheck(text, 8)) validationList[0].check = true;
    else validationList[0].check = false;
    if (hasLowerCase(text)) validationList[1].check = true;
    else validationList[1].check = false;
    if (hasUpperCase(text)) validationList[2].check = true;
    else validationList[2].check = false;
    if (hasNumber(text)) validationList[3].check = true;
    else validationList[3].check = false;
    if (hasSpeialCase(text)) validationList[4].check = true;
    else validationList[4].check = false;
  };

  const submitClicked = () => {
    setTooltipVisibility(false);
    const formattedMobile = selectCode + mobile.split(" ").join("");
    const formattedDate = moment.utc(dob).add(12, "hours");
    console.log(formattedDate);
    const params = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dateOfBirth: formattedDate,
      phoneNumber: formattedMobile,
      userName: email,
      password: password,
      accountType: 1,
      clientCode: "",
      registrationCode: "",
    };
    logger.log("params", params);
    dispatch(registerApi(params));
    setShowError(false);
  };

  logger.log("registerDetails", registerDetails);
  logger.log("registerError", registerError);

  const navigateToLogin = () => {
    navigation.replace(screenNames.LOGIN);
  };

  const checkValidation = () => {
    return (
      !isFieldEmpty(firstName) &&
      !isFieldEmpty(lastName) &&
      isValidEmail(email) &&
      isValidDate(dob) &&
      lengthCheck(dob, 10) &&
      validate()
    );
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      colors={["#FAFEFE", "#C6F7F4"]}
      style={styles.container as ViewStyle}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.registerTitle}>{constants.REGISTER}</Text>
        <AppButton onPress={navigateToLogin}>
          <Text style={styles.LoginTitle}>{constants.LOGIN}</Text>
        </AppButton>
      </View>
      <AvoidKeyboardComponent
        style={{
          flex: 1,
          flexDirection: "column",
        }}
        verticalOffset={100}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextField
            title={constants.FIRSTNAME}
            hintText={constants.FIRSTNAME}
            onChange={setFirstName}
            value={firstName}
            keyboardType="default"
            showTooltip={() => setTooltipVisibility(false)}
          />
          <TextField
            title={constants.LASTNAME}
            hintText={constants.LASTNAME}
            onChange={setLastName}
            value={lastName}
            keyboardType="default"
            showTooltip={() => setTooltipVisibility(false)}
          />
          <TextField
            title={constants.EMAIL}
            hintText={constants.EMAILHINT}
            onChange={setEmail}
            value={email}
            keyboardType="email-address"
            showTooltip={() => setTooltipVisibility(false)}
          />

          <Text style={styles.titleStyle}>{constants.MOBILE}</Text>
          <View style={styles.inputContainer}>
            <CountryCodeSelector
              listStyle={{ width: scale(70) }}
              onSelect={onSelectItem}
              value={code}
              enabled={false}
            />
            <TextField
              title={constants.MOBILE}
              hintText={"000 000 0000"}
              onChange={setMobile}
              value={mobile}
              keyboardType="phone-pad"
              showTooltip={() => setTooltipVisibility(false)}
              style={{
                marginTop: scale(0),
                flex: 1,
                paddingLeft: scale(10),
              }}
              editable={false}
            />
          </View>

          <TextField
            title={constants.DOB}
            hintText={"MM/DD/YYYY"}
            onChange={setDOB}
            value={dob}
            keyboardType="number-pad"
            showTooltip={() => setTooltipVisibility(false)}
          />

          <TextField
            title={constants.PASSWORD}
            hintText={constants.PASSWORDHINT}
            onChange={onTextChange}
            value={password}
            isPassword={true}
            showTooltip={() => setTooltipVisibility(true)}
          />
          {showTooltip ? (
            <View style={[styles.validation, { alignSelf: "flex-start" }]}>
              <PasswordValidationChecks list={validationList} />
            </View>
          ) : (
            <></>
          )}
        </ScrollView>
      </AvoidKeyboardComponent>
      <View style={{ paddingBottom: 20 }}>
        <LoginButton
          onPress={() => submitClicked()}
          enable={checkValidation()}
          label="Confirm"
          loading={registerLoading}
        ></LoginButton>
      </View>
      {/* <AppButton
        // eslint-disable-next-line react/no-children-prop
        children={
          <Text style={styles.alreadyRegistered}>
            Already registered? Login here
          </Text>
        }
        onPress={() => navigateToLogin()}
      /> */}

      <ErrorModal
        isVisible={showSuceesDialog}
        onPress={() => {
          setShowDialog(false);
          setTimeout(() => {
            navigateToLogin();
          }, 1000);
        }}
        message={"User registered Successfully"}
        Icon={PwdChangedIcon}
      />
      <ErrorModal
        isVisible={errorMessage !== ""}
        onPress={() => {
          setErrorMessage("");
        }}
        message={errorMessage}
        Icon={ErrorInfo}
      />
    </LinearGradient>
  );
};

export default RegisterScreen;
