import { Dimensions, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";
import { MontserratBold, MontserratMedium } from "../../../utils/font";

export const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: themes.White,
    height: scale(250),
    width: scale(Dimensions.get("screen").width - 100),
    borderRadius: scale(10),
    borderColor: themes.lightGray1,
    borderWidth: 1,
    elevation: 20,
    padding: scale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  loaderWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  parentView: {
    backgroundColor: "rgba(0,0,0,0.7)",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  erroMessage: {
    fontSize: scale(15),
    fontFamily: MontserratMedium,
    color: themes.Black,
    marginTop: scale(12),
    textAlign: "center",
  },
  username: {
    fontSize: scale(15),
    fontFamily: MontserratBold,
    color: themes.Black,
    marginTop: scale(8),
  },
});
