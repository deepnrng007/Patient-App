import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../enums";
import {
  MontserratBold,
  MontserratMedium,
  MontserratSemiBold,
} from "../../utils/font";

const styles = ScaledSheet.create({
  container: {
    backgroundColor: themes.White,
    flex: 1,
    paddingLeft: themes.PaddingArroundValue,
    paddingRight: themes.PaddingArroundValue,
  },
  headerContainer: {
    padding: scale(themes.PaddingArroundValue),
  },
  pageTitle: {
    fontFamily: MontserratBold,
    fontSize: scale(22),
    color: themes.Black,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    // backgroundColor: themes.lightGray1,
    borderRadius: scale(43),
    borderColor: themes.lightGray1,
    borderWidth: scale(1),
    width: scale(35),
    height: scale(35),
    justifyContent: "center",
    alignItems: "center",
  },
  editContainer: {
    // backgroundColor: themes.lightGray1,
    borderRadius: scale(10),
    borderColor: themes.lightGray1,
    marginTop: scale(20),
    borderWidth: scale(1.5),
    width: "100%",
    height: scale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerFilled: {
    backgroundColor: themes.LighGray3,
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
  editicon: {
    color: themes.LightGray7,
    fontSize: scale(20),
    paddingRight: scale(10),
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
