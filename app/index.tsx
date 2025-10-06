// @@iconify-code-gen
import React from "react";
import { Redirect } from "expo-router";
import "./global.css";
import { AuthProvider } from "./context/AuthContext";

 export default function Index() {
  return (
    // eslint-disable-next-line react/no-children-prop
    <AuthProvider children={""}>
      <Redirect href="/auth/login" />
    </AuthProvider>
  );
}