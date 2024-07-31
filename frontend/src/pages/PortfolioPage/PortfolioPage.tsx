import AboutmeComponent from "../../components/portfolio/AboutmeComponent/AboutmeComponent.tsx";
import QualificationsComponent from "../../components/portfolio/QualificationsComponent/QualificationsComponent.tsx";
import SkillsComponent from "../../components/portfolio/SkillsComponent/SkillsComponent.tsx";
import ExperienceComponent from "../../components/portfolio/ExperienceComponent/ExperienceComponent.tsx";
import EducationComponent from "../../components/portfolio/EducationComponent/EducationComponent.tsx";
import ProjectsComponent from "../../components/portfolio/ProjectsComponent/ProjectsComponent.tsx";
import styles from './PortfolioPage-v2.module.scss';
import ContainerComponent from "../../components/shared/ContainerComponent/ContainerComponent.tsx";
import {useEffect, useRef, useState} from "react";
import {motion, useScroll, useTransform, useInView} from 'framer-motion';
import FallingStarComponent from "../../components/portfolio/FallingStarComponent/FallingStarComponent.tsx";
import NavigationComponent from "../../components/shared/NavigationComponent/NavigationComponent.tsx";
// import GalaxyComponent from "../../components/portfolio/GalaxyComponent/GalaxyComponent.tsx";


const PortfolioPage = () => {
    const [activeLink, setActiveLink] = useState('');
    const sunRef = useRef(null);
    const [isSun, setIsSun] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref);
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

    useEffect(() => {
        const handleScroll = () => {
            const newIsSun = document.body.scrollHeight / 2 > window.scrollY + window.innerHeight;
            setIsSun(newIsSun);

        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);

        };
    }, []);

    return (
        <>
            <NavigationComponent
                clickLink={clickLink}
                isActive={isActive}
                sections={sections}

            />
            <main className={styles.mainWrapper}>
                <div className={`${styles.imageWrapper} ${!isSun ? styles.moonlight : ''}`}>
                    <img
                        ref={sunRef}
                        className={styles.solarSystem}
                        src={isSun ? "/images/sun.svg" : "/images/moon.png"}
                        alt={isSun ? "sun" : "moon"}
                    />
                </div>
                <section className={styles.heroWrapper}>
                    <AboutmeComponent/>
                </section>
                <ContainerComponent>
                    <div className={styles.sectionsWrapper}>
                        {sections.map(({id, Component}, index) => {
                            const ref = useRef(null);
                            const {scrollYProgress} = useScroll({
                                target: ref,
                                offset: ["start end", "end center"]
                            });
                            const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
                            const scale = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
                            const isLastThree = index >= sections.length - 3;

                            return (
                                <motion.div
                                    id={id}
                                    key={id}
                                    ref={ref}
                                    style={{opacity, scale}}
                                    className={isLastThree ? styles.lastThree : ''}
                                >
                                    <section className={styles.section}>
                                        <Component/>
                                    </section>
                                </motion.div>
                            );
                        })}
                    </div>

                </ContainerComponent>
                <FallingStarComponent/>
                {/*{!isSun && (*/}
                {/*    <GalaxyComponent/>*/}
                {/*)}*/}
            </main>
        </>

    );
};

export default PortfolioPage;
