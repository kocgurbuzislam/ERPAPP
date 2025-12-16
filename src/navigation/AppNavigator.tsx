import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from './BottomTabNavigator';

import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

