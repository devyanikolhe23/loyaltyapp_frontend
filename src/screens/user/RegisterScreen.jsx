import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !phone_number || !password || !confirm_password) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    const usernameRegex = /^[A-Za-z]+$/;
    if (!usernameRegex.test(username)) {
      Alert.alert('Error', 'Username must contain only letters.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Enter a valid email address.');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/; 
    if (!phoneRegex.test(phone_number)) {
      Alert.alert('Error', 'Phone number must contain 10 digits .');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Error',
        'Password must be at least 8 characters long and include both letters and numbers.'
      );
      return;
    }

    if (password.trim() !== confirm_password.trim()) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.8:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          phone_number,
          password,
          confirm_password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      } else {
        
        const errorMessage = Object.values(data).flat().join('\n');
        if (errorMessage.toLowerCase().includes('email')) {
          Alert.alert('Error', 'Email already exists.');
        } else {
          Alert.alert('Error', errorMessage);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Network error');
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg.jpeg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Create Account</Text>
        <Text style={styles.subHeader}>Join us to start your journey</Text>

        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#a0a0a0"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#a0a0a0"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone_number}
          onChangeText={setPhone_number}
          placeholderTextColor="#a0a0a0"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#a0a0a0"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirm_password}
          onChangeText={setConfirm_password}
          placeholderTextColor="#a0a0a0"
          secureTextEntry
        />

        <TouchableOpacity
          style={[
            styles.button,
            {
              opacity:
                username && email && phone_number && password && confirm_password ? 1 : 0.6,
            },
          ]}
          disabled={!username || !email || !phone_number || !password || !confirm_password}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerText}>Already have an account? Login</Text>
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
    marginBottom: 15,
    paddingLeft: 15,
    color: '#000000ff',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3498db',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
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

export default RegistrationScreen;
