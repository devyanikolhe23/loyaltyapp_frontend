
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceEventEmitter } from "react-native";
import DrawerNavigator from "./DrawerNavigator";
import AuthStack from "./AuthStack";

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // ✅ Check login on app start
  const checkLoginStatus = async () => {
    const user = await AsyncStorage.getItem("user");
    setIsLoggedIn(!!user);
  };

  useEffect(() => {
    checkLoginStatus();

    // ✅ Listen when login happens
    const subscription = DeviceEventEmitter.addListener("userLoggedIn", () => {
      checkLoginStatus(); // Update state instantly
    });

    // ✅ Listen when logout happens
    const logoutSub = DeviceEventEmitter.addListener("userLoggedOut", () => {
      setIsLoggedIn(false);
    });

    return () => {
      subscription.remove();
      logoutSub.remove();
    };
  }, []);

  if (isLoggedIn === null) return null; // optional splash screen

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}


