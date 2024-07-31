import React from 'react';
import styles from './LabelComponent.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";

type LabelTasksSorterProps = {
    onSort: (criteria: string) => void;
    criteria: string[];
    setHoveredItem: (value: boolean) => void;
};

const LabelTasksSorter: React.FC<LabelTasksSorterProps> = ({onSort, criteria, setHoveredItem}) => {
    const handleMouseEnter = () => {
        setHoveredItem(true);
    };

    const handleMouseLeave = () => {
        setHoveredItem(false);
    };

    const toggleCriteria = (sortType: string) => {
        onSort(sortType);
    };

    const isActive = (sortType: string) => {
        return criteria.includes(sortType);
    };

    return (
        <div className={styles.filterContainer} tabIndex={0}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}>
            <FontAwesomeIcon
                role="button"
                icon={faFilter}
                tabIndex={0}
                className={styles.filter}
            />
            <div className={styles.filterWrapper}>
                <p
                    role="button"
                    data-type="priority"
                    tabIndex={0}
                    className={isActive('priority') ? styles.activeCriteria : ''}
                    onClick={(e) => {
                        const sortType = e.currentTarget.getAttribute('data-type') || '';
                        if(sortType) toggleCriteria(sortType);
                    }}
                >
                    Sort by priority
                </p>
                <p
                    role="button"
                    data-type="dueDate"
                    tabIndex={0}
                    className={isActive('dueDate') ? styles.activeCriteria : ''}
                    onClick={(e) => {
                        const sortType = e.currentTarget.getAttribute('data-type') || '';
                        if(sortType) toggleCriteria(sortType);
                    }}
                >
                    Sort by due date
                </p>
                <p
                    role="button"
                    data-type="title"
                    tabIndex={0}
                    className={isActive('title') ? styles.activeCriteria : ''}
                    onClick={(e) => {
                        const sortType = e.currentTarget.getAttribute('data-type') || '';
                        if(sortType) toggleCriteria(sortType);
                    }}
                >
                    Sort by title
                </p>
            </div>
        </div>
    );
};

export default LabelTasksSorter;
