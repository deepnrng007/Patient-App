import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";

const styles = ScaledSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: scale(30),
  },
  label: {
    fontSize: scale(themes.LargeFontSize),
    marginLeft: scale(8),
    color: "#808080",
  },
  viewStyle: {
    backgroundColor: themes.transparent,
    padding: scale(10),
    width: "100%",
    justifyContent: "center",
  },
});

export default styles;
