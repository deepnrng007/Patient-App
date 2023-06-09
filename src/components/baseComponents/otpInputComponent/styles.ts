import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { MontserratBold } from "../../../utils/font";

const styles = ScaledSheet.create({
  notfound: {
    justifyContent: "center",
    alignItems: "center",
  },
  otpContainer: {
    width: "100%",
    height: scale(65),
  },
  inputFieldStyle: {
    backgroundColor: themes.White,
    opacity: 0.8,
    height: scale(65),
    width: scale(65),
    borderRadius: scale(8),
    fontSize: scale(24),
    color: themes.green,
    fontFamily: MontserratBold,
  },
});

export default styles;
