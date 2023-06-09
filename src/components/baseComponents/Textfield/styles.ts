import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { MontserratMedium } from "../../../utils/font";

export const styles = ScaledSheet.create({
  keyIcon: {
    paddingEnd: scale(10),
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    width: "100%",
  },
  inputStyle: {
    fontSize: scale(themes.NormalFontSize),
    width: "80%",
    borderRadius: scale(8),
    paddingLeft: scale(8),
    paddingRight: scale(8),
    color: themes.gray20,
  },
  input: {
    fontSize: scale(16),
    color: themes.gray20,
    fontFamily: MontserratMedium,
    fontWeight: "500",
    flex: 1,
  },
  textfieldView: {
    borderColor: themes.gray1,
    fontWeight: "500",
    borderWidth: scale(1),
    borderRadius: scale(5),
    padding: scale(4),
    backgroundColor: themes.White,
    height: scale(50),
    fontSize: scale(16),
    fontFamily: MontserratMedium,
    flexDirection: "row",
    paddingStart: scale(8),
    alignItems: "center",
    color: themes.Black,
  },
  button: {
    borderColor: themes.gray1,
    fontWeight: "400",
    borderWidth: scale(1),
    borderRadius: scale(5),
    marginTop: scale(8),
    backgroundColor: themes.green,
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  titleView: { flexDirection: "row", justifyContent: "space-between" },
  error: {
    color: "#FF5523",
    fontFamily: MontserratMedium,
    marginTop: scale(5),
  },
  titleStyle: {
    fontSize: scale(14),
    color: themes.titleBlack,
    fontFamily: MontserratMedium,
    marginBottom: scale(8),
  },
});
