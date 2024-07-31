import React, {useState} from 'react';
import ModalComponent from '../ModalComponent/ModalComponent';
import TaskFormComponent from '../TaskFormComponent/TaskFormComponent';
import styles from './LabelComponent.module.scss';
import LabelTasksSorter from './LabelTasksSorter';
import TasksListComponent from "../TasksListComponent/TasksListComponent.tsx";
import {Helmet} from "react-helmet-async";

type LabelProps = {
    label: {
        id: number;
        name: string;
        tasks: [];
        assignees: [];
    };
    onDropTask: (taskId: number, labelId: number) => void;
    projectId: number;
    getLabels: () => void;
};

const LabelComponent: React.FC<LabelProps> = ({label, onDropTask, projectId, getLabels}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortCriteria, setSortCriteria] = useState<string[]>(['priority']);
    const [hoveredItem, setHoveredItem] = useState(false)
    const [editableTask, setEditableTask] = useState(null)
    const handleSort = (criteria: string) => {
        setSortCriteria(prevCriteria => {
            console.log('Previous criteria:', prevCriteria);
            const updatedCriteria = prevCriteria.includes(criteria)
                ? prevCriteria.filter(c => c !== criteria)
                : [...prevCriteria, criteria];
            console.log('Updated criteria:', updatedCriteria);
            return updatedCriteria;
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditableTask(null)
    };


    const taskEditHandler = (task: object) => {
        setIsModalOpen(true)
        setEditableTask(task)
    }
    return (
        <div className={styles.label}>
            <div style={{
                display: 'grid',
                gridAutoFlow: 'column',
                alignItems: 'center',
                placeItems: "center",
                justifyContent: 'center',
                columnGap: "20px",
            }}>
                <LabelTasksSorter onSort={handleSort} criteria={sortCriteria} setHoveredItem={setHoveredItem}/>
                <h2 className={styles.labelTitle}>{label.name}</h2>
            </div>
            {isModalOpen && (
                <Helmet title={`${import.meta.env.VITE_APP_TITLE} Task form`}/>
            )}
            <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
                <TaskFormComponent
                    closeModal={closeModal}
                    projectId={projectId}
                    labelId={label.id}
                    getLabels={getLabels}
                    selectedTask={editableTask}
                />
            </ModalComponent>
            <button className={styles.button} onClick={openModal}>New task</button>
            <TasksListComponent
                onDropTask={onDropTask}
                projectId={projectId}
                sortCriteria={sortCriteria}
                getLabels={getLabels}
                label={label}
                tasks={label.tasks}
                hoveredItem={hoveredItem}
                taskEditHandler={taskEditHandler}
            />
        </div>
    );
};

export default LabelComponent;
