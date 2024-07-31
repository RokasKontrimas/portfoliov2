import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import styles from './GalaxyComponent.module.scss';

const TOTAL_STARS_COUNT = 200;
const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random()
        });
    }
    return stars;
};

const Star = ({x, y, size, opacity}) => (
    <motion.div
        className={styles.starfield}
        style={{
            top: `${y}%`,
            left: `${x}%`,
            width: size,
            height: size,
            opacity: opacity
        }}
        initial={{opacity: 0}}
        animate={{opacity: opacity}}
        transition={{duration: 1.5}}
    />
);

const GalaxyComponent = () => {
    const [stars, setStars] = useState(generateStars(TOTAL_STARS_COUNT));



    useEffect(() => {
    const galaxyWrapper = document.getElementById('galaxy-wrapper')
        if (galaxyWrapper) {
            galaxyWrapper.style.height = `${document.body.scrollHeight / 2}px`;
        }
        const handleResize = () => {
            setStars(generateStars(window.innerWidth < 768 ? TOTAL_STARS_COUNT / 2 : TOTAL_STARS_COUNT));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id="galaxy-wrapper" className={styles.galaxyWrapper}>
            {stars.map((star) => (
                <Star key={star.id} x={star.x} y={star.y} size={star.size} opacity={star.opacity}/>
            ))}
        </div>
    );
};

export default GalaxyComponent;
