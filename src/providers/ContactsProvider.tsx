import React, { createContext, useEffect, useState } from "react";
import api from "../../client";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";
//import useRealtimeNotifications from "../hooks/useRealTimeNotifications";

export const ContactsContext = createContext(undefined);

export const ContactsProvider = ({ children }) => {
  const { user } = useUser();
  const { isAuthenticated } = useAuth();
  const userId = user?.id;

  const [sentMessages, setSentMessages] = useState<any[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<any[]>([]);
  const [repliedMessages, setRepliedMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  const loadMessages = async () => {
    if (!isAuthenticated || !userId) return;

    setLoading(true);
    setError(null);

    try {
      const [sentRes, recRes] = await Promise.all([
        api.get(`/messages/sent/${userId}`),
        api.get(`/messages/received/${userId}`),
      ]);

      const sent = sentRes.data;
      const received = recRes.data;

      setSentMessages(sent.filter((m) => m.status === "pending"));
      setReceivedMessages(received.filter((m) => m.status === "pending"));
      setRepliedMessages([
        ...received.filter((m) => m.status !== "pending"),
        ...sent.filter((m) => m.status !== "pending"),
      ]);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Error desconocido"
      );
    } finally {
      setLoading(false);
    }
  };

  /*useRealtimeNotifications(userId, (newMessage) => {
    console.log("Nueva notificación:", newMessage);
    setReceivedMessages((prev) => [newMessage, ...prev]);
  });*/
  useEffect(() => {
    if (isAuthenticated && userId) {
      loadMessages();
    } else {
      setSentMessages([]);
      setReceivedMessages([]);
      setRepliedMessages([]);
    }
  }, [isAuthenticated, userId]);

  const sendMessage = async (payload: any) => {
    if (!isAuthenticated || !userId) return;
    try {
      await api.post(`/messages/send`, payload);
      await loadMessages(); // actualizar lista enviada
    } catch (err) {
      console.error("Error enviando mensaje:", err);
    }
  };

  const respondToMessage = async (id: string, accepted: boolean) => {
    if (!isAuthenticated || !userId) return;
    const status = accepted ? "accepted" : "rejected";
    try {
      await api.put(`/messages/${id}/respond?status=${status}`);
      await loadMessages(); // actualizar listas
    } catch (err) {
      console.error("Error respondiendo mensaje:", err);
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        sentMessages,
        receivedMessages,
        repliedMessages,
        notifications,
        setNotifications,
        sendMessage,
        respondToMessage,
        reloadMessages: loadMessages,
        loading,
        error,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
