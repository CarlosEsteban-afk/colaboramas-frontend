import { useEffect } from "react";
import { useRouter } from "expo-router";
import "./global.css";
export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, []);

  return null;
}
