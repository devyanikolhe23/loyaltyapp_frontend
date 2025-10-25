import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProfileScreen from '../screens/user/ProfileScreen';
import ServicesStack from './ServiceStack';
import BookingStack from './BookingStack';
import SupportStack from './SupportStack';
import BottomTabs from './BottomTabs';
import RegisterScreen from '../screens/user/RegisterScreen';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // hide default header because we use custom Header.js
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen name="Home" component={BottomTabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Services" component={ServicesStack} />
      <Drawer.Screen name="Bookings" component={BookingStack} />
      <Drawer.Screen name="Support" component={SupportStack} />
      <Drawer.Screen name="Register" component={RegisterScreen} />
      

    </Drawer.Navigator>
  );
}
