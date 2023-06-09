import { View, ViewStyle } from "react-native";
import React from "react";
import AppText from "../appText";
import styles from "./styles";
import { scale } from "react-native-size-matters";
import ContainerView from "../../blockComponents/containerView";

type props = {
  Icon: any;
  line1: string;
  line2?: string;
  isHorizontal?: boolean;
};

const NoResultFound = ({ Icon, line1, line2, isHorizontal }: props) => {
  return (
    <View style={styles.notfound as ViewStyle}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "70%",
          flexDirection: isHorizontal ? "row" : "column",
        }}
      >
        <Icon width={scale(120)} height={scale(120)} />
        <View>
          {line1 && (
            <AppText
              style={[
                styles.line2,
                { fontWeight: "700" },
                { marginTop: scale(5) },
              ]}
            >
              {line1}
            </AppText>
          )}
          {line2 && line2.length > 0 && (
            <AppText style={styles.line1}>{line2}</AppText>
          )}
        </View>
      </View>
    </View>
  );
};

export default NoResultFound;
