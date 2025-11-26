// navigation/BookingStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyCouponsScreen from "../screens/rewards/MyCouponsScreen";
import PromotionsPage from "../screens/rewards/PromotionsScreen";
import ViewPromotionDetails from "../screens/rewards/ViewPromotionDetails";
import AuthStack from "./AuthStack";


const Stack = createNativeStackNavigator();

export default function RewardsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="MyCouponsScreen" component={MyCouponsScreen}/> */}
      <Stack.Screen name="AuthStack" component={AuthStack}/>
      <Stack.Screen name="PromotionsScreen" component={PromotionsPage} />
      <Stack.Screen
        name="ViewPromotionDetails"   // This name should match your navigate call
        component={ViewPromotionDetails}
        options={{ title: "Promotion Details" }}
      />


    </Stack.Navigator>
  );
}
