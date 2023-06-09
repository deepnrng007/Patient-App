import React from "react";
import { View } from "react-native";
import DotSymbol from "../dotSymbol";
import Underline from "../underline";

type DotWithLineProps = {
  list: any;
  index: number;
};
const DotWithLine = ({ list, index }: DotWithLineProps) => {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 10,
      }}
    >
      <Underline
        style={{
          backgroundColor: index > 0 ? "#979797" : "transparent",
          width: 1,
          flex: 1,
        }}
      />
      <DotSymbol style={{ marginTop: 0, backgroundColor: "#333333" }} />
      <Underline
        style={{
          backgroundColor:
            index === list.length - 1 ? "transparent" : "#979797",
          width: 1,
          flex: 1,
        }}
      />
    </View>
  );
};

export default DotWithLine;
