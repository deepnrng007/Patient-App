import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { MontserratMedium, MontserratSemiBold } from "../../../utils/font";

const styles = ScaledSheet.create({
  back: {
    height: scale(50),
    justifyContent: "center",
    backgroundColor: themes.White,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  safeContainer: {
    marginHorizontal: scale(themes.PaddingArroundValue),
    marginVertical: scale(6),
    marginRight: 0,
  },
  titleContainer: {
    paddingLeft: scale(themes.PaddingArroundValue),
    paddingBottom: scale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    paddingLeft: scale(10),
    fontSize: scale(themes.ExtraLargeFontSize),
    fontFamily: MontserratMedium,
    color: themes.Black2,
  },
  card: {
    width: "95%",
    backgroundColor: themes.LightGreen,
    borderWidth: scale(0.5),
    borderColor: themes.green,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: scale(8),
    paddingBottom: scale(20),
    paddingTop: scale(20),
    paddingLeft: scale(16),
    paddingRight: scale(16),
  },
  detailsContainer: {
    width: "80%",
  },
  name: {
    fontSize: scale(themes.NormalFontSize),
    fontFamily: MontserratMedium,
    color: themes.Black,
  },
  problem: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: MontserratMedium,
    lineHeight: scale(25),
    color: themes.Black1,
  },
  date: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: MontserratMedium,
    color: themes.Black1,
  },
  iconContainer: {
    backgroundColor: themes.green,
    borderRadius: scale(43),
    width: scale(30),
    height: scale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: themes.White,
    fontSize: scale(20),
  },
  titleIcon: {
    marginLeft: scale(themes.PaddingArroundValue),
    flexDirection: "row",
    alignItems: "center",
  },
  viewButton: {
    fontFamily: MontserratSemiBold,
    fontSize: scale(12),
    textDecorationLine: "underline",
    color: themes.green,
    paddingRight: scale(20),
  },
});

export default styles;
