import { View } from "react-native";
import React from "react";
import { AppText } from "../..";
import { DotIcon, GreenTickIcon, Info } from "../../../utils/imagePaths";
import styles from "./styles";
import { themes } from "../../../enums";
import { scale } from "react-native-size-matters";
import { constants } from "../../../enums/constants";

type props = {
  list: {
    check: boolean;
    label: string;
  }[];
};

const PasswordValidationChecks = ({ list }: props) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Info height={20} width={20} />
        <AppText style={[styles.label, { marginLeft: scale(0) }]}>
          {constants.MUST}
        </AppText>
      </View>
      <View style={styles.viewStyle}>
        {list &&
          list.map((item: any, index: number) => {
            return (
              <View key={index} style={styles.row}>
                {item.check ? <GreenTickIcon /> : <DotIcon />}
                <AppText
                  style={[styles.label, item.check && { color: themes.gray1 }]}
                >
                  {item.label}
                </AppText>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default PasswordValidationChecks;
