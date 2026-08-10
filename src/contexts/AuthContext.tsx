'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SPECIALISTS, PATIENTS } from '@/lib/data';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'specialist';
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; role?: string; error?: string };
  logout: () => void;
  register: (data: any, role: 'patient' | 'specialist') => { success: boolean; error?: string };
  updateUser: (data: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('rafiq_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    // Check specialists
    const specialist = SPECIALISTS.find(s => s.email === email && s.password === password);
    if (specialist) {
      const u = { ...specialist, role: 'specialist' as const };
      setUser(u);
      localStorage.setItem('rafiq_user', JSON.stringify(u));
      return { success: true, role: 'specialist' };
    }

    // Check patients
    const patient = PATIENTS.find(p => p.email === email && p.password === password);
    if (patient) {
      const u = { ...patient, role: 'patient' as const };
      setUser(u);
      localStorage.setItem('rafiq_user', JSON.stringify(u));
      return { success: true, role: 'patient' };
    }

    // Check locally registered users
    const localUsers = JSON.parse(localStorage.getItem('rafiq_local_users') || '[]');
    const localUser = localUsers.find((u: any) => u.email === email && u.password === password);
    if (localUser) {
      setUser(localUser);
      localStorage.setItem('rafiq_user', JSON.stringify(localUser));
      return { success: true, role: localUser.role };
    }

    return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rafiq_user');
  };

  const register = (data: any, role: 'patient' | 'specialist') => {
    const localUsers = JSON.parse(localStorage.getItem('rafiq_local_users') || '[]');
    const exists = [...SPECIALISTS, ...PATIENTS, ...localUsers].find((u: any) => u.email === data.email);
    if (exists) {
      return { success: false, error: 'البريد الإلكتروني مستخدم بالفعل' };
    }
    const newUser = {
      ...data,
      id: `local-${Date.now()}`,
      role,
      assessmentDone: false,
      assessmentResult: null,
      purchasedBoxes: [],
      bookedAppointments: [],
      appointments: [],
    };
    localUsers.push(newUser);
    localStorage.setItem('rafiq_local_users', JSON.stringify(localUsers));
    setUser(newUser);
    localStorage.setItem('rafiq_user', JSON.stringify(newUser));
    return { success: true };
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('rafiq_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
