import {useTranslation} from "react-i18next";
import styles from './SkillsComponent.module.scss';
import InViewTitleComponent from "../InViewTitleComponent/InViewTitleComponent.tsx";
import SectionTitleComponent from "../SectionTitleComponent/SectionTitleComponent.tsx";

const SkillsComponent = () => {
    const {t} = useTranslation('common')
    return (
        <>
            <div className={styles.sectionContent}>
                <SectionTitleComponent
                    title="section-title.skills"
                    imageUrl="/images/clouds/cloud-1.png"
                />

                <ul>
                    <li>
                        <span>{t('skills.backend.title')}</span>{t('skills.backend.description')}
                    </li>
                    <li>
                        <span>{t('skills.frontend.title')}</span>{t('skills.frontend.description')}
                    </li>
                    <li>
                        <span>{t('skills.fullstack.title')}</span>{t('skills.fullstack.description')}
                    </li>
                    <li>
                        <span>{t('skills.database-management.title')}</span>{t('skills.database-management.description')}
                    </li>
                    <li>
                        <span>{t('skills.version-control.title')}</span>{t('skills.version-control.description')}
                    </li>
                </ul>
            </div>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src="https://placehold.co/600x400" alt="Skills image"/>
            </div>
        </>

    )
}
export default SkillsComponent
