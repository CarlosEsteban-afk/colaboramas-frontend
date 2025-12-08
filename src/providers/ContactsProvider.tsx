import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../client";
import { useUser } from "../hooks/useUser";

export const ContactsContext = createContext(undefined);

export const ContactsProvider = ({ children }) => {
  console.log("ContactsProvider cargado");
  const { user } = useUser();
  const userId = user?.id;

  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [repliedMessages, setRepliedMessages] = useState([]);

  const loadMessages = async () => {
    if (!userId) return;

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
  };

useEffect(() => {
  //loadMessages();
}, [userId]);

  const sendMessage = async (payload) => {
    await api.post(`/messages/send`, payload);
    await loadMessages();
  };

  const respondToMessage = async (id, accepted) => {
    const status = accepted ? "accepted" : "rejected";
    await api.put(`/messages/${id}/respond?status=${status}`);
    await loadMessages();
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
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};
