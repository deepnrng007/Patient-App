import { View, ViewStyle } from "react-native";
import React from "react";
import CardWithIcon from "../cardWithIcon";
import logger from "../../../utils/logger";

type PatientsDetailsProps = {
  list: any[];
  style?: ViewStyle;
};

const ListItems = ({ list, style }: PatientsDetailsProps) => {
  return (
    <View style={[style]}>
      {list.map((item, index) => {
        return (
          <CardWithIcon
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            Icon={item.icon}
            isImage={item.isImage}
            isClickable={item.isClickable}
            onPress={() => {
              logger.log("print");
            }}
          />
        );
      })}
    </View>
  );
};

export default ListItems;
