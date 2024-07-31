import AboutmeComponent from "../../components/portfolio-v2/AboutmeComponent/AboutmeComponent.tsx";
import QualificationsComponent from "../../components/portfolio-v2/QualificationsComponent/QualificationsComponent.tsx";
import SkillsComponent from "../../components/portfolio-v2/SkillsComponent/SkillsComponent.tsx";
import ExperienceComponent from "../../components/portfolio-v2/ExperienceComponent/ExperienceComponent.tsx";
import EducationComponent from "../../components/portfolio-v2/EducationComponent/EducationComponent.tsx";
import ProjectsComponent from "../../components/portfolio-v2/ProjectsComponent/ProjectsComponent.tsx";
import styles from './PortfolioPage-v2.module.scss';
import ContainerComponent from "../../components/shared/ContainerComponent/ContainerComponent.tsx";
import {useState} from "react";
import FallingStarComponent from "../../components/portfolio/FallingStarComponent/FallingStarComponent.tsx";
import NavigationComponent from "../../components/shared/NavigationComponent/NavigationComponent.tsx";

const PortfolioPageV2 = () => {
    const [activeLink, setActiveLink] = useState('');
    const sections = [
        // {id: 'about', Component: AboutmeComponent},
        {id: 'qualifications', Component: QualificationsComponent},
        {id: 'skills', Component: SkillsComponent},
        {id: 'experience', Component: ExperienceComponent},
        {id: 'education', Component: EducationComponent},
        {id: 'projects', Component: ProjectsComponent}
    ];

    const clickLink = (e, link) => {
        e.preventDefault();
        setActiveLink(link);
        const element = document.getElementById(link);
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };

    const isActive = (link) => {
        return activeLink === link ? styles.active : '';
    };

    return (
        <>
            <NavigationComponent
                clickLink={clickLink}
                isActive={isActive}
                sections={sections}

            />
            <main className={styles.mainWrapper}>
                <section className={styles.heroWrapper}>
                    <AboutmeComponent/>
                </section>
                <ContainerComponent>
                    <div className={styles.sectionsWrapper}>
                        {sections.map(({id, Component}) => {
                            return (
                                <section key={id} className={styles.section}>
                                    <Component/>
                                </section>
                            );
                        })}
                    </div>

                </ContainerComponent>
                {/*<FallingStarComponent/>*/}
                {/*{!isSun && (*/}
                {/*    <GalaxyComponent/>*/}
                {/*)}*/}
            </main>
        </>

    );
};

export default PortfolioPageV2;
