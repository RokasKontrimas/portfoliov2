import {useTranslation} from "react-i18next";
import styles from './ExperienceComponent.module.scss';
import SectionTitleComponent from "../SectionTitleComponent/SectionTitleComponent.tsx";

const ExperienceComponent = () => {
    const {t} = useTranslation('common')
    return (
        <>
            <div className={styles.sectionContent}>
                <SectionTitleComponent
                    title="section-title.experience"
                    imageUrl="/images/clouds/dcloud-1.png"
                />
                <div>
                    <div>
                        <h3>{t('experience.title')}</h3>
                        <h4>{t('experience.company')}</h4>
                        <span>{t('experience.date')}</span>
                    </div>
                    <div>
                        <ul>
                            <li>{t('experience.responsibilities.responsibility-1')}</li>
                            <li>{t('experience.responsibilities.responsibility-2')}</li>
                            <li>{t('experience.responsibilities.responsibility-3')}</li>
                            <li>{t('experience.responsibilities.responsibility-4')}</li>
                            <li>{t('experience.responsibilities.responsibility-5')}</li>
                            <li>{t('experience.responsibilities.responsibility-6')}</li>
                        </ul>
                    </div>
                </div>
            </div>

        </>

    )
}
export default ExperienceComponent
