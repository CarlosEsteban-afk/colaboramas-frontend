import React, { createContext, useEffect, useState } from "react";
import api from "../../client";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth"; // Asegúrate de tener este hook

export const ContactsContext = createContext(undefined);

export const ContactsProvider = ({ children }) => {
  const { user } = useUser();
  const { isAuthenticated } = useAuth(); // Agrega esta línea
  const userId = user?.id;

  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [repliedMessages, setRepliedMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = async () => {
    if (!isAuthenticated || !userId) {
      console.log("No autenticado o sin userId, omitiendo carga de mensajes");
      return;
    }

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
      console.error("Error cargando mensajes:", err);
      setError(
        err.response?.data?.message || err.message || "Error desconocido"
      );
    } finally {
      setLoading(false);
    }
  };

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
    if (!isAuthenticated || !userId) {
      console.error("Usuario no autenticado");
      return;
    }
    try {
      await api.post(`/messages/send`, payload);
      await loadMessages();
    } catch (err) {
      console.error("Error enviando mensaje:", err);
    }
  };

  const respondToMessage = async (id: string, accepted: boolean) => {
    if (!isAuthenticated || !userId) {
      console.error("Usuario no autenticado");
      return;
    }
    const status = accepted ? "accepted" : "rejected";
    try {
      await api.put(`/messages/${id}/respond?status=${status}`);
      await loadMessages();
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