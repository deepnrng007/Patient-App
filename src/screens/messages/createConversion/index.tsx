import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ContainerView, useAppSelector } from "../../../components";
import ChatComponent from "../../../components/blockComponents/chatComponent";
import { screenNames } from "../../../enums";
import { RootStackParams } from "../../../screenNavigators/rootNavigator";

type Props = NativeStackScreenProps<
  RootStackParams,
  screenNames.CREATECONVERSION
>;

const CreateConversation = ({ route }: Props) => {
  const { navigatorID = "", navigatorName = "" } = route.params;
  const {
    loginDetails: { userOwnerId, firstName },
  } = useAppSelector((state) => state.login);

  return (
    <ContainerView
      isBackRequired
      style={{ padding: 0 }}
      headerName={navigatorName}
      hideStatusSpacer
    >
      <ChatComponent
        messages={[]}
        disableSendOption={false}
        currentUser={{
          _id: userOwnerId,
          name: firstName,
        }}
        navigatorID={navigatorID}
        isNewConvo={true}
        isLoadingRequired={false}
      />
    </ContainerView>
  );
};

export default CreateConversation;
