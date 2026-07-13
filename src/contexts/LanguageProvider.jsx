import { useEffect, useState } from "react";
import { getLanguage, saveLanguage } from '../utils/storage.js';
import { LanguageContext } from "./LanguageContext.jsx";

import { translations } from "../locales";

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(getLanguage);

    useEffect(() => {
        saveLanguage(language);
    }, [language]);

    const value = {
        language,
        setLanguage,
        t(namespace, key) {
          return translations[language][namespace][key];
        },
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}