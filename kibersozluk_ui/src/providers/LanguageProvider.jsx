import { createContext, useState, useMemo, useEffect } from "react";

export const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "tm");
  const value = useMemo(() => ({ lang, setLang }), [lang]);
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
