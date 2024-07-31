import {useTranslation} from "react-i18next";

const ContactsComponent = () => {
    const {t} = useTranslation('common')
    return (
        <section>
            <h2>{t('section-title.contacts')}</h2>
            <div>
                <a>{t('email')}</a>
                <a>{t('contacts-linkedin')}</a>
                <a>{t('contacts-github')}</a>
            </div>
        </section>

    )
}
export default ContactsComponent
