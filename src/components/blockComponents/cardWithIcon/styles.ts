import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import {
  MontserratBold,
  MontserratMedium,
  MontserratSemiBold,
} from "../../../utils/font";

const styles = ScaledSheet.create({
  headerContainer: {
    padding: scale(themes.PaddingArroundValue),
    marginEnd: scale(20),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    borderRadius: scale(43),
    borderColor: themes.lightGray1,
    borderWidth: scale(1),
    width: scale(35),
    height: scale(35),
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: themes.LightGray7,
    fontSize: scale(14),
  },
  title: {
    fontSize: scale(12),
    fontFamily: MontserratMedium,
  },
  subtitle: {
    fontSize: scale(14),
    fontFamily: MontserratSemiBold,
    color: themes.Black,
  },
  subtitleGreen: {
    fontSize: scale(14),
    fontFamily: MontserratBold,
    color: themes.green,
  },
});

export default styles;
