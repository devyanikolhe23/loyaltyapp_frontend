// navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ServiceScreen from '../screens/services/ServiceScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import SupportStack from './SupportStack';
import ShowroomsScreen from '../screens/showroom/ShowroomsScreen';
import NotificationSettingsScreen from '../screens/user/NotificationsScreen';
import MyBookingsScreen from '../screens/booking/Bookings';
import ServiceStack from './ServiceStack';
import BookingStack from './BookingStack';
import ProfileStack from './ProfileStack';
import RewardStack from './RewardsStack';
import AddVehicleScreen from '../screens/user/AddVehicleScreen';
import PromotionDetailsScreen from '../screens/rewards/PromotionDetails';
import PromotionsScreen from '../screens/rewards/PromotionsScreen';
import AuthStack from './AuthStack';



const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SupportScreen"
        component={SupportStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowroomsScreen"
        component={ShowroomsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationSettingsScreen"
        component={NotificationSettingsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ServiceStack"
        component={ServiceStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="MyBookingScreen" component={MyBookingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BookingStack" component={BookingStack} />
      <Stack.Screen name="ProfileStack" component={ProfileStack} />
      <Stack.Screen name="RewardStack" component={RewardStack} />
      <Stack.Screen name="PromotionDetails" component={PromotionDetailsScreen}/>
      <Stack.Screen name="PromotionsScreen" component={PromotionsScreen}/>
      <Stack.Screen name="AuthStack" component={AuthStack}/>

      <Stack.Screen
        name="AddVehicleScreen"
        component={AddVehicleScreen}
        options={{ headerShown: false }}
      />


    </Stack.Navigator>
  );
}