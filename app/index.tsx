import React from "react";
import { Redirect } from "expo-router";
import { AuthProvider } from "../providers/AuthProvider";
import { UserProvider } from "../providers/UserProvider";
import "./global.css";

export default function Index() {
  return (
    <AuthProvider>
      <UserProvider>
        <Redirect href="/auth/login" />
      </UserProvider>
    </AuthProvider>
  );
}
