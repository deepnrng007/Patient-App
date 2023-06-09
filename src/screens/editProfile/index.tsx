/* eslint-disable no-unsafe-optional-chaining */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";
import { scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { AppText, ContainerView, useAppSelector } from "../../components";
import CountryCodeSelector from "../../components/baseComponents/countryCodeSelector";
import LoginButton from "../../components/baseComponents/loginButton";
import TextField from "../../components/baseComponents/Textfield";
import { screenNames } from "../../enums";
import { constants } from "../../enums/constants";
import { fetchProfile } from "../../redux/apis/fetchProfile";
import { RootStackParams } from "../../screenNavigators/rootNavigator";
import logger from "../../utils/logger";
import styles from "./styles";

type Props = NativeStackScreenProps<RootStackParams, screenNames.EDITPROFILE>;

const EditProfile = ({ route, navigation }: Props) => {
  const { firstName, lastName, phone, date } = route?.params;
  const dispatch = useDispatch();
  const {
    profileUpdated = false,
    profileUpdating,
    profileData,
  } = useAppSelector((state) => state.profile);

  const code =
    phone.length === 15 ? phone.substring(0, 2) : phone.substring(0, 3);
  const number =
    phone.length === 15 ? phone.substring(2, 15) : phone.substring(4, 17);

  logger.log(code);
  logger.log(number);

  const [fName, setFirstName] = useState(firstName != null ? firstName : "");
  const [lName, setLastName] = useState(lastName != null ? lastName : "");
  const [mobile, setMobile] = useState(number);
  const [selectCode, setSelectCode] = useState("");
  const onSelectItem = (item: string) => {
    setSelectCode(item);
  };
  logger.log(getMonthFromString(date));

  function getMonthFromString(mon: string) {
    const month = new Date(Date.parse(mon)).getMonth() + 1;
    const date = new Date(Date.parse(mon)).getDate();
    const year = new Date(Date.parse(mon)).getFullYear();

    if (date < 10 && month < 10) {
      return `0${month}/0${date}/${year}`;
    } else if (month < 10) {
      return `0${month}/${date}/${year}`;
    } else if (date < 10) {
      return `${month}/0${date}/${year}`;
    } else {
      return `${month}/${date}/${year}`;
    }
  }

  const [dob, setDOB] = useState(getMonthFromString(date));

  const getPhoneNumber = () => {
    if (profileData.PreferredPhone === "Home") {
      return { PhoneHome: `${selectCode} ${mobile}` };
    } else if (profileData.PreferredPhone === "PhoneWork") {
      return { PhoneWork: `${selectCode} ${mobile}` };
    } else {
      return { PhoneCell: `${selectCode} ${mobile}` };
    }
  };

  return (
    <ContainerView
      hideStatusSpacer
      isBackRequired
      style={styles.container as ViewStyle}
      isScrollEnable
    >
      <KeyboardAvoidingView
        style={{
          flexGrow: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppText style={styles.pageTitle}>{constants.MYPROFILESMALL}</AppText>
          <TextField
            title={constants.FIRSTNAME}
            hintText={constants.FIRSTNAME}
            onChange={setFirstName}
            value={fName}
            keyboardType="default"
            showTooltip={() => {}}
            editable={false}
          />
          <TextField
            title={constants.LASTNAME}
            hintText={constants.LASTNAME}
            onChange={setLastName}
            value={lName}
            keyboardType="default"
            showTooltip={() => {}}
            editable={false}
          />

          <AppText style={styles.titleStyle}>{constants.MOBILE}</AppText>
          <View style={styles.inputContainer}>
            <CountryCodeSelector
              listStyle={{ width: scale(70) }}
              onSelect={onSelectItem}
              value={code}
              enabled={true}
            />
            <TextField
              title={constants.MOBILE}
              hintText={"000 000 0000"}
              onChange={setMobile}
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

          <TextField
            title={constants.DOB}
            hintText={"MM/DD/YYYY"}
            onChange={setDOB}
            value={dob}
            keyboardType="number-pad"
            showTooltip={() => {}}
            editable={false}
          />
          <LoginButton
            onPress={async () => {
              const updatedObject = getPhoneNumber();
              logger.log(",,,", updatedObject);
              dispatch(fetchProfile(updatedObject));
              setTimeout(() => {
                navigation.navigate(screenNames.PROFILE);
              }, 1000);
            }}
            enable={true}
            label={constants.DONE}
            loading={profileUpdating}
          ></LoginButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </ContainerView>
  );
};

export default EditProfile;
