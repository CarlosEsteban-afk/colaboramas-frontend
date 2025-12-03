/*import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useToken } from "./useToken";

export default function useRealtimeNotifications(
  userId: number,
  onMessage: (msg: any) => void
) {
  const token = useToken();

  useEffect(() => {
    if (!userId) return;

    const socket = new SockJS("http://localhost:8080/api/ws"); 
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    stompClient.onConnect = () => {
      console.log("Conectado a WebSocket!");
      stompClient.subscribe(`/topic/messages/${userId}`, (message) => {
        const data = JSON.parse(message.body);
        onMessage(data);
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [userId]);
}
*/