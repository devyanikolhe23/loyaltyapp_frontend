// navigation/BottomTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from '../components/BottomBar';
import HomeStack from './HomeStack';  
import ServiceStack from './ServiceStack';
import BookingStack from './BookingStack';
import SupportStack from './SupportStack';
import ProfileStack from './ProfileStack';
import ShowroomsScreen from '../screens/showroom/ShowroomsScreen';
const Tab = createBottomTabNavigator();
const renderTabBar = (props) => <BottomBar {...props} />;

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={renderTabBar}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Services" component={ServiceStack} />
      <Tab.Screen name="Bookings" component={BookingStack} />
      <Tab.Screen name="Support" component={SupportStack} />
      <Tab.Screen name="Profile" component={ProfileStack} /> 
      <Tab.Screen name="Showroom" component={ShowroomsScreen} /> 
     

    </Tab.Navigator>
  );
}
