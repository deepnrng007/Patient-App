import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { MontserratBold, MontserratRegular } from "../../../utils/font";
import { disableShadow } from "../../../utils/utils";

export const styles = StyleSheet.create({
  userInfoView: {
    backgroundColor: themes.LightGreen,
    borderWidth: scale(themes.borderWidthSize),
    marginTop: scale(30),
    height: scale(76),
    borderColor: themes.shadowGreen,
    borderRadius: scale(8),
    ...disableShadow(),
  },
  userDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signOutView: {
    backgroundColor: themes.green,
    borderRadius: scale(9),
    justifyContent: "center",
    height: scale(56),
  },
  loggedInText: {
    color: themes.gray20,
    fontSize: scale(themes.LargeFontSize),
    fontFamily: MontserratRegular,
  },
  userName: {
    color: themes.gray20,
    fontSize: scale(themes.NormalFontSize),
    fontFamily: MontserratBold,
    marginTop: scale(8),
  },
  signoutText: {
    color: themes.White,
    fontSize: scale(themes.MediumFontSize),
    fontFamily: MontserratBold,
    padding: scale(20),
  },
});
