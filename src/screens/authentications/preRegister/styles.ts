import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { MontserratMedium, MontserratSemiBold } from "../../../utils/font";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
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

  backArrow: {
    marginTop: scale(40),
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 9,
    width: "100%",
  },

  textStyle: {
    fontFamily: MontserratSemiBold,
    fontSize: scale(14),
    paddingTop: scale(16),
    color: themes.LightGray6,
  },
  ErrorStyle: {
    fontFamily: MontserratSemiBold,
    fontSize: scale(14),
    paddingTop: scale(16),
    color: themes.Red,
  },
  inputContainer: {
    flexDirection: "row",
    zIndex: 99,
  },
  titleStyle: {
    fontSize: scale(14),
    color: themes.titleBlack,
    fontFamily: MontserratMedium,
    marginBottom: scale(8),
    marginTop: scale(16),
  },
});

export default styles;
