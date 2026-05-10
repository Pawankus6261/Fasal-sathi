import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// 1. App jab open ho tab bhi notification dikhe aur SOUND baje
// 1. App jab open ho tab bhi notification dikhe aur SOUND baje
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true, 
    shouldSetBadge: true,
    shouldShowBanner: true, // 🚀 YE NAYA ADD KIYA HAI
    shouldShowList: true,   // 🚀 YE BHI NAYA ADD KIYA HAI
  }),
});

// 2. Permissions mangna aur Android ke liye Channel set karna (Sound ke liye zaroori)
export async function setupNotifications() {
  if (Platform.OS === 'android') {
    // Android 8.0+ mein sound bajane ke liye Channel banana zaroori hai
    await Notifications.setNotificationChannelAsync('fasal-alerts', {
      name: 'Fasal Alerts',
      importance: Notifications.AndroidImportance.MAX, // Max importance se screen on ho jayegi
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#10b981',
      sound: 'default', // 🚀 Default notification sound baje
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
      console.log('Failed to get push token for push notification!');
      return false;
    }
    return true;
  }
  return false;
}

// 3. Notification Bhejne ka function
export async function sendAlertNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: 'default', // 🚀 Sound trigger hoga
      color: '#10b981', // Icon ka background color green hoga
    },
    trigger: null, // null matlab turant bhejo (Immediately)
  });
}