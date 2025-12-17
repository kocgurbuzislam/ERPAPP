import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, Alert } from 'react-native';

export async function registerForPushNotificationsAsync() {
  let token: string | undefined;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Bildirim izni yok', 'Push notification izni alinmadi.');
      return;
    }

    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo Push Token:', token);
    } catch (e) {
      console.error('Token alinirken hata:', e);
    }
  } else {
    console.log('Emulatorde push token alinmaz.');
  }

  return token;
}

export async function schedulePushNotification(title: string, body: string, data: any = {}) {
  try {
    console.log('Bildirim planlaniyor:', title);
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: null,
    });
    console.log('Bildirim basariyla planlandi, ID:', identifier);
    return identifier;
  } catch (error) {
    console.error('Bildirim planlanirken hata olustu:', error);
    Alert.alert('Bildirim hatasi', String(error));
  }
}
