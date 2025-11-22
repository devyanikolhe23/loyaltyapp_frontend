import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import { API_BASE } from '@env';
const BASE_URL = `${API_BASE}`;
const VerifyOTPScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [code, setCode] = useState('');

  const handleVerify = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/verify-code/`, { email, code });

    const { uid, token } = res.data;

    Alert.alert(
      "Success",
      "Verification successful!",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("ResetPassword", { uid, token })
        }
      ]
    );

  } catch (error) {
    Alert.alert("Error", error.response?.data?.error || "Invalid verification code.");
  }
};

  return (
    <ImageBackground source={require('../../assets/images/bg.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Verify Code</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Code"
          placeholderTextColor="#a0a0a0"
          keyboardType="numeric"
          value={code}
          onChangeText={setCode}
        />

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.footerText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 15,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#3498db',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    color: '#3498db',
    fontSize: 15,
  },
});

export default VerifyOTPScreen;
