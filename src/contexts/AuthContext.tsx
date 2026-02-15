import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/api';
import { toast } from 'sonner';
import { api, isApiConfigured, isDemoMode } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isOffline: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateVinculos: (newAmount: number) => void;
  useFreeMessage: () => boolean;
  getFreeMessagesLeft: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FREE_MESSAGES_PER_DAY = 25;
const FREE_MESSAGES_KEY = 'vincula_free_messages';

interface FreeMessageData {
  date: string;
  count: number;
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function getFreeMessageData(): FreeMessageData {
  try {
    const stored = localStorage.getItem(FREE_MESSAGES_KEY);
    if (stored) {
      const data = JSON.parse(stored) as FreeMessageData;
      if (data.date === getTodayString()) {
        return data;
      }
    }
  } catch {
    // Ignore errors
  }
  return { date: getTodayString(), count: 0 };
}

function saveFreeMessageData(data: FreeMessageData): void {
  localStorage.setItem(FREE_MESSAGES_KEY, JSON.stringify(data));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  const fetchMe = async () => {
    if (!isApiConfigured()) {
      // No backend configured - start without account
      setUser(null);
      setIsOffline(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get<{ user: User }>('/api/auth/me');
      
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        setIsOffline(false);
      } else if (response.error?.type === 'offline' || response.error?.type === 'timeout') {
        setIsOffline(true);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!isApiConfigured()) {
      // No backend - simulate login with local user
      setUser({
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        vinculos: 50,
        provider: 'email',
        preferences: { language: 'en', currency: 'USD' },
        createdAt: new Date().toISOString(),
      });
      toast.success('Login realizado!');
      return true;
    }

    const response = await api.post<{ user: User }>('/api/auth/login', { email, password });

    if (response.success && response.data?.user) {
      setUser(response.data.user);
      setIsOffline(false);
      toast.success('Logged in successfully!');
      return true;
    } else if (response.error?.type === 'offline') {
      setIsOffline(true);
      toast.error('Server unavailable. Please try again later.');
      return false;
    } else {
      toast.error(response.message || 'Login failed');
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    if (!isApiConfigured()) {
      // No backend - simulate signup with local user
      setUser({
        id: `user-${Date.now()}`,
        name,
        email,
        vinculos: 50,
        provider: 'email',
        preferences: { language: 'en', currency: 'USD' },
        createdAt: new Date().toISOString(),
      });
      toast.success('Conta criada com sucesso!');
      return true;
    }

    const response = await api.post<{ user: User }>('/api/auth/register', { name, email, password });

    if (response.success && response.data?.user) {
      setUser(response.data.user);
      setIsOffline(false);
      toast.success('Account created successfully!');
      return true;
    } else if (response.error?.type === 'offline') {
      setIsOffline(true);
      toast.error('Server unavailable. Please try again later.');
      return false;
    } else {
      toast.error(response.message || 'Signup failed');
      return false;
    }
  };

  const logout = async () => {
    if (isApiConfigured()) {
      await api.post('/api/auth/logout');
    }
    setUser(null);
    toast.success('Logged out');
  };

  const refreshUser = async () => {
    await fetchMe();
  };

  const updateVinculos = (newAmount: number) => {
    if (user) {
      setUser({ ...user, vinculos: newAmount });
    }
  };

  const useFreeMessage = (): boolean => {
    const data = getFreeMessageData();
    if (data.count < FREE_MESSAGES_PER_DAY) {
      data.count++;
      saveFreeMessageData(data);
      return true;
    }
    return false;
  };

  const getFreeMessagesLeft = (): number => {
    const data = getFreeMessageData();
    return Math.max(0, FREE_MESSAGES_PER_DAY - data.count);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isOffline,
        login,
        signup,
        logout,
        refreshUser,
        updateVinculos,
        useFreeMessage,
        getFreeMessagesLeft,
      }}
    >
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
