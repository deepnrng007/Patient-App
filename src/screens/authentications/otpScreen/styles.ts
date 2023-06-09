import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import {
  MontserratBold,
  MontserratMedium,
  MontserratRegular,
  MontserratSemiBold,
} from "../../../utils/font";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  titleName: {
    fontSize: scale(30),
    color: themes.titleBlack,
    alignSelf: "center",
    marginTop: scale(55),
    fontFamily: MontserratSemiBold,
  },
  otpInput: {
    marginTop: scale(10),
    marginBottom: scale(10),
    paddingHorizontal: scale(20),
  },
  backArrow: {
    marginTop: scale(40),
    backgroundColor: themes.transparent,
    position: "absolute",
    zIndex: scale(9),
    width: "100%",
  },
  otpInputContainer: {
    marginTop: scale(45),
  },
  enterOtp: {
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(17),
    textAlign: "center",
    color: themes.Black1,
    fontFamily: MontserratMedium,
  },
  timer: {
    fontweight: "600",
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(17),
    letterApacing: 0.8,
    color: themes.Black,
    fontFamily: MontserratMedium,
  },
  invalidTextStyle: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.Red,
    fontFamily: MontserratSemiBold,
    paddingLeft: scale(20),
  },
  textStyle: {
    fontSize: scale(themes.LargeFontSize),
    color: themes.green,
    fontFamily: MontserratSemiBold,
    paddingRight: scale(20),
  },
});

export default styles;
