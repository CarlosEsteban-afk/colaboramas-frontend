// @@iconify-code-gen
import React from "react";
import { Redirect } from "expo-router";
import "./global.css";
import { AuthProvider } from "./context/AuthContext";

 export default function Index() {
  return (
    <AuthProvider>
      <Redirect href="/auth/login" />
    </AuthProvider>
  );
}