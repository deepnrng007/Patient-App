import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { MontserratBold, MontserratMedium } from "../../../utils/font";

const styles = ScaledSheet.create({
  container: {
    backgroundColor: themes.White,
    flex: 1,
    paddingLeft: themes.PaddingArroundValue,
    paddingRight: themes.PaddingArroundValue,
  },
  search: {
    marginTop: scale(15),
    marginBottom: scale(20),
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: scale(15),
    paddingBottom: scale(15),
  },
  col1: {
    flex: 15,
  },
  col2: {
    flex: 80,
  },
  name: {
    fontSize: scale(themes.NormalFontSize),
    color: themes.gray20,
    flex: 60,
    fontFamily: MontserratBold,
  },
  message: {
    fontSize: scale(themes.MediumFontSize),
    marginTop: scale(5),
    fontFamily: MontserratMedium,
  },
  nameDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    flex: 34,
    fontSize: scale(themes.SmallFontSize),
    textAlign: "right",
    color: themes.gray20,
    fontFamily: MontserratMedium,
  },
  badge: {
    backgroundColor: themes.LightGreen4,
    alignSelf: "flex-start",
    padding: scale(3),
    paddingRight: scale(8),
    paddingLeft: scale(8),
    borderRadius: scale(10),
    marginTop: scale(5),
  },
  convesionType: {
    color: themes.gray2,
    fontSize: scale(themes.MediumFontSize),
  },
  resultFoundLabel: {
    textAlign: "center",
    paddingTop: scale(40),
  },
  notFoundView: {
    flex: 1,
    alignSelf: "center",
    marginTop: scale(60),
  },

  pageTitle: {
    fontFamily: MontserratBold,
    fontSize: 22,
    color: themes.Black,
  },
});

export default styles;
