// navigation/SupportStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SupportScreen from "../screens/support/SupportScreen";
import TermsAndConditionsScreen from "../screens/support/TermsAndConditionsScreen";
import DrivingTipsScreen from "../screens/support/DrivingTipsScreen";
import HelpCenterScreen from "../screens/support/HelpCenterScreen";

const Stack = createNativeStackNavigator();

export default function SupportStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
      <Stack.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen} />
      <Stack.Screen name="DrivingTipsScreen" component={DrivingTipsScreen} />
      <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
    </Stack.Navigator>
  );
}
