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
import axios from 'axios';
import { DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.8:8000/api/login/', {
        username: username.trim(),
        password: password,
      });
       console.log('Login API Response:', response.data);

       const {access,refresh, user} =response.data;

      console.log('Login Success:', response.data);
      Alert.alert('Success', 'Login successful!', [
        {
          text: 'OK',
          onPress: async () => {

            if (response?.data?.user) {
              await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
            } else {
              console.warn('⚠️ No user data found in login response');
              await AsyncStorage.setItem('user', JSON.stringify({ loggedIn: true }));
            }
            DeviceEventEmitter.emit('userLoggedIn');
            navigation.getParent()?.navigate('Home');
          },
        },
      ]);

    } catch (error) {
      console.log('Login Error:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Network or server error');
    } finally {
      setLoading(false);
    }
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

        {/* Forgot Password */}
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('Home')} // Continue as guest
            activeOpacity={0.7}
          >
            <Text style={styles.footerText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

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