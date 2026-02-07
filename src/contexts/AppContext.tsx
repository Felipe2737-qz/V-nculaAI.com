import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import translations, { Language, Translations } from '@/lib/translations';

type Currency = 'USD' | 'BRL' | 'EUR' | 'GBP';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: Translations;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('vincula_language');
    return (stored as Language) || 'en';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const stored = localStorage.getItem('vincula_currency');
    return (stored as Currency) || 'USD';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vincula_language', lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('vincula_currency', curr);
  };

  const t = translations[language];

  return (
    <AppContext.Provider value={{ language, setLanguage, currency, setCurrency, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
