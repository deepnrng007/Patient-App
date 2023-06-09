import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../enums";
import {
  MontserratBold,
  MontserratMedium,
  MontserratSemiBold,
} from "../../utils/font";

const styles = ScaledSheet.create({
  topcontainer: {
    backgroundColor: themes.White,
    flex: 1,
    paddingLeft: themes.PaddingArroundValue,
    paddingRight: themes.PaddingArroundValue,
  },
  container: {
    backgroundColor: "#F1F1F1",
    borderRadius: scale(5),
    width: "100%",

    marginLeft: scale(40),
    padding: scale(10),
    paddingTop: scale(10),
  },
  pageTitle: {
    fontFamily: MontserratBold,
    fontSize: scale(22),
    color: themes.Black,
  },
  title: {
    fontSize: scale(14),
    fontFamily: MontserratMedium,
  },
  subtitle: {
    fontSize: scale(15),
    fontFamily: MontserratSemiBold,
    color: themes.Black,
    width: "90%",
  },
});

export default styles;
