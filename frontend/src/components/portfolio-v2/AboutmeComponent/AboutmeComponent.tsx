import {useTranslation} from "react-i18next";
import styles from './AboutmeComponent.module.scss';

const AboutmeComponent = () => {
    const {t} = useTranslation('common')

    return (
        <>
            <div className={styles.sectionContent}>
                <div className={styles.heroImageWrapper}>
                    {/*<img src="/images/me.png"/>*/}
                </div>
                <h1 className={styles.heroTitle}>
                    Hello, I'm Rokas Kontrimas
                </h1>
                <span>
                <span>Front end</span>
                <span>Full stack</span>
                </span>
                {/*<p>{t('intro-paragraph')}</p>*/}
            </div>
        </>
    )
}
export default AboutmeComponent
