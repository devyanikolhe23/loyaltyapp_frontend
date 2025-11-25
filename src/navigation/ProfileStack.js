// navigation/SupportStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/user/ProfileScreen";
import ServiceHistoryScreen from "../screens/user/ServiceHistoryScreen";
import LoyaltyRewardsScreen from "../screens/rewards/LoyaltyRewardsScreen";
import ReferFriendScreen from "../screens/rewards/ReferFriendScreen";
import LanguagePicker from '../screens/LanguagePicker';
import BookingServiceScreen from "../screens/booking/BookingServiceScreen";
import ReviewScreen from "../screens/rewards/ReviewScreen";
import MyCouponsScreen from "../screens/rewards/MyCouponsScreen";
const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ServiceHistoryScreen" component={ServiceHistoryScreen} />
      <Stack.Screen name="LoyaltyRewardsScreen" component={LoyaltyRewardsScreen} />
      <Stack.Screen name="ReferFriendScreen" component={ReferFriendScreen} />
      <Stack.Screen
        name="LanguagePicker"
        component={LanguagePicker}
        options={{ title: "Language Picker" }}
      />
      <Stack.Screen name="BookingServiceScreen" component={BookingServiceScreen} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="MyCouponsScreen" component={MyCouponsScreen} />
    </Stack.Navigator>
  );
}
