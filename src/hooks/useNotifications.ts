import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { useAuth } from "./useAuth";
import { useRouter } from "expo-router";
import api from "../../client";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const useNotifications = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Request permissions
    const requestPermissions = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("Notification permissions not granted");
          return;
        }

        // Get Expo push token
        const token = await Notifications.getExpoPushTokenAsync();
        console.log("Expo Push Token:", token.data);

        // Send token to backend
        try {
          await api.post("/notifications/register-token", {
            expoPushToken: token.data,
          });
          console.log("Token registered with backend successfully");
        } catch (err) {
          console.error("Failed to register token with backend:", err);
        }
      } catch (err) {
        console.error("Error requesting notification permissions:", err);
      }
    };

    requestPermissions();

    // Listen for incoming notifications (while app is foreground)
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received in foreground:", notification);
      }
    );

    // Listen for notification responses (user tapped notification)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification tapped:", response);
        
        const data = response.notification.request.content.data;
        
        // Handle navigation based on notification data
        if (data && data.screen) {
          console.log("Navigating to:", data.screen);
          router.push(data.screen as any);
        }
      }
    );

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, [isAuthenticated, router]);
};
