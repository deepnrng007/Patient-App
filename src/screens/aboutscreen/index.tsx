import React from "react";
import { ViewStyle } from "react-native";
import { scale } from "react-native-size-matters";
import { AppText, ContainerView, useAppSelector } from "../../components";
import Underline from "../../components/baseComponents/underline";
import DrawerElement from "../../components/blockComponents/drawerElement";
import NavigationHeader from "../../components/blockComponents/navigationHeader";
import { langVar, screenNames } from "../../enums";
import { constants } from "../../enums/constants";
import { TermsAndConditionIcon } from "../../utils/imagePaths";
import styles from "./styles";
import { getVersion } from "react-native-device-info";

const AboutApp = ({ navigation }: any) => {
  const { loginDetails } = useAppSelector((state) => state.login);
  const { termsAndConditions } = loginDetails;
  return (
    <ContainerView
      headerName={"About"}
      style={styles.aboutStyle as ViewStyle}
      isBackRequired
      hideStatusSpacer
    >
      <AppText style={styles.title}>{"ENavPatient"}</AppText>
      <AppText style={styles.version}>v {getVersion()}</AppText>
      <AppText style={styles.desc}>{constants.DESCRIPTION}</AppText>
      <Underline style={styles.underline} />
      <DrawerElement
        label={"TERMS & CONDITIONS"}
        onNavigate={() => {
          navigation.navigate(screenNames.PDFVIEWERSCREEN, {
            showButtons: false,
            url: termsAndConditions,
            isBackRequired: true,
          });
        }}
        showDivider={false}
        DrawerIcon={TermsAndConditionIcon}
      />
      <Underline style={styles.underline} />
    </ContainerView>
  );
};

export default AboutApp;
