import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../enums";
import { MontserratBold, MontserratMedium } from "../../utils/font";

const styles = ScaledSheet.create({
  pageTitle: {
    fontFamily: MontserratBold,
    fontSize: scale(22),
    color: themes.Black,
  },
  pageSubTitle: {
    fontFamily: MontserratMedium,
    fontSize: scale(14),
    color: themes.LightGray7,
    paddingTop: scale(30),
  },
  container: {
    backgroundColor: themes.grayLight,
    borderRadius: scale(8),
    width: "100%",
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    marginTop: scale(20),
  },
  topContainer: {
    backgroundColor: themes.White,
    flex: 1,
    paddingLeft: themes.PaddingArroundValue,
    paddingRight: themes.PaddingArroundValue,
  },
  cardTitle: {
    fontFamily: MontserratBold,
    fontSize: scale(16),
    color: themes.Black,
    marginBottom: scale(8),
  },
  title: {
    fontSize: scale(14),
    fontFamily: MontserratMedium,
    marginBottom: scale(20),
    color: themes.Black,
  },
});

export default styles;
