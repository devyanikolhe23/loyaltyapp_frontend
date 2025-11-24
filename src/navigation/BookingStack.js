// navigation/BookingStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Bookings from "../screens/booking/Bookings";
import BookingDetailsScreen from "../screens/booking/BookingDetails";
import BookingConfirmationScreen from "../screens/bookingconfirmation/BookingConfirmationScreen";


const Stack = createNativeStackNavigator();

export default function BookingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyBookingsScreen" component={Bookings} />
      <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
      <Stack.Screen name="BookingConfirmationScreen" component={BookingConfirmationScreen}/>
    </Stack.Navigator>
  );
}
