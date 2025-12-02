// navigation/BookingStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OfferScreen from "../screens/Offers/OfferScreen";
import ViewOfferDetails from "../screens/Offers/ViewOfferDetails";



const Stack = createNativeStackNavigator();

export default function OfferStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OfferScreen" component={OfferScreen}/>
     <Stack.Screen name="ViewOfferDetails" component={ViewOfferDetails} />
    </Stack.Navigator>
  );
}
