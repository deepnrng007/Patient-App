import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(8),
  },
  message: {
    color: themes.White,
    fontSize: scale(themes.MediumFontSize),
  },
});

export default styles;
