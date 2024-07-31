import React from 'react'
import {changeLanguage} from "i18next";
import {useTranslation} from "react-i18next";

const LanguageSwitchComponent = () => {
    const {i18n} = useTranslation('common')

    const availableLanguages = i18n.options.resources ? Object.keys(i18n.options.resources) : [];

    const changeLang = (lng) => {
        changeLanguage(lng);
        localStorage.setItem('language', lng); // Save the selected language
    };

    return (
        <div>
            {availableLanguages.map((lang, index) => {
                return <button
                    key={index}
                    onClick={() => changeLang(lang)}
                    disabled={i18n.language === lang}
                >
                    {lang}
                </button>
            })
            }
        </div>
    )
}
export default LanguageSwitchComponent
