import React, { useEffect } from "react";
import { View, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import {
  AppText,
  ContainerView,
  Loader,
  useAppSelector,
} from "../../../components";
import ListItems from "../../../components/blockComponents/carePlanDetails";
import { constants } from "../../../enums/constants";
import { fetchCarePlan } from "../../../redux/apis/fetchCarePlan";
import { fetchDischargeDetails } from "../../../redux/apis/fetchDischargeDetails";
import { fetchEpisode } from "../../../redux/apis/fetchEpisode";
import logger from "../../../utils/logger";
import { getEpisodeList } from "./helper";
import styles from "./styles";

// type Props = NativeStackScreenProps<
//   RootStackParams,
//   screenNames.EPISODEDETAILS
// >;

const EpisodeDetails = () => {
  const dispatch = useDispatch();

  const { episode, dischargeDetails, patientProfile, config } = useAppSelector(
    (state) => {
      return {
        episode: state.episdoe,
        dischargeDetails: state.discharge,
        patientProfile: state.patientProfile,
        config: state.config,
      };
    }
  );

  const { patientprofileData = {} } = patientProfile;
  const { episodeData = {}, episodeLoading } = episode;
  const {
    dischargeData = {},
    dischargeLoading,
    dischargeError,
  } = dischargeDetails;
  useEffect(() => {
    dispatch(fetchEpisode({ intakeID: patientprofileData.CurrentIntakeId }));
    dispatch(
      fetchDischargeDetails({ patientID: patientprofileData.PatientId })
    );
  }, []);

  logger.log(patientprofileData);
  return episodeLoading ? (
    <ContainerView hideStatusSpacer isBackRequired>
      <Loader />
    </ContainerView>
  ) : (
    <ContainerView
      hideStatusSpacer
      isBackRequired
      style={styles.topContainer as ViewStyle}
    >
      <AppText style={styles.pageTitle}>
        {constants.EPISODEINFORMATIONSMALL}
      </AppText>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListItems list={getEpisodeList(episodeData)} />

        <View style={styles.container}>
          <AppText style={styles.cardTitle}>{constants.POSTSURGERY}</AppText>
          <AppText style={styles.title}>Discharge Location</AppText>
          <AppText style={styles.subtitle}>
            {dischargeData.DischargeToProviderName}
          </AppText>
        </View>
      </ScrollView>
    </ContainerView>
  );
};

export default EpisodeDetails;
