// navigation/BookingStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OfferScreen from "../screens/Offers/OfferScreen";



const Stack = createNativeStackNavigator();

export default function OfferStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OfferScreen" component={OfferScreen}/>
     
    </Stack.Navigator>
  );
}
