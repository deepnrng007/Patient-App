import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { MontserratMedium } from "../../../utils/font";

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
  defaultStyle: {
    fontSize: scale(themes.SmallFontSize),
    fontFamily: MontserratMedium,
    color: themes.Black1,
  },
});

export default styles;
