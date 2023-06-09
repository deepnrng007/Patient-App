import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Dimensions, Image, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { scale } from "react-native-size-matters";
import { AppText, ContainerView } from "../../../components";
import AvoidKeyboardComponent from "../../../components/baseComponents/avoidKeyboardComponent";
import CountryCodeSelector from "../../../components/baseComponents/countryCodeSelector";
import LoginButton from "../../../components/baseComponents/loginButton";
import TextField from "../../../components/baseComponents/Textfield";
import { screenNames } from "../../../enums";
import { constants } from "../../../enums/constants";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import { KeyIcon, physicianImage } from "../../../utils/imagePaths";
import logger from "../../../utils/logger";
import { checkMobileNo, getOTP, getOTPForRegisteration } from "../helper";

import styles from "./styles";

type Props = NativeStackScreenProps<RootStackParams, screenNames.RESETPASSWORD>;

const PreRegister = ({ navigation }: Props) => {
  const [username, setUserName] = useState("");
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectCode, setSelectCode] = useState("");
  const [mobile, setMobile] = useState("");
  const onSelectItem = (item: string) => {
    setSelectCode(item);
  };
  const validate = () => {
    return mobile.length >= 12;
  };
  const onTextChange = (text: string) => {
    setIsError("");
    setMobile(text);
  };

  const navigateTo = async () => {
    setIsError("");
    setLoading(true);
    const formattedMobile = selectCode + mobile.split(" ").join("");

    const phhoneValidation = await checkMobileNo(formattedMobile);

    if (!phhoneValidation.isPhoneValid) {
      const res: any = await getOTPForRegisteration(
        formattedMobile,
        async () => {
          setLoading(false);
          navigation.replace(screenNames.OTPSCREEN, {
            resetData: {
              phoneNUmber: formattedMobile,
              username,
              from: "Register",
            },
          });
        },
        () => {
          setLoading(false);
          setIsError("Something went wrong");
        }
      );
    } else {
      setLoading(false);
      setIsError("Mobile Number is already registered.");
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
        <AvoidKeyboardComponent style={{ flex: 1 }} verticalOffset={50}>
          <View style={{ flex: 1 }}>
            <AppText style={styles.titleName}>{constants.REGISTER}</AppText>

            <AppText style={styles.titleStyle}>{constants.MOBILE}</AppText>
            <View style={styles.inputContainer}>
              <CountryCodeSelector
                listStyle={{ width: scale(70) }}
                onSelect={onSelectItem}
                enabled={true}
              />
              <TextField
                title={constants.MOBILE}
                hintText={""}
                onChange={onTextChange}
                value={mobile}
                keyboardType="phone-pad"
                showTooltip={() => {}}
                style={{
                  marginTop: scale(0),
                  flex: 1,
                  paddingLeft: scale(10),
                }}
              />
            </View>
            {isError.length > 0 && (
              <AppText style={styles.ErrorStyle}>{isError}</AppText>
            )}
            <AppText style={styles.textStyle}>{constants.OTPTEXT2}</AppText>

            <LoginButton
              onPress={() => (validate() ? navigateTo() : {})}
              label={constants.SENDOTP}
              enable={validate()}
              loading={loading}
              removeIcon
            />
          </View>
        </AvoidKeyboardComponent>
      </LinearGradient>
    </ContainerView>
  );
};

export default PreRegister;
