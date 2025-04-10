import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ContextProvider from "./src/context/context";
import "react-native-url-polyfill/auto";
import NavigationSelector from "./src/components/NavigationSelector";
import { StatusBar } from "react-native";

// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <NavigationSelector />
      </NavigationContainer>
    </ContextProvider>
  );
}

//export default inject("store")(observer(App));
