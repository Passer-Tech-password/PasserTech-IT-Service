"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationType, SupportedLanguage } from "./translations";

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  // Fallback to English if a translation key is missing
  const t = {
    ...translations.en,
    ...translations[language],
    // Deep merge for nested objects if necessary, but since we've filled 
    // all keys, a shallow merge of the main sections is enough for now.
    nav: { ...translations.en.nav, ...translations[language].nav },
    hero: { ...translations.en.hero, ...translations[language].hero },
    services: { ...translations.en.services, ...translations[language].services },
    academy: { ...translations.en.academy, ...translations[language].academy },
    contact: { ...translations.en.contact, ...translations[language].contact },
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
