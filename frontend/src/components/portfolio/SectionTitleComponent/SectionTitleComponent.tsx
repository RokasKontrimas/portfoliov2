import React from 'react'
import styles from "./SectionTitleComponent.module.scss";
import InViewTitleComponent from "../InViewTitleComponent/InViewTitleComponent.tsx";
import {useTranslation} from "react-i18next";

const SectionTitleComponent = ({imageUrl, title}) => {
    const {t} = useTranslation('common')
    return (
        <div className={styles.cloud}>
            <InViewTitleComponent>
                <h2>{t(title)}</h2>
                <img src={imageUrl} alt="Cloud"/>
            </InViewTitleComponent>
        </div>
    )
}
export default SectionTitleComponent
