import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/home_dashboard';
import BookingServiceScreen from '../screens/booking/BookingServiceScreen';
const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BookingServiceScreen" component={BookingServiceScreen

      } />
    </Stack.Navigator>
  );
}
