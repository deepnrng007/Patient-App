import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums/themes";
import { MontserratMedium } from "../../../utils/font";

const styles = ScaledSheet.create({
  container: {
    padding: scale(themes.PaddingArroundValue),
    paddingTop: 0,
  },
  messageListContainer: {
    borderRadius: scale(6),
    padding: scale(themes.PaddingArroundValue),
    paddingTop: 0,
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green,
  },
  messageContainer: {
    flex: 1,
    marginTop: scale(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  messageDetails: {
    flex: 80,
  },
  nameDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    flex: 50,
    fontFamily: MontserratMedium,
    color: themes.Black,
    fontSize: scale(themes.NormalFontSize),
  },
  date: {
    flex: 45,
    textAlign: "left",
    fontSize: scale(themes.MediumFontSize),
    fontFamily: MontserratMedium,
  },
  message: {
    fontSize: scale(themes.LargeFontSize),
    fontFamily: MontserratMedium,
    color: themes.LightGray,
  },
  iconContainer: {
    flex: 10,
    backgroundColor: themes.green,
    borderRadius: scale(50),
    width: scale(30),
    height: scale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: scale(20),
    color: themes.White,
  },
  titleCount: {
    marginLeft: 0,
  },
  viewAll: {
    color: themes.green,
    fontSize: scale(themes.LargeFontSize),
    textDecorationLine: "underline",
    fontFamily: MontserratMedium,
  },
});

export default styles;
