import {useTranslation} from "react-i18next";

const HobbiesComponent = () => {
    const {t} = useTranslation('common')
    return (
        <section>
            <h2>{t('section-title.hobbies')}</h2>
            <p>{t('hobbies-description')}</p>
        </section>

    )
}
export default HobbiesComponent
