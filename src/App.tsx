import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./screenNavigators/rootNavigator";
import { store } from "./redux/store";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
