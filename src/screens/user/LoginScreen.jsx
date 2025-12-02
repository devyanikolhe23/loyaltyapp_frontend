import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { navRef } from "../../navigation/navigationRef";
import axios from 'axios';
import { DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '@env';
const BASE_URL = `${API_BASE}`;

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  // ---------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setLoading(true);

  try {
    const response = await axios.post(`${BASE_URL}/api/login/`, {
      username: username.trim(),
      password: password,
    });

      const access = response.data.tokens.access;
      const refresh = response.data.tokens.refresh;
      const user = response.data.user;

      await AsyncStorage.setItem("access", access);
      await AsyncStorage.setItem("refresh", refresh);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.removeItem("guest"); // remove guest flag if exists

      DeviceEventEmitter.emit("userLoggedIn");

      Alert.alert("Success", "Login successful!");

      // 🔥 IMPORTANT: navigate using parent navigator (RootNavigator)
      navigation.getParent()?.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });

    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };


  // ---------------------------------------------------------
  // CONTINUE AS GUEST
  // ---------------------------------------------------------
  const handleGuest = async () => {
    await AsyncStorage.multiRemove(["user", "access", "refresh"]);
    await AsyncStorage.setItem("guest", "true");

    DeviceEventEmitter.emit("userLoggedOut"); // triggers RootNavigator to re-render
  };

return (
  <ImageBackground
    source={require('../../assets/images/bg.jpeg')}
    style={styles.background}
  >
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <Text style={styles.subHeader}>Sign in to continue your journey</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#a0a0a0"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a0a0a0"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.footerText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={handleGuest}
          activeOpacity={0.7}
        >
          <Text style={styles.footerText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>

    </View>
  </ImageBackground>
);
};



// ---------------------------------------------------------
// STYLES
// ---------------------------------------------------------
const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  header: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subHeader: { fontSize: 16, color: '#777', marginBottom: 30, textAlign: 'center' },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    color: 'black',
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotPasswordText: { color: '#3498db' },
  button: {
    backgroundColor: '#3498db',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  footerText: { color: '#3498db', fontSize: 16 },
});

export default LoginScreen;



// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
//   Alert,
// } from 'react-native';
// import axios from 'axios';
// import { DeviceEventEmitter } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);


//   const handleLogin = async () => {
//     if (!username || !password) {
//       Alert.alert("Error", "Please enter both username and password");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post("http://192.168.1.15:8000/api/login/", {
//         username: username.trim(),
//         password: password,
//       });

//       const access = response.data.tokens.access;
//       const refresh = response.data.tokens.refresh;
//       const user = response.data.user;

//       await AsyncStorage.setItem("access", access);
//       await AsyncStorage.setItem("refresh", refresh);
//       await AsyncStorage.setItem("user", JSON.stringify(user));

//       // 🚀 Notify drawer to switch Login -> Logout
//       DeviceEventEmitter.emit("userLoggedIn");

//       Alert.alert("Success", "Login successful!");

//       // ✅ Redirect to Home immediately
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "Home" }],
//       });

//     } catch (error) {
//       Alert.alert("Error", error.response?.data?.message || "Invalid Credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/images/bg.jpeg')}
//       style={styles.background}
//     >
//       <View style={styles.container}>
//         <Text style={styles.header}>Welcome Back</Text>
//         <Text style={styles.subHeader}>Sign in to continue your journey</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           placeholderTextColor="#a0a0a0"
//           value={username}
//           onChangeText={setUsername}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#a0a0a0"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />

//         {/* Forgot Password */}
//         <TouchableOpacity
//           style={styles.forgotPassword}
//           onPress={() => navigation.navigate('ForgotPassword')}
//         >
//           <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//         </TouchableOpacity>

//         {/* Login Button */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>
//             {loading ? 'Logging in...' : 'Login'}
//           </Text>
//         </TouchableOpacity>

//         {/* Footer Section */}
//         <View style={styles.footer}>
//           <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//             <Text style={styles.footerText}>Register</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.footerButton}
//             onPress={async () => {
//               await AsyncStorage.removeItem("user");     // make sure NO user stored
//               await AsyncStorage.removeItem("access");
//               await AsyncStorage.removeItem("refresh");

//               await AsyncStorage.setItem("guest", "true");

//               DeviceEventEmitter.emit("userLoggedOut"); // tell app you're not logged in

//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: "DrawerNavigator" }],
//               });

//             }}
//             activeOpacity={0.7}
//           >
//             <Text style={styles.footerText}>Continue as Guest</Text>
//           </TouchableOpacity>


//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     padding: 20,
//     borderRadius: 10,
//     width: '90%',
//     alignItems: 'center',
//   },
//   header: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
//   subHeader: { fontSize: 16, color: '#777', marginBottom: 30, textAlign: 'center' },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     color: 'black',
//     borderColor: '#ddd',
//     borderRadius: 8,
//     marginBottom: 15,
//     paddingLeft: 15,
//     backgroundColor: '#fff',
//   },
//   forgotPassword: { alignSelf: 'flex-end', marginBottom: 20 },
//   forgotPasswordText: { color: '#3498db' },
//   button: {
//     backgroundColor: '#3498db',
//     width: '100%',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
//   footer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
//   footerText: { color: '#3498db', fontSize: 16 },
// });

// export default LoginScreen;