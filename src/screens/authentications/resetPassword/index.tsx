import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Dimensions, Image, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { scale } from "react-native-size-matters";
import { AppText, ContainerView } from "../../../components";
import AvoidKeyboardComponent from "../../../components/baseComponents/avoidKeyboardComponent";
import LoginButton from "../../../components/baseComponents/loginButton";
import TextField from "../../../components/baseComponents/Textfield";
import { screenNames } from "../../../enums";
import { constants } from "../../../enums/constants";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";
import { KeyIcon, physicianImage } from "../../../utils/imagePaths";
import logger from "../../../utils/logger";
import { getOTP } from "../helper";

import styles from "./styles";

type Props = NativeStackScreenProps<RootStackParams, screenNames.RESETPASSWORD>;

const ResetPassword = ({ navigation }: Props) => {
  const [username, setUserName] = useState("");
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    return username.length > 0;
  };
  const onTextChange = (text: string) => {
    setIsError("");
    setUserName(text);
  };

  const navigateTo = async () => {
    setIsError("");
    setLoading(true);
    const res: any = await getOTP(username);
    logger.log(res);
    if (res.succeeded) {
      setLoading(false);
      navigation.replace(screenNames.OTPSCREEN, {
        resetData: {
          ...res,
          username,
          from: "Reset",
        },
      });
    } else {
      setLoading(false);
      setIsError(res.message);
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
            <AppText style={styles.titleName}>
              {constants.RESETPASSWORD}
            </AppText>
            <TextField
              title={constants.USERNAME}
              hintText={constants.USERNAME}
              value={username}
              onChange={onTextChange}
            />

            {isError.length > 0 && (
              <AppText style={styles.ErrorStyle}>{isError}</AppText>
            )}
            <AppText style={styles.textStyle}>{constants.OTPTEXT}</AppText>

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

export default ResetPassword;
