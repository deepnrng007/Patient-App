import { Dimensions, View, ViewStyle } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import AppText from "../../baseComponents/appText";
import Card from "../../baseComponents/card";
import { HorizontalFormListProps, renderItemProps } from "./types";
import { FlatList } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import TitleIconCount from "../titleIconCount";
import EmptyStates from "../emptyStates";
import { PendingTocsIcon } from "../../../utils/imagePaths";

import { screenNames, themes } from "../../../enums";
import Loader from "../../baseComponents/loader";
import ContainerView from "../containerView";
import {
  getDateDiffFromToday,
  getDateFormatForDay,
} from "../../../utils/utils";
import AppButton from "../../baseComponents/appButton";
import logger from "../../../utils/logger";
import { scale } from "react-native-size-matters";
import { CheckedGreenCircle } from "../../../utils/imagePaths";
import NotFoundOrError from "../../baseComponents/notFoundOrError";
// import NotFound from "../../baseComponents/notFound";

const HorizontalFormList = ({
  title,
  data,
  style,
  Icon,
  count,
  emptyStateTitle,
  emptyStateMssage,
  screenName,
  onPress,
  emptyIcon,
  testID,
  accessibilityLabel,
  loading,
}: HorizontalFormListProps) => {
  const { CarePlanSummaryItems = [], PostAcuteCareSummaryItems = [] } = data;

  const list = CarePlanSummaryItems.concat(PostAcuteCareSummaryItems);

  const [showAll, setShowAll] = useState(false);
  const renderPatientDetails = (item: any, index: number) => {
    const { Name, EventDate, ProviderName, Visits } = item;
    if (screenName === screenNames.HOME) {
      return (
        <>
          <AppText style={styles.name}>
            {ProviderName ? ProviderName : Name}
          </AppText>
          {EventDate ? (
            <AppText style={styles.date}>
              {getDateFormatForDay(EventDate)}
            </AppText>
          ) : (
            Visits && <AppText style={styles.date}>{Visits} visits</AppText>
          )}
        </>
      );
    }
  };

  const renderItem = (item: any, index: number) => {
    return (
      <View
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        style={styles.safeContainer}
      >
        <Card
          onpress={() => onPress(item.name)}
          style={styles.card as ViewStyle}
        >
          <View style={styles.detailsContainer}>
            {renderPatientDetails(item, index)}
          </View>
          <View style={styles.iconContainer}>
            {item.EventDate && getDateDiffFromToday(item.EventDate) > 0 ? (
              <CheckedGreenCircle height={32} width={32} />
            ) : (
              <AntDesign name={"arrowright"} style={styles.icon} />
            )}
          </View>
        </Card>
      </View>
    );
  };

  const renderUI = () => {
    return (
      <>
        <View style={styles.titleContainer}>
          {list.length > 0 && (
            <TitleIconCount title={title} Icon={Icon} count={count} />
          )}
          <AppButton
            onPress={() => {
              setShowAll(!showAll);
            }}
          >
            {list.length > 0 ? (
              <AppText style={styles.viewButton}>
                {showAll ? "Collapse" : "View All"}
              </AppText>
            ) : (
              <></>
            )}
          </AppButton>
        </View>
        {loading ? (
          <ContainerView style={{ paddingVertical: 50 }}>
            <Loader />
          </ContainerView>
        ) : list.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={list}
            renderItem={({ item, index }) => renderItem(item, index)}
            keyExtractor={(item) => item.name}
          />
        ) : (
          <NotFoundOrError
            type="noDashboardData"
            enableIcon
            style={{
              backgroundColor: "#F9F9F9",
              margin: scale(20),
              borderRadius: scale(10),
              alignItems: "center",
              justifyContent: "center",
              borderWidth: scale(1),
              borderColor: themes.LighGray3,
            }}
          />
        )}
      </>
    );
  };

  return (
    <View
      style={{
        height: showAll
          ? null
          : list.length > 2
          ? Dimensions.get("screen").height / 2.1
          : null,
      }}
    >
      {renderUI()}
    </View>
  );
};

export default HorizontalFormList;

HorizontalFormList.defaultProps = {
  title: "",
  list: [],
  style: {},
  Icon: <PendingTocsIcon />,
  EmptyStateIcon: <PendingTocsIcon />,
  screenName: screenNames.HOME,
  searchEnabled: false,
};
