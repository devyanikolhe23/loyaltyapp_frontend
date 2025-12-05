import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceScreen from "../screens/services/ServiceScreen";
import ServiceDetailScreen from "../screens/services/ServiceDetailScreen";
import BookingServiceScreen from "../screens/booking/BookingServiceScreen";
import ServiceStatusScreen from "../screens/services/ServiceStatusScreen";
import BookingConfirmationScreen from "../screens/bookingconfirmation/BookingConfirmationScreen";
import PromotionDetailsScreen from "../screens/rewards/PromotionDetails";
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
       <Stack.Screen
        name="BookingServiceScreen"
        component={BookingServiceScreen}
        options={{ title: "Edit Booking" }}
      />
      <Stack.Screen name="BookingConfirmationScreen" component={BookingConfirmationScreen} />
      <Stack.Screen name="ServiceStatusScreen" component={ServiceStatusScreen} />
      <Stack.Screen name="PromotionDetails" component={PromotionDetailsScreen}/>
    </Stack.Navigator>
  );
}