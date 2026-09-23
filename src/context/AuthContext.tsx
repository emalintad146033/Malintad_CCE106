import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
  
  import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
  
  import { getProfile, loginUser } from "../services/api";
  
  type User = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  
  type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (
      username: string,
      password: string
    ) => Promise<void>;
    logout: () => Promise<void>;
  };
  
  const AuthContext = createContext<AuthContextType | undefined>(
    undefined
  );
  
  const TOKEN_KEY = "student_token";
  
  async function saveToken(token: string) {
    if (Platform.OS === "web") {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
  }
  
  async function getToken() {
    if (Platform.OS === "web") {
      return localStorage.getItem(TOKEN_KEY);
    } else {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    }
  }
  
  async function removeToken() {
    if (Platform.OS === "web") {
      localStorage.removeItem(TOKEN_KEY);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
  }
  
  export function AuthProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    // Restore session when app starts
    useEffect(() => {
      restoreSession();
    }, []);
  
    async function restoreSession() {
      try {
        const savedToken = await getToken();
  
        if (!savedToken) {
          setLoading(false);
          return;
        }
  
        const profile = await getProfile(savedToken);
  
        setToken(savedToken);
        setUser(profile);
      } catch (error) {
        console.log("Session expired or invalid");
  
        await removeToken();
  
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
  
    async function login(
      username: string,
      password: string
    ) {
      const data = await loginUser(username, password);
  
      await saveToken(data.accessToken);
  
      setToken(data.accessToken);
  
      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    }
  
    async function logout() {
      await removeToken();
  
      setToken(null);
      setUser(null);
    }
  
    return (
      <AuthContext.Provider
        value={{
          user,
          token,
          loading,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error(
        "useAuth must be used inside AuthProvider"
      );
    }
  
    return context;
  }