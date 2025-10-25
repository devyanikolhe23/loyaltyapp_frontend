// navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ServiceScreen from '../screens/services/ServiceScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import SupportStack from './SupportStack';
import PromotionsScreen from '../screens/rewards/PromotionsScreen';
import ShowroomsScreen from '../screens/showroom/ShowroomsScreen';
import PromotionsDetailsScreen from '../screens/rewards/PromotionDetails';

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
        name="PromotionsScreen" 
        component={PromotionsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="PromotionsDetails" 
        component={PromotionsDetailsScreen} 
        options={{ headerShown: false }} 
      />
       <Stack.Screen 
        name="ShowroomsScreen" 
        component={ShowroomsScreen} 
        options={{ headerShown: false }} 
      />
    
    </Stack.Navigator>
  );
}
