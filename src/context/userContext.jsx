import { createContext, useState, useEffect, useCallback } from "react";
import { profile } from "@/service/authService";

export const UserContext = createContext({ user: null });

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const updateUser = useCallback(({ user }) => {
    setUser(user);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await profile()
        setUser(response);
      } catch (error) {
      }
    }

    fetchUser();
  }, []);

  return (
    <UserContext value={{ user, updateUser }}>
      {children}
    </UserContext>
  );
}