import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../enums";
import { MontserratBold } from "../../utils/font";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: scale(18),
    color: themes.gray20,
    fontWeight: "700",
  },
  version: {
    marginTop: scale(10),
    fontSize: scale(14),
    fontWeight: "600",
  },
  desc: {
    marginTop: scale(25),
    fontSize: scale(14),
    fontWeight: "400",
    lineHeight: scale(22),
  },
  underline: {
    height: 1,
    backgroundColor: themes.shadowGreen,
    width: "100%",
    alignSelf: "center",
    marginTop: scale(22),
    marginBottom: scale(22),
  },
  aboutStyle: {
    fontFamily: MontserratBold,
    padding: scale(15),
    marginTop: scale(24),
  },
});

export default styles;
