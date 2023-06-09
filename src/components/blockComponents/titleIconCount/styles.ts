import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { MontserratBold, MontserratSemiBold } from "../../../utils/font";

const styles = ScaledSheet.create({
  icon: {
    color: themes.White,
    fontSize: scale(20),
  },
  title: {
    paddingLeft: scale(10),
    fontSize: scale(themes.FontSize18),
    fontFamily: MontserratBold,
    color: themes.Black,
  },
  titleIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterView: {
    backgroundColor: themes.LightGray2,
    borderRadius: scale(4.5),
    padding: scale(5),
    paddingLeft: scale(8),
    paddingRight: scale(8),
    marginLeft: scale(8),
  },
  counter: {
    fontSize: scale(14),
    fontFamily: MontserratSemiBold,
    color: themes.DarkGray,
  },
});

export default styles;
