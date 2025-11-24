import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { uid, token } = route.params; // ✅ Coming from OTP screen

  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleResetPassword = async () => {
    if (newPassword !== confirmPass) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      await axios.post('http://192.168.1.8:8000/api/password-reset/confirm/', {
        uid,
        token,
        new_password: newPassword,
        confirm_password: confirmPass,
      });

      Alert.alert("Success", "Password updated successfully.");
      navigation.navigate("Login");

    } catch (error) {
      const msg = error.response?.data?.error || "Something went wrong.";
      Alert.alert("Error", msg);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/bg.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Reset Password</Text>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#a0a0a0"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor="#a0a0a0"
          secureTextEntry
          value={confirmPass}
          onChangeText={setConfirmPass}
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  container: { backgroundColor: 'rgba(255,255,255,0.85)', padding: 22, borderRadius: 12, width: '90%', alignItems: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: "#000" },
  input: { width: '100%', height: 50, color:'#000', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 15, paddingLeft: 15, backgroundColor: '#fff' },
  button: { backgroundColor: '#3498db', paddingVertical: 14, borderRadius: 8, width: '100%', alignItems: "center" },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default ResetPasswordScreen;
