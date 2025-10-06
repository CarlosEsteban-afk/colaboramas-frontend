// app/hooks/useRegister.tsx
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function useRegister() {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Validación en tiempo real
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

  const handleRegister = (): boolean => {
    if (!errors.email && !errors.password && email && password && confirmPassword) {
      const success = register({ name, email, password });
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
