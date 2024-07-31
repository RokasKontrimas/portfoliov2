import React, {useEffect, useState} from 'react';
import {motion, useAnimation, useInView} from 'framer-motion';

const FallingStarComponent = () => {
    const controls = useAnimation();
    const ref = React.useRef(null);
    const isInView = useInView(ref);
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        if (isInView && !hasAnimated) {
            controls.start({
                top: 500,
                left: '100%',
                transition: { duration: 3, ease: 'easeInOut' },
            }).then(() => setHasAnimated(true));
        } else if (!isInView && hasAnimated) {
            controls.start({
                top: 0,
                left: -100,
                transition: { duration: 0 },
            }).then(() => setHasAnimated(false));
        }
    }, [isInView, controls, hasAnimated]);

    return (
        <div ref={ref} style={containerStyle}>
            <motion.div

                animate={controls}
                style={starStyle}
            >
                <img  src='/images/fallingstar.png' width={128} alt='falling star'/>
            </motion.div>
        </div>
    );
};

const containerStyle = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
};

const starStyle = {
    position: 'absolute',
    width: '100px',
    height: '100px',
};

export default FallingStarComponent;
