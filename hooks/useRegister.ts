import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { useAuth } from "./useAuth";
export default function useRegister() {
  const { registerUser } = useUser();     
  const { signIn } = useAuth();           

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors(prev => ({
      ...prev,
      email: email.length > 0 && !emailRegex.test(email) ? "Correo inválido" : "",
      password:
        password.length > 0 && password.length < 6
          ? "La contraseña debe tener al menos 6 caracteres"
          : confirmPassword.length > 0 && password !== confirmPassword
          ? "Las contraseñas no coinciden"
          : "",
    }));
  }, [email, password, confirmPassword]);

  const handleRegister = async (): Promise<boolean> => {
    if (!errors.email && !errors.password && email && password && confirmPassword) {
      const success = await registerUser({ name, email, password });
      if (success) await signIn(); 
      return success;
    }
    return false;
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    handleRegister,
  };
}
