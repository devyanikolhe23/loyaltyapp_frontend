// navigation/SupportStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SupportScreen from "../screens/support/SupportScreen";
import TermsAndConditionsScreen from "../screens/support/TermsAndConditionsScreen";
import DrivingTipsScreen from "../screens/support/DrivingTipsScreen";
import HelpCenterScreen from "../screens/support/HelpCenterScreen";
import EmailUsScreen from "../screens/support/EmailUsScreen";
import CallUsScreen from "../screens/support/CallUsScreen";
import SupportChatScreen from "../screens/support/SupportChatScreen";
import InsurancePolicyScreen from "../screens/insurance/InsurancePolicyScreen";
import BookingStack from "./BookingStack";

const Stack = createNativeStackNavigator();

export default function SupportStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
      <Stack.Screen name="TermsAndConditionsScreen" component={TermsAndConditionsScreen} />
      <Stack.Screen name="DrivingTipsScreen" component={DrivingTipsScreen} />
      <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
      <Stack.Screen name="CallUsScreen" component={CallUsScreen} />
       <Stack.Screen name="EmailUsScreen" component={EmailUsScreen} />
       <Stack.Screen name="SupportChatScreen" component={SupportChatScreen}/>
       <Stack.Screen name="InsurancePolicyScreen" component={InsurancePolicyScreen}/>
       <Stack.Screen name="BookingStack" component={BookingStack}/>
    </Stack.Navigator>
  );
}
