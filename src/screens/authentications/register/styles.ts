import { scale, ScaledSheet } from "react-native-size-matters";
import { themes } from "../../../enums";
import { MontserratBold, MontserratMedium } from "../../../utils/font";

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    width: "100%",
    height: "100%",
    marginTop: scale(20),
  },
  backArrow: {
    marginTop: scale(40),
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 9,
    width: "100%",
  },
  parentView: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingTop: scale(100),
  },
  input: {
    borderColor: "grey",
    fontWeight: "400",
    borderWidth: scale(1),
    borderRadius: scale(5),
    padding: scale(12),
    marginTop: scale(8),
    backgroundColor: themes.White,
    height: scale(45),
    fontSize: scale(18),
    fontFamily: MontserratMedium,
  },
  button: {
    borderColor: "grey",
    fontWeight: "400",
    borderWidth: scale(1),
    borderRadius: scale(5),
    marginTop: scale(8),
    backgroundColor: "#1AA99C",
    height: scale(50),

    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontSize: scale(12),
    fontWeight: "400",
    marginTop: scale(8),
  },
  buttonText: {
    fontSize: scale(20),
    color: themes.White,
    fontWeight: "700",
    fontFamily: MontserratMedium,
  },
  alreadyRegistered: {
    fontSize: scale(themes.NormalFontSize),
    color: themes.green,
    fontWeight: "500",
    fontFamily: MontserratMedium,
    paddingBottom: scale(20),
    textAlign: "center",
  },
  keyboardAvoidingView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopEndRadius: scale(20),
    borderTopStartRadius: scale(20),
    overflow: "hidden",
  },
  registerTitle: {
    fontSize: scale(30),
    color: themes.Black,
    marginTop: scale(25),
    fontFamily: MontserratBold,
  },
  LoginTitle: {
    fontSize: scale(14),
    color: themes.green,
    marginTop: scale(25),
    fontFamily: MontserratBold,
  },
  validation: {
    marginTop: scale(20),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
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
