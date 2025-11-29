import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/home_dashboard';
import BookingServiceScreen from '../screens/booking/BookingServiceScreen';
import PromotionsPage from '../screens/rewards/PromotionsScreen';
import PromotionsDetailsScreen from '../screens/rewards/PromotionDetails';
import NotificationSettingsScreen from '../screens/user/NotificationsScreen';
import ServiceStack from '../navigation/ServiceStack';
import OfferScreen from '../screens/Offers/OfferScreen';
import BookingConfirmationScreen from '../screens/bookingconfirmation/BookingConfirmationScreen';
import RewardsStack from './RewardsStack';
import AuthStack from './AuthStack';
import OfferStack from './OfferStack';

import ServiceStatusScreen from "../screens/services/ServiceStatusScreen";
const Stack = createStackNavigator();


export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BookingServiceScreen" component={BookingServiceScreen} />
      <Stack.Screen name="OfferScreen" component={OfferScreen} />
      <Stack.Screen name="ServiceStatusScreen" component={ServiceStatusScreen} />
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

      <Stack.Screen
        name="BookingConfirmationScreen"
        component={BookingConfirmationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="RewardsStack" component={RewardsStack}/>
      <Stack.Screen name="AuthStack" component={AuthStack}/>
      <Stack.Screen name="OfferStack" component={OfferStack}/>


    </Stack.Navigator>
  );
}
