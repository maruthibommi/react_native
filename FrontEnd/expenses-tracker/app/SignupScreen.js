import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace with your backend server address

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users`, {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setMessage('Signup successful.');
        // Handle successful signup, e.g., navigate to the login screen.
      }
    } catch (error) {
      setMessage('Username or Email already exists.');
      console.error('Error during signup:', error.message);
      // Handle the error here, e.g., show an error message to the user.
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
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

export default SignupScreen;
