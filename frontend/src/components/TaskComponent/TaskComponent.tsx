import React, {useState} from 'react';
import {useDrag} from 'react-dnd';
import {ItemTypes} from '../../Constants.ts';
import styles from './TaskComponent.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import TaskCommentsSection from "../TaskCommentsSection/TaskCommentsSection.tsx";
import {getTimeDifference, getPriority} from '../../essentials/essentials.tsx';
import TaskEssentialsComponent from "../TaskEssentialsComponent/TaskEssentialsComponent.tsx";


type TaskProps = {
    task: {
        id: number;
        title: string;
        description: string,
        created_by: number;
        priority: number;
        comments: [];
        due_date: string;
        assignees: [];
    };
    projectId: number;
    handleAssignTask: (taskId: number | null | undefined) => void;
    handleAssigneeRemove: (taskId: number | null | undefined) => void;
    isFetching: boolean;
    getLabels: () => void;
    onTaskDelete: (data: object) => void;
    handleTaskEdit: (value: object) => void;
};
type Assignee = {
    id: number;
    name: string;
}
const TaskComponent: React.FC<TaskProps> = ({
                                                task,
                                                projectId,
                                                handleAssignTask,
                                                handleAssigneeRemove,
                                                isFetching,
                                                getLabels,
                                                onTaskDelete,
                                                handleTaskEdit
                                            }) => {
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: {id: task.id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));


    const handleTitleClick = (e: React.MouseEvent<HTMLHeadingElement> | React.KeyboardEvent<HTMLHeadingElement>) => {
        e.preventDefault();
        setAccordionOpen(!accordionOpen);
        e.stopPropagation();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
        if (e.key === 'Enter') {
            handleTitleClick(e);
        }
    };


    const priorityChoices = getPriority(task.priority)


    return (

        <div
            ref={drag}
            style={{opacity: isDragging ? 0.5 : 1}}
            className={styles.taskWrapper}>
            <FontAwesomeIcon
                icon={faEllipsis}
                className={styles.taskSettings}
                tabIndex={0}
                role="button"
            />
            <div className={styles.taskEssentials}>
                <TaskEssentialsComponent
                    task={task}
                    projectId={projectId}
                    assignees={task?.assignees}
                    isFetching={isFetching}
                    onTaskDelete={onTaskDelete}
                    handleTaskEdit={handleTaskEdit}
                    handleAssignTask={handleAssignTask}
                    handleAssigneeRemove={handleAssigneeRemove}


                />

            </div>
            <div className={styles.task}>
                    <span
                        className={styles.taskTitle}
                        onClick={handleTitleClick}
                        onKeyDown={handleKeyDown}
                        role="button"
                        tabIndex={0}
                        style={{cursor: 'pointer'}}
                    >
                        {task.title}
                    </span>

                <div title={priorityChoices?.priority}
                     className={`${styles.taskPriority} ${styles[priorityChoices?.priority]}`}></div>
                <p className={styles.taskTimeWrapper}>Left time: <span
                    className={styles.taskTime}>{getTimeDifference(task.due_date)}</span></p>
                {task.assignees.length > 0 && (
                    <div className={styles.assigneesWrapper}>
                        {task.assignees.map((assignee: Assignee) => {
                            return <p key={assignee.id}>{assignee.name}</p>
                        })}
                    </div>
                )}
            </div>
            <div className={` ${accordionOpen ? (styles.show) : (styles.testWrap)}`}>
                <p className={styles.taskDescription}>{task.description}</p>
                <TaskCommentsSection
                    task={task}
                    getLabels={getLabels}
                />
            </div>
        </div>
    )
        ;
};

export default TaskComponent;
