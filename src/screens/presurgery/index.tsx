import React from "react";
import { View, ViewStyle } from "react-native";
import { AppText, ContainerView } from "../../components";
import ListItems from "../../components/blockComponents/carePlanDetails";

import { getPreSurgeryList } from "./helper";
import styles from "./styles";

// type Props = NativeStackScreenProps<RootStackParams, screenNames.PRESURGERY>;

const PreSurgery = () => {
  return (
    <ContainerView
      isBackRequired
      hideStatusSpacer
      style={styles.topContainer as ViewStyle}
    >
      <AppText style={styles.pageTitle}>Pre Surgery</AppText>
      <AppText style={styles.pageSubTitle}>
        Get ready for your Pre-Surgery follow up on
      </AppText>
      <ListItems list={getPreSurgeryList()} />

      <View style={styles.container}>
        <AppText style={styles.cardTitle}>Note</AppText>
        <AppText style={styles.title}>
          Be ready to answer a few questions about your recovery either via your
          mobile application or a phone call from a nurse navigator
        </AppText>
      </View>
    </ContainerView>
  );
};

export default PreSurgery;
