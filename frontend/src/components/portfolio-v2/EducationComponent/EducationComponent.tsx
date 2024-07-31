import {useTranslation} from "react-i18next";
import styles from './EducationComponent.module.scss';

const EducationComponent = () => {
    const {t} = useTranslation('common')
    return (
        <div>
            <div className={styles.sectionContent}>
        <h2>{t('section-title.education')}</h2>
            </div>
            <div>
                <div>
                    <h3>{t('education-php-developer.title')}</h3>
                    <p>{t('education-php-developer.institution')}</p>
                    <p>{t('education-php-developer.dates')}</p>
                </div>
                <div>
                    <h3>{t('education-frontend-developer.title')}</h3>
                    <p>{t('education-frontend-developer.institution')}</p>
                    <p>{t('education-frontend-developer.dates')}</p>
                </div>
            </div>
        </div>

    )
}
export default EducationComponent
