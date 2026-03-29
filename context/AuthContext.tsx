'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'STUDENT' | 'TEACHER' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate persistent session check from localStorage or cookies
    const storedUser = localStorage.getItem('smarted_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: UserRole) => {
    setIsLoading(true);
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      name: email.split('@')[0],
      email,
      role,
    };

    const sessionData = JSON.stringify(mockUser);
    localStorage.setItem('smarted_user', sessionData);
    document.cookie = `smarted_session=${sessionData}; path=/; max-age=604800; samesite=strict`;
    
    setUser(mockUser);
    setIsLoading(false);

    if (role === 'STUDENT') {
      window.location.href = '/student';
    } else if (role === 'TEACHER') {
      window.location.href = '/teacher';
    }
  };

  const logout = () => {
    localStorage.removeItem('smarted_user');
    document.cookie = 'smarted_session=; path=/; max-age=0; samesite=strict';
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
