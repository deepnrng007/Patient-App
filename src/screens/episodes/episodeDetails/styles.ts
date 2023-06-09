import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import {
  MontserratBold,
  MontserratMedium,
  MontserratSemiBold,
} from "../../../utils/font";

const styles = ScaledSheet.create({
  container: {
    backgroundColor: themes.grayLight,
    borderRadius: scale(8),
    width: "100%",
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    marginTop: scale(20),
    marginBottom: scale(10),
  },
  topContainer: {
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
  cardTitle: {
    fontFamily: MontserratBold,
    fontSize: scale(18),
    color: themes.Black,
    marginBottom: scale(16),
  },
  title: {
    fontSize: scale(12),
    fontFamily: MontserratMedium,
  },
  subtitle: {
    fontSize: scale(14),
    fontFamily: MontserratSemiBold,
    color: themes.Black,
    marginBottom: scale(20),
  },
});

export default styles;
