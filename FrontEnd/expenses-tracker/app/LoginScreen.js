import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const BASE_URL = 'http://localhost:5000'; // Replace with your backend server address

if (Platform.OS == 'android'){
  BASE_URL = 'http://10.0.2.2:5000'
}

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation()

  const handleLogin = async () => {
    console.log(BASE_URL)
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage('Login successful.');
        navigation.navigate("HomePage",{ username })
        // Handle successful login, e.g., navigate to the home screen.
      }
    } catch (error) {
      setMessage('Invalid username or password.');
      console.error('Error during login:', error.message);
      // Handle the error here, e.g., show an error message to the user.
    }
  };

  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Username or Email"
      value={username}
      onChangeText={setUsername}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    <Text style={styles.message}>{message}</Text>

    <View style={styles.linkContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.linkText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.linkText}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    width: '80%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: '80%',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  message: {
    fontSize: 16,
    color: 'red',
  },
});

export default LoginScreen;
