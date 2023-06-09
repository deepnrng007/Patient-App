import React from "react";
import { View, FlatList, ViewStyle } from "react-native";
import { Oval } from "../../../utils/imagePaths";
import { getStatusBarSpacer } from "../../../utils/utils";

import ErrorBox from "../../baseComponents/errorBox";
import Loader from "../../baseComponents/loader";
import NavigationHeader from "../navigationHeader";
import styles from "./styles";

const ContainerView = ({
  isScrollEnable,
  children,
  style,
  loading,
  errorMessage,
  hideStatusSpacer,
  isBackRequired,
  headerName,
  isOvalRequired,
  backArrowStyle,
  customGoBack,
}: ContainerViewProps) => {
  const getStatusSpacer = (): ViewStyle => {
    return { paddingTop: hideStatusSpacer ? getStatusBarSpacer() : 0 };
  };

  const renderScreen = () => {
    if (loading) {
      return (
        <View style={styles.loadingView}>
          <Loader />
        </View>
      );
    } else if (isScrollEnable) {
      return (
        <FlatList
          bounces={false}
          data={[{}]}
          contentContainerStyle={[styles.container, style]}
          renderItem={() => <View>{children}</View>}
          nestedScrollEnabled
        />
      );
    } else return <View style={[styles.container, style]}>{children}</View>;
  };
  return (
    <View style={[styles.safeContainer, getStatusSpacer()]}>
      {isBackRequired && (
        <NavigationHeader
          style={[styles.navigationHeader, backArrowStyle] as ViewStyle}
          navigationTitle={headerName}
          isBackRequired={isBackRequired}
          customGoBack={customGoBack}
        />
      )}
      {errorMessage && <ErrorBox value={errorMessage} />}
      {isOvalRequired && (
        <View style={styles.ovalStyle}>
          <Oval />
        </View>
      )}
      {renderScreen()}
    </View>
  );
};

export default ContainerView;

interface ContainerViewProps {
  children: React.ReactNode;
  isScrollEnable: boolean;
  loading: boolean;
  style: ViewStyle;
  errorMessage: null | string;
  hideStatusSpacer: boolean;
  isBackRequired: boolean;
  headerName?: string;
  isOvalRequired: boolean;
  backArrowStyle?: ViewStyle;
  customGoBack?: string;
}

ContainerView.defaultProps = {
  isScrollEnable: false,
  children: <>/</>,
  style: {},
  loading: false,
  errorMessage: null,
  hideStatusSpacer: false,
  isBackRequired: false,
  isOvalRequired: false,
};
