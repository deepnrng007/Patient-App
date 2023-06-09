import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  NativeEventEmitter,
  NativeModules,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import {
  AppText,
  ContainerView,
  Loader,
  useAppSelector,
} from "../../components";
import DotWithLine from "../../components/baseComponents/dotWithLine";
import NotFoundOrError from "../../components/baseComponents/notFoundOrError";
import CardWithIcon from "../../components/blockComponents/cardWithIcon";
import ListItems from "../../components/blockComponents/carePlanDetails";
import { screenNames } from "../../enums";
import { constants } from "../../enums/constants";
import { fetchCarePlan } from "../../redux/apis/fetchCarePlan";
import { fetchDashboard } from "../../redux/apis/fetchDashBoard";
import { RootStackParams } from "../../screenNavigators/rootNavigator";
import { LocationIcon } from "../../utils/imagePaths";
import logger from "../../utils/logger";
import { getDateFormatForDay, isAndroid } from "../../utils/utils";

import styles from "./styles";

type TOCProps = NativeStackScreenProps<
  RootStackParams,
  screenNames.TOCINFORMATION
>;

const TOCInformation = ({ route, navigation }: TOCProps) => {
  const {
    cameFrom = undefined,
    intakeID,
    patientID,
    // eslint-disable-next-line no-unsafe-optional-chaining
  } = route?.params;

  logger.log("$$$$$$$$", cameFrom);
  const dispatch = useDispatch();

  const { dashboard, config, patientProfile, carePlan } = useAppSelector(
    (state) => {
      return {
        dashboard: state.dashBoard,
        config: state.config,
        patientProfile: state.patientProfile,
        carePlan: state.carePlan,
      };
    }
  );
  const { carePlanData = {}, carePlanLoading } = carePlan;
  const { data, error, loading } = dashboard;
  const { CarePlanSummaryItems = [{}] } = data;
  const { patientprofileData = {} } = patientProfile;
  const { configData = {} } = config;
  const { LocationTypes = [] } = configData;
  const [load, setLoading] = useState(loading);

  useEffect(() => {
    reload();
  }, []);
  const { TransitionOfCareItems = [{}], Facility = [] } = carePlanData;

  useFocusEffect(
    useCallback(() => {
      let eventListener: any = null;
      if (isAndroid()) {
        const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
        eventListener = eventEmitter.addListener("carePlanEvent", () => {
          logger.log("came in android");
          reload();
        });
      } else {
        const nativeEventSupport = new NativeEventEmitter(
          NativeModules.NativeEventManager
        );
        nativeEventSupport.addListener("carePlanEvent", () => {
          logger.log("came in ios");
          reload();
        });
      }
      return () => {
        setLoading(true);
        if (eventListener) eventListener.remove();
      };
    }, [])
  );

  const reload = () => {
    if (cameFrom === constants.NOTIFICATION) {
      dispatch(fetchCarePlan({ intakeID: intakeID }));
      dispatch(fetchDashboard({ userID: patientID }));
    } else {
      NativeModules.JSToNativeEventModule.removeNotification(
        `${patientprofileData.CurrentIntakeId}`
      );
      dispatch(fetchCarePlan({ intakeID: patientprofileData.CurrentIntakeId }));
      dispatch(fetchDashboard({ userID: patientprofileData.PatientId }));
    }
  };

  const checkForDaysOrVisits = (index, text) => {
    if (
      LocationTypes &&
      LocationTypes.length > 0 &&
      LocationTypes[index].IsLOSBasedLocation
    ) {
      const day = text == "1" ? "Day" : "Days";
      return `Length of Stay: ${text} ${day} `;
    } else {
      return `Visits: ${text} `;
    }
  };

  return load ? (
    <ContainerView hideStatusSpacer isBackRequired>
      <Loader />
    </ContainerView>
  ) : (
    <ContainerView
      hideStatusSpacer
      isBackRequired
      style={styles.topcontainer as ViewStyle}
      customGoBack={cameFrom}
    >
      <AppText style={styles.pageTitle}>{constants.CAREPLANSMALL}</AppText>
      <ScrollView showsVerticalScrollIndicator={false}>
        {carePlanData !== undefined && !carePlanData.ReviewedWithProvider ? (
          <NotFoundOrError
            type='noDashboardData'
            enableIcon
            style={{
              marginVertical: scale(120),
            }}
          />
        ) : (
          <View>
            {CarePlanSummaryItems[0] !== undefined &&
              Object.keys(CarePlanSummaryItems[0]).length > 0 && (
                <View>
                  <CardWithIcon
                    title={"Surgery Location"}
                    subtitle={Facility?.ProviderName}
                    Icon={LocationIcon}
                  />
                  <View style={styles.container}>
                    {CarePlanSummaryItems.map((item: any, index: any) => {
                      return (
                        <View style={{ flexDirection: "row" }} key={index}>
                          <DotWithLine
                            index={index}
                            list={CarePlanSummaryItems}
                          />
                          <View
                            style={{ flex: 90, paddingVertical: scale(10) }}
                          >
                            <AppText style={styles.title}>{item.Name}</AppText>
                            <AppText style={styles.subtitle}>
                              {getDateFormatForDay(item.EventDate)}
                            </AppText>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}

            {TransitionOfCareItems[0] !== undefined &&
              Object.keys(TransitionOfCareItems[0]).length > 0 && (
                <View>
                  <CardWithIcon
                    title={"TOC Plan"}
                    subtitle={
                      TransitionOfCareItems[0].PACTypeID === 1040
                        ? TransitionOfCareItems[0].PACTypeName
                        : null
                    }
                    Icon={LocationIcon}
                  />

                  {TransitionOfCareItems[0].PACTypeID !== undefined &&
                  TransitionOfCareItems[0].PACTypeID !== 1040 ? (
                    <View style={styles.container}>
                      {TransitionOfCareItems.map((item: any, index: any) => {
                        const {
                          PACTypeName = "",
                          ProviderName = "",
                          TargetLOS = "",
                        } = item;

                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              paddingLeft: scale(10),
                            }}
                            key={index}
                          >
                            <View
                              style={{
                                flex: 90,
                                paddingVertical: scale(10),
                              }}
                            >
                              <AppText style={styles.subtitle}>
                                {item.ProviderName}
                              </AppText>

                              {LocationTypes.map((item: any, index: any) => {
                                if (item.DisplayName === PACTypeName) {
                                  return (
                                    <AppText style={styles.title}>
                                      {checkForDaysOrVisits(index, TargetLOS)}
                                    </AppText>
                                  );
                                }
                              })}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              )}
          </View>
        )}
      </ScrollView>
    </ContainerView>
  );
};

export default TOCInformation;
