import {useTranslation} from "react-i18next";
import InViewTitleComponent from "../InViewTitleComponent/InViewTitleComponent.tsx";
import styles from './ProjectsComponent.module.scss';
import SectionTitleComponent from "../SectionTitleComponent/SectionTitleComponent.tsx";

const ProjectsComponent = () => {
    const {t} = useTranslation('common')
    return (
        <div>
            <div className={styles.sectionContent}>
              <h2>{t('section-title.projects')}</h2>
            </div>
            <p>{t('projects-tba')}</p>
            <p>{t('projects-tba')}</p>
        </div>

    )
}
export default ProjectsComponent
