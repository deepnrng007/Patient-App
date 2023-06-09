import React, { useEffect } from "react";
import { View, ViewStyle } from "react-native";
import {
  AppButton,
  AppText,
  ContainerView,
  Loader,
  useAppSelector,
} from "../../components";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../screenNavigators/rootNavigator";
import { screenNames } from "../../enums";
import { constants } from "../../enums/constants";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../../redux/apis/fetchProfile";
import {
  checkForNull,
  getAvatarInitials,
  getDateFormatForDay,
} from "../../utils/utils";
import { getProfileList } from "./helper";
import ListItems from "../../components/blockComponents/carePlanDetails";

type Props = NativeStackScreenProps<RootStackParams, screenNames.PROFILE>;

const Profile = ({ route, navigation }: Props) => {
  const dispatch = useDispatch();

  const { profile, patientProfile } = useAppSelector((state) => {
    return {
      profile: state.profile,
      patientProfile: state.patientProfile,
    };
  });
  const { profileData, profileLoading } = profile;
  const { patientprofileData = {} } = patientProfile;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(
        fetchProfile({ type: "fetch", userID: patientprofileData.PatientId })
      );
    });

    return unsubscribe;
  }, []);

  const getPhoneNumber = () => {
    if (profileData.PreferredPhone === "Home" && profileData.PhoneHome) {
      return profileData.PhoneHome;
    } else {
      return profileData.PhoneCell;
    }
  };

  const { FirstName = "", LastName = "" } = profileData;
  return profileLoading ? (
    <ContainerView hideStatusSpacer isBackRequired>
      <Loader />
    </ContainerView>
  ) : (
    <ContainerView
      hideStatusSpacer
      isBackRequired
      style={styles.container as ViewStyle}
    >
      <AppText style={styles.pageTitle}>{constants.MYPROFILESMALL}</AppText>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainerFilled}>
          <AppText style={styles.icon}>
            {getAvatarInitials(`${FirstName} ${LastName}`)}
          </AppText>
        </View>
        <View style={styles.headerContainer}>
          <AppText style={styles.title}>{constants.NAME}</AppText>
          <AppText style={styles.subtitle}>{`${checkForNull(
            FirstName
          )} ${checkForNull(LastName)}`}</AppText>
        </View>
      </View>
      <ListItems list={getProfileList(profileData)} />

      <AppButton
        style={styles.editContainer as ViewStyle}
        onPress={() => {
          navigation.navigate(screenNames.EDITPROFILE, {
            firstName: profileData.FirstName,
            lastName: profileData.LastName,
            phone: getPhoneNumber(),
            date: getDateFormatForDay(profileData.DOB),
          });
        }}
      >
        <View style={styles.itemContainer}>
          <AntDesign name={"edit"} style={styles.editicon}></AntDesign>
          <AppText style={styles.subtitle}>{constants.EDIT}</AppText>
        </View>
      </AppButton>
    </ContainerView>
  );
};

export default Profile;
