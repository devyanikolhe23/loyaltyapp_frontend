import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceScreen from "../screens/services/ServiceScreen";
import ServiceDetailScreen from "../screens/services/ServiceDetailScreen";
import BookingServiceScreen from "../screens/booking/BookingServiceScreen";
import BookingConfirmationScreen from "../screens/bookingconfirmation/BookingConfirmationScreen";
const Stack = createNativeStackNavigator();

export default function ServiceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen
  name="ServiceScreen"
  component={ServiceScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="ServiceDetailScreen"
  component={ServiceDetailScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen name="BookingServiceScreen" component={BookingServiceScreen} />
<Stack.Screen name="BookingConfirmationScreen" component={BookingConfirmationScreen} />
    </Stack.Navigator>
  );
}