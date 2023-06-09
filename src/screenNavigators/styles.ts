import { Platform } from "react-native";
import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../enums";
import { MontserratMedium, MontserratSemiBold } from "../utils/font";

const isAndroid = Platform.OS === "android";

const styles = ScaledSheet.create({
  container: {
    padding: 0,
  },
  headerContainer: {
    padding: scale(themes.PaddingArroundValue),
  },
  activeDot: {
    marginTop: scale(5),
    marginBottom: scale(2),
    backgroundColor: themes.green,
  },
  tabBarIcon: {
    alignItems: "center",
    ...(isAndroid ? { justifyContent: "center", paddingTop: scale(10) } : {}),
  },
  dotStyle: {
    backgroundColor: themes.transparent,
  },
  label: {
    width: "100%",
    color: themes.White,
    marginTop: "4@s",
    fontSize: "10@s",
  },
  tabLabel: {
    width: "100%",
    fontSize: scale(10),
    color: themes.green,
    fontFamily: MontserratMedium,
  },
  tabLabelInactive: {
    color: themes.gray20,
    marginTop: scale(5),
    marginBottom: scale(2),
  },
  barStyle: {
    backgroundColor: themes.White,
    borderWidth: 0,
    // position: "absolute",
    borderColor: themes.White,
    elevation: 0,
    paddingLeft: scale(6),
    paddingRight: scale(6),
    ...(isAndroid
      ? { height: scale(70), justifyContent: "center" }
      : { height: scale(90), paddingTop: scale(15) }),
    // ...getShadow(),
  },
  drawerStyles: {
    flex: 1,
    width: "90%",
  },
  errorTest: {
    fontSize: scale(18),
    color: themes.Black,
    paddingHorizontal: scale(20),
    textAlign: "center",
  },
  signout: {
    alignItems: "flex-end",
  },
  signoutText: {
    alignItems: "flex-end",
    fontFamily: MontserratSemiBold,
    fontSize: scale(14),
    color: themes.green,
  },
});

export default styles;
