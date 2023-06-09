import {
  View,
  Text,
  ViewStyle,
  TextStyle,
  DeviceEventEmitter,
} from "react-native";
import React, { useState } from "react";
import {
  AppButton,
  AppText,
  ContainerView,
  Loader,
  useAppDispatch,
  useAppSelector,
} from "../../components";
import Pdf from "react-native-pdf";
import styles from "./styles";
import { langVar, screenNames, themes } from "../../enums";
import { Checkbox } from "react-native-paper";
import {
  removeEncryptedStorage,
  setEncryptedStorage,
} from "../../utils/encryptedStorage";
import { constants, encriptedStorageKeys } from "../../enums/constants";
import { global } from "../../global";
import {
  clearLoginDetails,
  setLoginDetails,
} from "../../redux/slicers/loginSlice";
import logger from "../../utils/logger";
import { updateTermsAndCondition } from "../helper";
import { alertBox } from "../../utils/utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../screenNavigators/rootNavigator";
import ModalLoader from "../../components/baseComponents/modalLoader";
import NavigationHeader from "../../components/blockComponents/navigationHeader";
import { scale } from "react-native-size-matters";

type Props = NativeStackScreenProps<
  RootStackParams,
  screenNames.PDFVIEWERSCREEN
>;
const PDFViewer = ({ navigation, route }: Props) => {
  const [check, setCheck] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { loginDetails } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const { url, showButtons = true, isBackRequired = true } = route.params;

  const signOut = async () => {
    DeviceEventEmitter.emit(constants.LOG_OUT_EVENT);
  };

  const onPageChanged = (currentPage: number) => {
    logger.log("onPageChangedonPageChanged :", currentPage, totalPages);
    if (currentPage === totalPages) setEnableSubmit(true);
  };

  const accepted = async () => {
    if (check) {
      setLoading(true);
      const { isAcceptedTermsAndConditions, ...rest } = loginDetails;
      try {
        const res = await updateTermsAndCondition(rest.userOwnerId);
        setLoading(false);
        if (res) navigation.replace(screenNames.DRAWERNAVIGATION);
        await setEncryptedStorage(encriptedStorageKeys.LOGINDETAILS, rest);
        dispatch(setLoginDetails(rest));
      } catch (error) {
        setLoading(false);
        alertBox("Something went wrong. Please try again");
      }
    } else alertBox('Please agree to "Terms & Conditions"');
  };

  return (
    <ContainerView style={styles.container} hideStatusSpacer>
      <NavigationHeader
        isBackRequired={isBackRequired}
        navigationTitle={constants.TANDC}
        style={{ paddingLeft: scale(10) }}
      />
      <ModalLoader isVisible={loading} />
      <Pdf
        style={styles.pdfViewer}
        source={{
          uri: url,
        }}
        onLoadComplete={setTotalPages}
        onPageChanged={onPageChanged}
        trustAllCerts={false}
        renderActivityIndicator={() => <Loader />}
      />
      {showButtons && (
        <View style={styles.acceptButtons}>
          <View style={styles.tickLabel}>
            <AppButton onPress={() => (enableSubmit ? setCheck(!check) : {})}>
              <Checkbox.Android
                disabled={!enableSubmit}
                color={themes.green}
                uncheckedColor={themes.LightGreen2}
                status={check ? "checked" : "unchecked"}
              />
            </AppButton>
            <AppText
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.label}
            >
              {"I have read and agreed to"}
              {" '"}
              <AppText style={[styles.label, styles.tandclabel]}>
                {`${constants.TANDC}`} {"'"}
              </AppText>
            </AppText>
          </View>
          <View style={styles.buttonsContainer}>
            <AppButton
              onPress={() => (enableSubmit ? accepted() : {})}
              text={"Submit"}
              style={
                [
                  styles.submitButton,
                  !enableSubmit && styles.disableSubmit,
                ] as ViewStyle
              }
              textStyle={styles.btnlabel}
            />
            <AppButton
              onPress={signOut}
              text={"Sign Out"}
              style={[styles.submitButton, styles.btnborder] as ViewStyle}
              textStyle={
                [styles.btnlabel, { color: themes.gray20 }] as TextStyle
              }
            />
          </View>
        </View>
      )}
    </ContainerView>
  );
};

export default PDFViewer;
