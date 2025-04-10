import React from "react";
import { useGlobalContext } from "../context/context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import OrderConfirmationScreen from "../screens/OrderConfirmationScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AccountScreen from "../screens/AccountScreen";
import AddressScreen from "../screens/AddressScreen";
import DetailScreen from "../screens/DetailScreen";
import AboutScreen from "../screens/AboutScreen";
import OrderScreen from "../screens/OrderScreen";
import HelpScreen from "../screens/HelpScreen";
import RestaurantScreen from "../screens/RestaurantScreen";
import BasketScreen from "../screens/BasketScreen";
import VerifyScreen from "../screens/VerifyScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import OrderSummaryScreen from "../screens/OrderSummaryScreen";

const Stack = createNativeStackNavigator();

const NavigationSelector = () => {
  const { state } = useGlobalContext();
  const { isLoggedIn } = state;
  //const isLoggedIn = true;

  return (
    <>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Menu"
            component={MenuStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderConfirmationScreen"
            component={OrderConfirmationScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verify"
            component={VerifyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

const MenuStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Restaurant"
        component={RestaurantScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Basket"
        component={BasketScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Delivery Address"
        component={AddressScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="My Details"
        component={DetailScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="My Recent Orders"
        component={OrderScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Order Summary"
        component={OrderSummaryScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default NavigationSelector;
