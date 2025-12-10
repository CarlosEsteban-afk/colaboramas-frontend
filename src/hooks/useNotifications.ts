import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "expo-router";
import messaging from "@react-native-firebase/messaging";
import api from "../../client";
import { Platform } from "react-native";

export const useNotifications = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Request user permission for notifications
    const requestUserPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log("Notification permission status:", authStatus);
          await getFcmToken();
        } else {
          console.log("Notification permission denied");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    };

    const getFcmToken = async () => {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log("FCM Token:", fcmToken);
          // Send token to backend
          try {
            // Then use it in your code:
            await api.post("/notifications/register-token", {
              firebaseToken: fcmToken,
              platform: Platform.OS === "ios" ? "ios" : "android",
            });
            console.log("FCM Token registered with backend successfully");
          } catch (err) {
            console.error("Failed to register token with backend:", err);
          }
        } else {
          console.log("Failed to get FCM token");
        }
      } catch (error) {
        console.error("Error fetching FCM token:", error);
      }
    };

    requestUserPermission();

    // Listen for incoming notifications (foreground)
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      console.log("Notification received in foreground:", remoteMessage);
    });

    // Listen for notifications opened in background
    const unsubscribeBackground = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("Notification opened from background state:", remoteMessage);
      if (remoteMessage?.data?.screen) {
        router.push(remoteMessage.data.screen as any);
      }
    });

    // Handle notification that caused app to open from quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("Notification caused app to open from quit state:", remoteMessage);
          if (remoteMessage?.data?.screen) {
            router.push(remoteMessage.data.screen as any);
          }
        }
      });

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
  }, [isAuthenticated, router]);
};
