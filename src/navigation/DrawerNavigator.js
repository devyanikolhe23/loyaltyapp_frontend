import { Alert, DeviceEventEmitter } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import ProfileScreen from '../screens/user/ProfileScreen';
import ServicesStack from './ServiceStack';
import BookingStack from './BookingStack';
import SupportStack from './SupportStack';
import BottomTabs from './BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const navigation = useNavigation(); // ✅ FIX
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!user);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('userLoggedIn', async () => {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!user);
    });
    return () => subscription.remove();
  }, []);

  // ✅ Logout Function (no drawerNav needed)
  const handleLogout = async (navigation) => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            const accessToken = await AsyncStorage.getItem("access");
            const refreshToken = await AsyncStorage.getItem("refresh");

            if (refreshToken && accessToken) {
              await axios.post(
                "http://192.168.1.16:8000/api/logout/",
                { refresh: refreshToken },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`, // ✅ REQUIRED
                  },
                }
              );
            }

            // ✅ Clear storage
            await AsyncStorage.multiRemove(["user", "access", "refresh"]);

            setIsLoggedIn(false);

            // ✅ Redirect to Login Screen
            navigation.reset({
              index: 0,
              routes: [{ name: "Auth", params: { screen: "Login" } }],
            });

          } catch (error) {
            console.log("Logout Error => ", error.response?.data || error);
            // ✅ Even if server fails, logout locally & redirect
            await AsyncStorage.multiRemove(["user", "access", "refresh"]);
            setIsLoggedIn(false);

            navigation.reset({
              index: 0,
              routes: [{ name: "Auth", params: { screen: "Login" } }],
            });
          }
        },
      },
    ]);
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen name="Home" component={BottomTabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Services" component={ServicesStack} />
      <Drawer.Screen name="Bookings" component={BookingStack} />
      <Drawer.Screen name="Support" component={SupportStack} />


      {!isLoggedIn && (
        <Drawer.Screen
          name="Login"
          component={() => null}
          options={{ drawerLabel: "Login" }}
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault();
              navigation.navigate("Auth", { screen: "Login" });
            },
          }}
        />
      )}

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









// import { DeviceEventEmitter, Alert } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import React, { useState, useEffect } from 'react';
// import ProfileScreen from '../screens/user/ProfileScreen';
// import ServicesStack from './ServiceStack';
// import BookingStack from './BookingStack';
// import SupportStack from './SupportStack';
// import BottomTabs from './BottomTabs';
// import AuthStack from './AuthStack';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // ✅ Check login status initially
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const user = await AsyncStorage.getItem('user');
//       setIsLoggedIn(!!user);
//     };
//     checkLoginStatus();
//   }, []);

//   useEffect(() => {
//     const subscription = DeviceEventEmitter.addListener('userLoggedIn', async () => {
//       const user = await AsyncStorage.getItem('user');
//       setIsLoggedIn(!!user);
//     });
//     return () => subscription.remove();
//   }, []);

//   // ✅ Logout handler (with API call)
//   // ✅ FIXED LOGOUT FUNCTION
//   const handleLogout = async (navigation) => {
//     Alert.alert("Logout", "Are you sure you want to logout?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Logout",
//         onPress: async () => {
//           try {
//             const refreshToken = await AsyncStorage.getItem("refreshToken");

//             if (refreshToken) {
//               await axios.post("http://192.168.1.8:8000/api/logout/", {
//                 refresh: refreshToken
//               });
//             }

//             // ✅ Remove correct stored tokens
//             await AsyncStorage.multiRemove(["user", "accessToken", "refreshToken"]);

//             setIsLoggedIn(false);

//             navigation.reset({
//               index: 0,
//               routes: [{ name: "Auth", params: { screen: "Login" } }],
//             });

//           } catch (error) {
//             console.log("Logout Error:", error.response?.data || error.message);
//             Alert.alert("Error", "Logout failed. Please try again.");
//           }
//         },
//       },
//     ]);
//   };


//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false, // hide default header because we use custom Header.js
//         drawerActiveTintColor: '#007AFF',
//         drawerInactiveTintColor: '#333',
//       }}
//     >
//       <Drawer.Screen name="Home" component={BottomTabs} />
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//       <Drawer.Screen name="Services" component={ServicesStack} />
//       <Drawer.Screen name="Bookings" component={BookingStack} />
//       <Drawer.Screen name="Support" component={SupportStack} />
//       {/* 👇 Conditional Login/Logout item */}
//       {isLoggedIn ? (
//         <Drawer.Screen
//           name="Logout"
//           component={() => null}
//           options={{
//             drawerLabel: 'Logout',
//           }}
//           listeners={({ navigation }) => ({
//             drawerItemPress: (e) => {
//               e.preventDefault(); // Stop navigation
//               handleLogout(navigation); // Call API + logout
//             },
//           })}
//         />
//       ) : (
//         <Drawer.Screen name="Login" component={AuthStack} />
//       )}


//     </Drawer.Navigator>
//   );
// }import { DeviceEventEmitter, Alert } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import React, { useState, useEffect } from 'react';
// import ProfileScreen from '../screens/user/ProfileScreen';
// import ServicesStack from './ServiceStack';
// import BookingStack from './BookingStack';
// import SupportStack from './SupportStack';
// import BottomTabs from './BottomTabs';
// import AuthStack from './AuthStack';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // ✅ Check login status initially
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const user = await AsyncStorage.getItem('user');
//       setIsLoggedIn(!!user);
//     };
//     checkLoginStatus();
//   }, []);

//   useEffect(() => {
//     const subscription = DeviceEventEmitter.addListener('userLoggedIn', async () => {
//       const user = await AsyncStorage.getItem('user');
//       setIsLoggedIn(!!user);
//     });
//     return () => subscription.remove();
//   }, []);

//   // ✅ Logout handler (with API call)
//   // ✅ FIXED LOGOUT FUNCTION
//   const handleLogout = async (navigation) => {
//     Alert.alert("Logout", "Are you sure you want to logout?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Logout",
//         onPress: async () => {
//           try {
//             const refreshToken = await AsyncStorage.getItem("refreshToken");

//             if (refreshToken) {
//               await axios.post("http://192.168.1.8:8000/api/logout/", {
//                 refresh: refreshToken
//               });
//             }

//             // ✅ Remove correct stored tokens
//             await AsyncStorage.multiRemove(["user", "accessToken", "refreshToken"]);

//             setIsLoggedIn(false);

//             navigation.reset({
//               index: 0,
//               routes: [{ name: "Auth", params: { screen: "Login" } }],
//             });

//           } catch (error) {
//             console.log("Logout Error:", error.response?.data || error.message);
//             Alert.alert("Error", "Logout failed. Please try again.");
//           }
//         },
//       },
//     ]);
//   };


//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false, // hide default header because we use custom Header.js
//         drawerActiveTintColor: '#007AFF',
//         drawerInactiveTintColor: '#333',
//       }}
//     >
//       <Drawer.Screen name="Home" component={BottomTabs} />
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//       <Drawer.Screen name="Services" component={ServicesStack} />
//       <Drawer.Screen name="Bookings" component={BookingStack} />
//       <Drawer.Screen name="Support" component={SupportStack} />
//       {/* 👇 Conditional Login/Logout item */}
//       {isLoggedIn ? (
//         <Drawer.Screen
//           name="Logout"
//           component={() => null}
//           options={{
//             drawerLabel: 'Logout',
//           }}
//           listeners={({ navigation }) => ({
//             drawerItemPress: (e) => {
//               e.preventDefault(); // Stop navigation
//               handleLogout(navigation); // Call API + logout
//             },
//           })}
//         />
//       ) : (
//         <Drawer.Screen name="Login" component={AuthStack} />
//       )}


//     </Drawer.Navigator>
//   );
// }