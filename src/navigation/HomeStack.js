import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/home_dashboard';
import BookingServiceScreen from '../screens/booking/BookingServiceScreen';
import PromotionsPage from '../screens/rewards/PromotionsScreen';
import PromotionsDetailsScreen from '../screens/rewards/PromotionDetails';
import NotificationSettingsScreen from '../screens/user/NotificationsScreen'
import ServiceStack from '../navigation/ServiceStack';
const Stack = createStackNavigator();


export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BookingServiceScreen" component={BookingServiceScreen} />
      <Stack.Screen
        name="PromotionsScreen"
        component={PromotionsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PromotionsDetails"
        component={PromotionsDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationSettingsScreen"
        component={NotificationSettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Services"
        component={ServiceStack}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
