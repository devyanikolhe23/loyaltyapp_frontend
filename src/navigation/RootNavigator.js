import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceEventEmitter } from "react-native";
import DrawerNavigator from "./DrawerNavigator";
import AuthStack from "./AuthStack";

export default function RootNavigator() {
  const [userStatus, setUserStatus] = useState(null); 
  // null = checking, "loggedIn" = logged in, "guest" = guest, "none" = not logged in

  const checkLoginStatus = async () => {
    const user = await AsyncStorage.getItem("user");
    const guest = await AsyncStorage.getItem("guest");

    if (user) setUserStatus("loggedIn");
    else if (guest === "true") setUserStatus("guest");
    else setUserStatus("none");
  };

  useEffect(() => {
    checkLoginStatus();

    const loginSub = DeviceEventEmitter.addListener("userLoggedIn", checkLoginStatus);
    const logoutSub = DeviceEventEmitter.addListener("userLoggedOut", checkLoginStatus);
    const authSub = DeviceEventEmitter.addListener("showAuthStack", () => setUserStatus("none"));

    return () => {
      loginSub.remove();
      logoutSub.remove();
      authSub.remove();
    };
  }, []);

  if (userStatus === null) return null; // optional splash

  return (
    <NavigationContainer>
      {userStatus === "loggedIn" || userStatus === "guest" ? (
        <DrawerNavigator />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}






// import React, { useState, useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { DeviceEventEmitter } from "react-native";
// import DrawerNavigator from "./DrawerNavigator";
// import AuthStack from "./AuthStack";

// export default function RootNavigator() {
//   const [isLoggedIn, setIsLoggedIn] = useState(null);

//   // ✅ Check login on app start
//   const checkLoginStatus = async () => {
//     const user = await AsyncStorage.getItem("user");
//     setIsLoggedIn(!!user);
//   };

//   // const checkLoginStatus = async () => {
//   //   const user = await AsyncStorage.getItem("user");
//   //   const guest = await AsyncStorage.getItem("guest");

//   //   if (guest === "true") {
//   //     setIsLoggedIn(false); // guest is NOT logged in
//   //     return;
//   //   }

//   //   setIsLoggedIn(!!user);
//   // };


//   useEffect(() => {
//     checkLoginStatus();

//     // ✅ Listen when login happens
//     const subscription = DeviceEventEmitter.addListener("userLoggedIn", () => {
//       checkLoginStatus(); // Update state instantly
//     });

//     // ✅ Listen when logout happens
//     const logoutSub = DeviceEventEmitter.addListener("userLoggedOut", () => {
//       setIsLoggedIn(false);
//     });

//     return () => {
//       subscription.remove();
//       logoutSub.remove();
//     };
//   }, []);

//   if (isLoggedIn === null) return null; // optional splash screen

//   return (
//     <NavigationContainer>
//       {isLoggedIn ? <DrawerNavigator /> : <AuthStack />}
//     </NavigationContainer>
//   );

// }