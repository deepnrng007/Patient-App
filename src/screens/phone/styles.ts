import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../enums";
import { MontserratBold, MontserratMedium } from "../../utils/font";

const styles = ScaledSheet.create({
  container: {
    backgroundColor: themes.White,
    flex: 1,
    paddingLeft: themes.PaddingArroundValue,
    paddingRight: themes.PaddingArroundValue,
  },
  pageTitle: {
    fontFamily: MontserratBold,
    fontSize: scale(22),
    color: themes.Black,
  },
  headerContainer: {
    padding: scale(themes.PaddingArroundValue),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    borderRadius: scale(43),
    width: scale(35),
    height: scale(35),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  icon: {
    color: themes.LightGray7,
    fontSize: scale(14),
  },
  title: {
    fontSize: scale(12),
    fontFamily: MontserratMedium,
    fontWeight: "500",
    marginTop: scale(4),
  },
  subtitle: {
    fontSize: scale(16),
    fontFamily: MontserratBold,
    color: themes.Black,
  },
  subtitleGreen: {
    fontSize: scale(14),
    fontFamily: MontserratBold,
    color: themes.green,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(22),
  },

  activityIndicatorWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: scale(100),
    width: scale(100),
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
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
});

export default styles;
