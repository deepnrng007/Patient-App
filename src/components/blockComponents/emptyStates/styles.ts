import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { MontserratMedium } from "../../../utils/font";

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: scale(themes.PaddingArroundValue),
    marginRight: scale(themes.PaddingArroundValue),
    padding: scale(30),
  },
  box1: {
    flex: 40,
  },
  box2: {
    paddingTop: scale(10),
  },
  round: {
    height: scale(100),
    width: scale(100),
    borderRadius: scale(100),
    backgroundColor: themes.LighGray3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    color: themes.gray20,
    fontSize: scale(themes.NormalFontSize),
    fontFamily: MontserratMedium,
  },
  message: {
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(19),
    textAlign: "center",
    fontFamily: MontserratMedium,
    color: themes.green,
  },
});

export default styles;
