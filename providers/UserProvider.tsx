import React, { createContext, ReactNode, useState } from "react";

interface User {
  id?: number;
  name: string;
  email: string;
}

interface UserContextType {
  user?: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
