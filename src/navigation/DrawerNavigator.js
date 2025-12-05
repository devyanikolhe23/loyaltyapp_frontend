import { Alert, DeviceEventEmitter } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useState, useEffect } from "react";
import ProfileScreen from "../screens/user/ProfileScreen";
import ProfileStack from "./ProfileStack";
import ServiceStack from "./ServiceStack";
import BookingStack from "./BookingStack";
import SupportStack from "./SupportStack";
import BottomTabs from "./BottomTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RewardsStack from "./RewardsStack";
import { useNavigation } from "@react-navigation/native";
import { API_BASE } from "@env";

const BASE_URL = `${API_BASE}`;
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = async () => {
    const user = await AsyncStorage.getItem("user");
    setIsLoggedIn(!!user);
  };

  useEffect(() => {
    checkLogin();
    const loginSub = DeviceEventEmitter.addListener("userLoggedIn", checkLogin);
    const logoutSub = DeviceEventEmitter.addListener("userLoggedOut", checkLogin);

    return () => {
      loginSub.remove();
      logoutSub.remove();
    };
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(["user", "access", "refresh", "guest"]);
    DeviceEventEmitter.emit("userLoggedOut");
  };

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerActiveTintColor: "#007AFF" }}
    >
      {/* Always visible */}
      <Drawer.Screen name="Home" component={BottomTabs} />
      <Drawer.Screen name="Profile" component={ProfileStack} options={{ drawerLabel: "Profile" }} />
      <Drawer.Screen name="Services" component={ServiceStack} />
      <Drawer.Screen name="Support" component={SupportStack} />
      <Drawer.Screen name="Coupons" component={RewardsStack} />

      {/* After login */}
      {isLoggedIn && (
        <>
          {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
          <Drawer.Screen name="Bookings" component={BookingStack} />
        </>
      )}

      {/* Guest → Login */}
      {!isLoggedIn && (
        <Drawer.Screen
          name="Login"
          component={() => null}
          options={{ drawerLabel: "Login" }}
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault();
              // Tell RootNavigator to render AuthStack
              DeviceEventEmitter.emit("showAuthStack");
            },
          }}
        />
      )}

      {/* Logged-in → Logout */}
      {isLoggedIn && (
        <Drawer.Screen
          name="Logout"
          component={() => null}
          options={{ drawerLabel: "Logout" }}
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault();
              handleLogout();
            },
          }}
        />
      )}
    </Drawer.Navigator>
  );
}




// import { Alert, DeviceEventEmitter } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import React, { useState, useEffect } from 'react';
// import ProfileScreen from '../screens/user/ProfileScreen';
// import ServicesStack from './ServiceStack';
// import BookingStack from './BookingStack';
// import SupportStack from './SupportStack';
// import BottomTabs from './BottomTabs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import RewardsStack from './RewardsStack';

// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   const navigation = useNavigation();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check login status (user OR guest)
//   const checkLogin = async () => {
//     const user = await AsyncStorage.getItem("user");
//     const guest = await AsyncStorage.getItem("guest");

//     setIsLoggedIn(!!user);       // logged in only if user exists
//   };

//   useEffect(() => {
//     checkLogin();

//     const loginSub = DeviceEventEmitter.addListener("userLoggedIn", checkLogin);
//     const logoutSub = DeviceEventEmitter.addListener("userLoggedOut", () => {
//       setIsLoggedIn(false);
//     });

//     return () => {
//       loginSub.remove();
//       logoutSub.remove();
//     };
//   }, []);

//   // ---------------------------
//   // LOGOUT FUNCTION
//   // ---------------------------
//   const handleLogout = async () => {
//     Alert.alert("Logout", "Are you sure you want to logout?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Logout",
//         onPress: async () => {
//           try {
//             const accessToken = await AsyncStorage.getItem("access");
//             const refreshToken = await AsyncStorage.getItem("refresh");

//             if (accessToken && refreshToken) {
//               await axios.post(
//                 "http://192.168.1.15:8000/api/logout/",
//                 { refresh: refreshToken },
//                 { headers: { Authorization: `Bearer ${accessToken}` } }
//               );
//             }

//             await AsyncStorage.multiRemove(["user", "access", "refresh"]);
//             DeviceEventEmitter.emit("userLoggedOut");

//             navigation.reset({
//               index: 0,
//               routes: [{ name: "AuthStack", params: { screen: "Login" } }],
//             });

//           } catch (err) {
//             await AsyncStorage.multiRemove(["user", "access", "refresh"]);
//             DeviceEventEmitter.emit("userLoggedOut");

//             navigation.reset({
//               index: 0,
//               routes: [{ name: "AuthStack", params: { screen: "Login" } }],
//             });
//           }
//         },
//       },
//     ]);
//   };

//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerActiveTintColor: '#007AFF',
//         drawerInactiveTintColor: '#333',
//       }}
//     >
//       {/* Always Visible */}
//       <Drawer.Screen name="Home" component={BottomTabs} />
//       <Drawer.Screen name="Services" component={ServicesStack} />
//       <Drawer.Screen name="Support" component={SupportStack} />
//       <Drawer.Screen name="Coupons" component={RewardsStack} />

//       {/* Visible only after login */}
//       {isLoggedIn && (
//         <>
//           <Drawer.Screen name="Profile" component={ProfileScreen} />
//           <Drawer.Screen name="Bookings" component={BookingStack} />
//         </>
//       )}

//       {/* Show LOGIN when NOT logged in (guest mode) */}
//       {!isLoggedIn && (
//         <Drawer.Screen
//           name="Login"
//           component={() => null}
//           options={{ drawerLabel: "Login" }}
//           listeners={{
//             drawerItemPress: (e) => {
//               e.preventDefault();
//               navigation.navigate("AuthStack", { screen: "Login" });
//             },
//           }}
//         />
//       )}

//       {/* Show LOGOUT when logged in */}
//       {isLoggedIn && (
//         <Drawer.Screen
//           name="Logout"
//           component={() => null}
//           options={{ drawerLabel: "Logout" }}
//           listeners={{
//             drawerItemPress: (e) => {
//               e.preventDefault();
//               handleLogout();
//             },
//           }}
//         />
//       )}
//     </Drawer.Navigator>
//   );
// }
