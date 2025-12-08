import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export default function useRegister() {
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setErrors({
      name:
        touched.name && name.trim().length === 0
          ? "El nombre es obligatorio"
          : "",
      email:
        touched.email && !emailRegex.test(email)
          ? "Correo inválido"
          : "",
      password:
        touched.password && password.length < 6
          ? "La contraseña debe tener al menos 6 caracteres"
          : "",
      confirmPassword:
        touched.confirmPassword && confirmPassword !== password
          ? "Las contraseñas no coinciden"
          : "",
    });
  }, [name, email, password, confirmPassword, touched]);

  const handleRegister = async (roles: string[]): Promise<boolean> => {
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.confirmPassword ||
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return false;
    }

    return await signUp(name, email, password, roles);
  };

  return {
    name,
    setName: (v: string) => {
      setName(v);
      setTouched(prev => ({ ...prev, name: true }));
    },
    email,
    setEmail: (v: string) => {
      setEmail(v);
      setTouched(prev => ({ ...prev, email: true }));
    },
    password,
    setPassword: (v: string) => {
      setPassword(v);
      setTouched(prev => ({ ...prev, password: true }));
    },
    confirmPassword,
    setConfirmPassword: (v: string) => {
      setConfirmPassword(v);
      setTouched(prev => ({ ...prev, confirmPassword: true }));
    },
    errors,
    handleRegister,
  };
}
