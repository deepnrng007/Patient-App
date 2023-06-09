import React from "react";
import { Text } from "react-native-paper";
import { ContainerView } from "../../components";
import { themes } from "../../enums";

// type Props = NativeStackScreenProps<RootStackParams, screenNames.NOTIFICATIONS>;

const Notifications = () => {
  return (
    <ContainerView
      isBackRequired
      hideStatusSpacer
      headerName="Notifications"
      style={{ backgroundColor: themes.White, flex: 1 }}
    >
      <Text>Notifications</Text>
    </ContainerView>
  );
};

export default Notifications;
