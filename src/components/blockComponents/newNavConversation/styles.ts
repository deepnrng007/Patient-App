import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";
import { MontserratMedium, MontserratSemiBold } from "../../../utils/font";

const styles = StyleSheet.create({
  navigatorChat: {
    borderWidth: scale(2),
    borderColor: themes.darkGray,
    padding: scale(18),
    marginTop: scale(10),
    borderRadius: scale(10),
    backgroundColor: themes.snuff,
  },
  title: {
    fontSize: scale(16),
    fontFamily: MontserratSemiBold,
    color: themes.Black,
  },
  subtitle: {
    fontSize: scale(13),
    fontFamily: MontserratMedium,
    color: themes.Black1,
    paddingTop: scale(3),
  },
});

export default styles;
