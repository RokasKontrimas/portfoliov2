import {useTranslation} from "react-i18next";
import InViewTitleComponent from "../InViewTitleComponent/InViewTitleComponent.tsx";
import styles from './EducationComponent.module.scss';
import SectionTitleComponent from "../SectionTitleComponent/SectionTitleComponent.tsx";

const EducationComponent = () => {
    const {t} = useTranslation('common')
    return (
        <div>
            <div className={styles.sectionContent}>
                <SectionTitleComponent
                    title="section-title.education"
                    imageUrl="/images/clouds/dcloud-2.png"
                />
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
