import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import common_en from '../locales/en/translation.json';
import common_lt from '../locales/lt/translation.json';

const userLanguage = localStorage.getItem('language') || 'en';
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common: common_en
            },
            lt: {
                common: common_lt
            }
        },
        lng: userLanguage,
        fallbackLng: 'en',

        interpolation: {
            // react already safes from xss
            escapeValue: false
        }
    });

export default i18n;
