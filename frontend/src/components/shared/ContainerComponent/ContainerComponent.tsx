import React from 'react'
import styles from './ContainerComponent.module.scss';
type ContainerProps = {
    children: React.ReactNode;
}
const ContainerComponent = ({children}: ContainerProps) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
export default ContainerComponent
