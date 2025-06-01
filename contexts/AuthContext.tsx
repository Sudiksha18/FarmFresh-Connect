import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export type UserRole = "farmer" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  verifyOTP: async () => {},
  resendOTP: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem("farmfresh_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const response = await axios.get<User>("/api/auth/user");
          setUser(response.data);
          localStorage.setItem("farmfresh_user", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: "user-123",
        name: "John Doe",
        email,
        role: email.includes("farmer") ? "farmer" : "customer",
        isVerified: true,
      };

      setUser(mockUser);
      localStorage.setItem("farmfresh_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("farmfresh_user");
  };

  const forgotPassword = async (email: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  };

  const resendOTP = async (email: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    verifyOTP,
    resendOTP,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
