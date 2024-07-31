import React from 'react'
import styles from "./SectionTitleComponent.module.scss";
import {useTranslation} from "react-i18next";

const SectionTitleComponent = ({title}) => {
    const {t} = useTranslation('common')
    return (
        <h2 className={styles.sectionTitle}>{t(title)}</h2>
    )
}
export default SectionTitleComponent
