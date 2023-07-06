// App.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomePage from './HomePage';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        {/* Add other screens and navigations as needed */}
      </Stack.Navigator>
    
  );
};

export default App;
