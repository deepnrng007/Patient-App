import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../enums";
import { MontserratBold, MontserratMedium } from "../../utils/font";

const styles = ScaledSheet.create({
  pageTitle: {
    fontFamily: MontserratBold,
    fontSize: 22,
    color: themes.Black,
  },
  container: {
    backgroundColor: themes.White,
    flex: 1,
    paddingLeft: themes.PaddingArroundValue,
    paddingRight: themes.PaddingArroundValue,
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
