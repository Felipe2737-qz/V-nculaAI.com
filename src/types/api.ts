// API Types for Víncula AI

export interface User {
  id: string;
  name: string;
  email: string;
  vinculos: number;
  provider?: 'email' | 'google' | 'apple';
  preferences: {
    language: 'en' | 'pt' | 'es' | 'fr' | 'de';
    currency: 'USD' | 'BRL' | 'EUR' | 'GBP';
  };
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    accessToken?: string;
  };
}

export interface Plan {
  id: string;
  name: string;
  vinculos: number;
  prices: {
    USD: number;
    BRL: number;
    EUR: number;
    GBP: number;
  };
  popular?: boolean;
}

export interface Payment {
  id: string;
  planId: string;
  currency: 'USD' | 'BRL' | 'EUR' | 'GBP';
  amount: number;
  method: 'pix' | 'paypal' | 'wise';
  status: 'pending' | 'paid' | 'failed' | 'expired';
  vinculosToAdd: number;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  data?: {
    text: string;
    lang: string;
    domain: string | null;
    sources: Array<{ score: number; source: string; text: string }>;
    vinculosLeft: number;
    conversationId: string;
    messageId: string;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// Currency symbols
export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  BRL: 'R$',
  EUR: '€',
  GBP: '£',
};

// Language names
export const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};
