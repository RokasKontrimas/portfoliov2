import {useTranslation} from "react-i18next";
import styles from './QualificationsComponent.module.scss';
import InViewTitleComponent from "../InViewTitleComponent/InViewTitleComponent.tsx";
import SectionTitleComponent from "../SectionTitleComponent/SectionTitleComponent.tsx";

const QualificationsComponent = () => {
    const {t} = useTranslation('common')

    return (
        <>
            <div className={styles.sectionContent}>
                <SectionTitleComponent
                    title="section-title.qualifications"
                    imageUrl="/images/clouds/cloud-1.png"
                />


                <ul>
                    <li>
                        <span>{t('qualifications-junior-php.title')}</span>
                        {t('qualifications-junior-php.description')}
                    </li>
                    <li>
                        <span>{t('qualifications-front-end-developer.title')}</span>
                        {t('qualifications-front-end-developer.description')}
                    </li>
                </ul>
            </div>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src="https://placehold.co/600x400" alt="Qualification image"/>
            </div>
        </>
    )
}
export default QualificationsComponent
