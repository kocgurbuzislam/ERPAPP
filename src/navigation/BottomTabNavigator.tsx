import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator();

// ERP Site URL
const ERP_SITE_URL = 'https://www.google.com';


function EmptyScreen() {
    return null;
}

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#3B6FE8', 
                tabBarInactiveTintColor: '#9AA5B1', 
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: '#E5E7EB',
                    backgroundColor: '#FFFFFF',
                    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
                    paddingTop: 10,
                    height: Platform.OS === 'ios' ? 95 : 75,
                },
                headerStyle: {
                    backgroundColor: '#F3F4F6', 
                    elevation: 0, 
                    shadowOpacity: 0, 
                },
                headerTitleStyle: {
                    fontWeight: '600',
                    fontSize: 18,
                    color: '#111827',
                },
                headerShadowVisible: false,
            }}
        >
            <Tab.Screen
                name="NotificationsTab"
                component={NotificationsScreen}
                options={{
                    title: 'Bildirimler',
                    tabBarLabel: 'Bildirimler',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? "notifications" : "notifications-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="ERPSite"
                component={EmptyScreen}
                options={{
                    title: 'ERP Portal',
                    tabBarLabel: 'ERP Portal',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="globe-outline" size={24} color={color} />
                    ),
                }}
                listeners={{
                    tabPress: (e) => {
                        // Disable tab navigation
                        e.preventDefault();
                        // Open URL in browser
                        Linking.openURL(ERP_SITE_URL).catch((err) =>
                            console.error("Link açılamadı:", err)
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}
