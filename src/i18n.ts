import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav": {
        "dashboard": "Dashboard",
        "tickets": "Tickets",
        "chatbots": "Chatbots",
        "team": "Team",
        "settings": "Settings",
        "logs": "Activity Logs"
      },
      "hero": {
        "title": "Smarter Support for Modern Sales",
        "subtitle": "Transform your customer service into a high-converting growth engine."
      }
    }
  },
  fr: {
    translation: {
      "nav": {
        "dashboard": "Tableau de bord",
        "tickets": "Tickets",
        "chatbots": "Chatbots",
        "team": "Équipe",
        "settings": "Paramètres",
        "logs": "Journaux d'activité"
      }
    }
  },
  ar: {
    translation: {
      "nav": {
        "dashboard": "لوحة القيادة",
        "tickets": "التذاكر",
        "chatbots": "برامج الدردشة",
        "team": "الفريق",
        "settings": "الإعدادات",
        "logs": "سجلات النشاط"
      }
    }
  },
  yo: {
    translation: {
      "nav": {
        "dashboard": "Dashboard iṣẹ́",
        "tickets": "Tíkẹ́ẹ̀tì",
        "chatbots": "AI Olùrànlọ́wọ́",
        "team": "Ẹgbẹ́",
        "settings": "Ètò",
        "logs": "Àkọsílẹ̀"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
