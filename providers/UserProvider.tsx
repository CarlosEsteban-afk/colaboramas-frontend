import React, { createContext, useState, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  password: string;
}

interface UserContextType {
  user: User | null;
  users: User[];                        
  setUser: (user: User | null) => void;
  registerUser: (user: User) => Promise<boolean>;
}


export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]); // <- lista de usuarios

  const registerUser = async (newUser: User): Promise<boolean> => {
    const exists = users.some(u => u.email === newUser.email);
    if (exists) return false;

    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return true;
  };

  return (
    <UserContext.Provider value={{ user, users, setUser, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};

