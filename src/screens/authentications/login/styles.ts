import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import {
  MontserratBold,
  MontserratMedium,
  MontserratSemiBold,
} from "../../../utils/font";
import { getDeviceDimenstion, isAndroid } from "../../../utils/utils";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: scale(30),
    paddingHorizontal: scale(28),
  },
  registerTitle: {
    fontSize: scale(30),
    color: themes.Black,
    marginTop: scale(25),
    fontFamily: MontserratBold,
  },
  LoginTitle: {
    fontSize: scale(14),
    color: themes.green,
    marginTop: scale(25),
    fontFamily: MontserratSemiBold,
  },
  logo: {
    width: scale(150),
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: scale(-30),
  },
  input: {
    marginTop: scale(20),
  },
  forgotPassword: {
    color: themes.green,
    fontSize: scale(themes.LargeFontSize),
    alignSelf: "flex-end",
    marginTop: scale(10),
    fontFamily: MontserratMedium,
  },
  newUserText: {
    color: themes.green,
    fontSize: scale(themes.LargeFontSize),
    alignSelf: "center",
    marginTop: scale(30),
    fontFamily: MontserratMedium,
  },
  loginWithTouch: {
    color: themes.green,
    fontSize: scale(themes.NormalFontSize),
    alignSelf: "center",
    position: "absolute",
    marginTop: getDeviceDimenstion("height") - (isAndroid() ? 180 : 100),
    fontFamily: MontserratSemiBold,
  },
});

export default styles;
