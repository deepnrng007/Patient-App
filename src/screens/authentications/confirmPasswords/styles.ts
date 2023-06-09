import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { MontserratMedium, MontserratSemiBold } from "../../../utils/font";

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
    marginBottom: scale(40),
    marginTop: scale(55),
    fontFamily: MontserratSemiBold,
  },
  otpInput: {
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  backArrow: {
    marginTop: scale(40),
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 9,
    width: "100%",
  },
  otpInputContainer: {
    marginTop: scale(45),
  },
  enterOtp: {
    fontweight: "600",
    fontSize: scale(themes.LargeFontSize),
    lineHeight: scale(17),
    textAlign: "center",
    letterApacing: 0.8,
    color: themes.LightGray6,
  },
  input: {
    marginTop: scale(20),
  },
  validation: {
    marginTop: scale(20),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  successLabel: {
    fontSize: scale(themes.NormalFontSize),
    color: themes.Black1,
    marginLeft: scale(10),
    fontFamily: MontserratSemiBold,
  },
  direction: {
    fontSize: scale(16),
    color: themes.Black1,
    alignSelf: "center",
    marginTop: scale(50),
  },
  seconds: {
    fontSize: scale(16),
    color: themes.Black,
  },
  ErrorStyle: {
    fontFamily: MontserratSemiBold,
    fontSize: scale(14),
    paddingTop: scale(16),
    color: themes.Red,
  },
});

export default styles;
