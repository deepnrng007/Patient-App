import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Modal, View, ViewStyle } from "react-native";
import { scale } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import {
  AppButton,
  AppText,
  ContainerView,
  Loader,
  useAppSelector,
} from "../../components";
import ErrorModal from "../../components/baseComponents/errorModal";
import GroupImages from "../../components/baseComponents/groupImages";
import ModalLoader from "../../components/baseComponents/modalLoader";
import NotFoundOrError from "../../components/baseComponents/notFoundOrError";
import SnackBarComponent from "../../components/baseComponents/snackBarComponent";
import BottomSheet from "../../components/blockComponents/bottomSheet";
import { screenNames, themes } from "../../enums";
import { constants } from "../../enums/constants";
import { makeCall } from "../../redux/apis/callApi";
import { fetchContacts } from "../../redux/apis/fetchContacts";
import { RootStackParams } from "../../screenNavigators/rootNavigator";
import { ErrorInfo } from "../../utils/imagePaths";
import logger from "../../utils/logger";
import styles from "./styles";

type Props = NativeStackScreenProps<RootStackParams, screenNames.PHONE>;

const Phone = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { contact, call, patientprofile } = useAppSelector((state) => {
    return {
      contact: state.contact,
      loginData: state.login,
      call: state.call,
      patientprofile: state.patientProfile,
    };
  });
  const [list, setContactList] = useState([]);
  const [error, setIsError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const refRBSheet = useRef<any>();

  const { callStatus, callError, callResponse } = call;
  const { contactList = [], contactLoading } = contact;
  const { loginDetails } = useAppSelector((state) => state.login);
  const {
    patientprofileData: { PhoneNumber },
  } = patientprofile;

  useEffect(() => {
    if (callError) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [callError]);

  useEffect(() => {
    if (callStatus === "Pending") {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  }, [callStatus]);

  useEffect(() => {
    dispatch(fetchContacts(loginDetails.userOwnerId));
  }, []);

  useEffect(() => {
    if (contactList && contactList.allContact)
      setContactList(contactList.allContact);
  }, [contactList]);

  const [currentContact, setCurrentContact] = useState({
    name: "John Doe",
    phoneNumber: "1234567890",
    description: "Navigator",
    contactType: "Navigator",
    practicePhone: "1234567890",
    userId: "userid",
  });

  const onPressMessage = () => {
    refRBSheet.current.close();
    logger.log(PhoneNumber, currentContact.phoneNumber, currentContact.userId);
    setTimeout(() => {
      dispatch(
        makeCall({
          callerTo: PhoneNumber,
          recipientTo:
            currentContact.contactType === "Physician"
              ? currentContact.practicePhone
              : currentContact.phoneNumber,
          navigatorId: "",
          participantId: currentContact.userId,
        })
      );
    }, 300);
  };
  const onCancel = () => {
    refRBSheet.current.close();
  };

  const renderItem = ({ item }: any) => {
    logger.log(item);
    return (
      <AppButton
        style={styles.itemContainer as ViewStyle}
        onPress={() => {
          setCurrentContact({
            contactType: item.contactType,
            description: item.description,
            name: `${item.firstName} ${item.lastName}`,
            phoneNumber: `${item.phoneNumber}`,
            practicePhone: item.practicePhone,
            userId: item.userId,
          });
          refRBSheet.current.open();
        }}
      >
        <View style={styles.iconContainer}>
          <GroupImages
            groupConversationIcon={""}
            name={`${item.firstName} ${item.lastName}`}
          />
        </View>
        <View style={styles.headerContainer}>
          <AppText
            style={styles.subtitle}
          >{`${item.firstName} ${item.lastName}`}</AppText>
          <AppText style={styles.title}>{item.contactType}</AppText>
        </View>
      </AppButton>
    );
  };

  return contactLoading ? (
    <ContainerView style={{ backgroundColor: themes.White, flex: 1 }}>
      <Loader />
    </ContainerView>
  ) : list.length > 0 ? (
    <ContainerView style={styles.container as ViewStyle}>
      <ModalLoader isVisible={showDialog} />
      <AppText style={styles.pageTitle}>{constants.CONTACTS}</AppText>
      <FlatList
        data={list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      ></FlatList>

      <BottomSheet
        currentContact={currentContact}
        refRBSheet={refRBSheet}
        onPress={onPressMessage}
        onCancel={onCancel}
      />
      <ErrorModal
        isVisible={error}
        currentContact={currentContact}
        onPress={() => {
          setIsError(false);
        }}
        Icon={ErrorInfo}
      />
    </ContainerView>
  ) : (
    <ContainerView style={{ backgroundColor: themes.White }}>
      <NotFoundOrError
        enableIcon
        type="noContactsFound"
        style={{
          backgroundColor: "#F9F9F9",
          margin: scale(20),
          borderRadius: scale(10),
          alignItems: "center",
          justifyContent: "center",
          borderWidth: scale(1),
          borderColor: themes.LighGray3,
        }}
      />
    </ContainerView>
  );
};

export default Phone;
