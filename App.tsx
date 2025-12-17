import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import AppNavigator from './src/navigation/AppNavigator';
import { client } from './src/graphql/client';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef } from 'react';
import { registerForPushNotificationsAsync } from './src/services/NotificationService';
import { navigationRef, navigate } from './src/navigation/RootNavigation';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['expo-notifications']);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    const initNotifications = async () => {
      try {
        await registerForPushNotificationsAsync();
      } catch (e) {
        console.log("Notification init error:", e);
      }
    };
    initNotifications();
  
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data as { type?: string; documentId?: string };
      if (data?.type === 'DOCUMENT_VIEW' && typeof data.documentId === 'string') {
        navigate('DocumentPreview', { documentId: data.documentId });
      }
    });

    return () => {
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
