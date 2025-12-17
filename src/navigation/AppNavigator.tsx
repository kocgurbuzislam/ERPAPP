import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import DocumentPreviewScreen from '../screens/DocumentPreviewScreen';
import { RootStackParamList } from './RootNavigation';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen
        name="DocumentPreview"
        component={DocumentPreviewScreen}
        options={{ presentation: 'transparentModal' }}
      />
    </Stack.Navigator>
  );
}
