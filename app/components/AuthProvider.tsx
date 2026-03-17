"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth } from "@/app/Firebase/Config";
import { User, onAuthStateChanged, signOut } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async (): Promise<void> => {
    try {
      // Sign out from Firebase
      await signOut(auth);

      // Clear local state
      setUser(null);
      setLoading(false);

      // Clear any local storage or session data
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("Auth state change error:", error);
        setUser(null);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
