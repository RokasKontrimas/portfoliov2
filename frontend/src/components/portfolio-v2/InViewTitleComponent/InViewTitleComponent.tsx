import React, {useEffect} from 'react'
import {motion, useAnimation} from "framer-motion";
import styles from "../AboutmeComponent/AboutmeComponent.module.scss";
import {useInView} from "react-intersection-observer";

const InViewTitleComponent = ({children}) => {
    const controls = useAnimation();
    const {ref, inView} = useInView({
        threshold: 0.1,  // Trigger when the element is 10% in view
    });
    useEffect(() => {
        if (inView) {

            controls.start({
                opacity: 1,
                y: 0,
                transition: {duration: 1, ease: 'easeOut'}
            });
        } else {
            controls.start({
                opacity: 0,
                y: 50
            });
        }
    }, [inView, controls]);
    return (
        <motion.div animate={controls} initial={{opacity: 0, y: 50}}>
            <div ref={ref} className={styles.cloud}>
                {children}
            </div>
        </motion.div>
    )
}
export default InViewTitleComponent
