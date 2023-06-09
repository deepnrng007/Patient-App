import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { themes } from "../../../enums";
import { MontserratRegular, MontserratSemiBold } from "../../../utils/font";

export const styles = StyleSheet.create({
  name: {
    color: themes.gray20,
    fontSize: scale(themes.FontSize22),
    fontFamily: MontserratSemiBold,
  },
  contactType: {
    color: themes.Black1,
    fontSize: scale(themes.LargeFontSize),
    marginTop: scale(4),
    fontFamily: MontserratRegular,
  },
  container: {
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    height: "50%",
  },
  wrapper: {
    backgroundColor: themes.transparent50,
  },
  bottomSheetView: {
    flex: 1,
    widht: "100%",
    alignItems: "center",
    marginTop: scale(18),
    justifyContent: "space-between",
  },
  textView: {
    alignItems: "center",
    width: "100%",
    marginBottom: scale(40),
  },
  buttonsView: {
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: scale(20),
  },
  messageButtonText: {
    color: themes.White,
    fontSize: scale(themes.NormalFontSize),
    paddingVertical: scale(16),
    marginLeft: scale(2),
  },
  messageButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.green,
    borderWidth: scale(themes.borderWidthSize),
    borderColor: themes.green,
    borderRadius: scale(8),
    marginHorizontal: scale(18),
    width: "90%",
  },
  callText: {
    color: themes.White,
    fontSize: scale(themes.NormalFontSize),
    paddingVertical: scale(16),
    marginLeft: scale(2),
    fontFamily: MontserratSemiBold,
  },
  cancelText: {
    color: themes.gray20,
    fontSize: scale(themes.NormalFontSize),
    paddingVertical: scale(16),
    marginLeft: scale(2),
    fontFamily: MontserratSemiBold,
  },
  callButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.green,
    borderWidth: scale(themes.borderWidthSize),
    borderRadius: scale(8),
    borderColor: themes.green2,
    width: "90%",
  },
  cancelButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.White,
    borderWidth: scale(themes.borderWidthSize),
    borderRadius: scale(8),
    borderColor: themes.green3,
    marginTop: scale(18),
    width: "90%",
  },
});
