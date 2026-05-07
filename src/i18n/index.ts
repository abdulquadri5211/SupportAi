import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      common: {
        welcome: "Welcome to SupportPilot AI",
        dashboard: "Dashboard",
        settings: "Settings",
        logout: "Logout",
        save: "Save",
        cancel: "Cancel",
      },
      onboarding: {
        title: "Setup your Workspace",
        workspaceName: "Workspace Name",
        businessType: "Business Type",
        next: "Next",
        back: "Back",
        complete: "Complete Setup",
      },
    },
  },
  fr: {
    translation: {
      common: {
        welcome: "Bienvenue sur SupportPilot AI",
        dashboard: "Tableau de bord",
        settings: "Paramètres",
        logout: "Se déconnecter",
        save: "Sauvegarder",
        cancel: "Annuler",
      },
    },
  },
  // Add other languages placeholders
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
