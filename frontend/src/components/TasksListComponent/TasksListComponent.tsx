import React, {useEffect, useRef, useState} from 'react'
import styles from "../LabelComponent/LabelComponent.module.scss";
import TaskComponent from "../TaskComponent/TaskComponent.tsx";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../Constants.ts";
import axios from "../../lib/axios.tsx";
import toast from "react-hot-toast";
import {sort} from "fast-sort";

type TaskProps = {
    label: {
        id: number;
        name: string;
        tasks: [];
    };
    onDropTask: (taskId: number, labelId: number) => void;
    projectId: number;
    tasks: [];
    sortCriteria: string[];
    hoveredItem: boolean;
    getLabels: () => void;
    taskEditHandler: (value: object) => void;
};
type Task = {
    id: number;
    title: string;
    description: string;
    priority: number;
    comments: [];
    due_date: string;
    assignees: [];
}

const TasksListComponent: React.FC<TaskProps> = (
    {sortCriteria, tasks, onDropTask, label, hoveredItem, getLabels, projectId, taskEditHandler}) => {
    const [isLastTaskInView, setIsLastTaskInView] = useState(false);
    const lastTaskRef = useRef<HTMLDivElement | null>(null);
    const [{isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item: { id: number }) => {
            onDropTask(item.id, label.id);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    const [isFetching, setIsFetching] = useState(false)


    type Task = {
        id: number;
        title: string;
        description: string;
        priority: number;
        comments: [];
        due_date: string;
        assignees: [];
    };

    const sortTasks = (tasks: Task[], criteria: string[]) => {
        // If no criteria, return original tasks
        if (!criteria.length) return tasks;

        // Create an array to hold sort criteria
        const sortCriteria = criteria.map(criterion => {
            switch (criterion) {
                case 'priority':
                    return { desc: t => t.priority };
                case 'dueDate':
                    return { asc: t => new Date(t.due_date).getTime() };
                case 'title':
                    return { asc: t => t.title };
                default:
                    return null;
            }
        }).filter(Boolean); // Remove any null values

        // Apply sorting based on multiple criteria
        return sort(tasks).by(sortCriteria);
    };



    const sortedTasks = sortTasks(tasks, sortCriteria);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLastTaskInView(true);
                } else {
                    setIsLastTaskInView(false);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.01,
            }
        );

        if (lastTaskRef.current) {
            observer.observe(lastTaskRef.current);
        }

        return () => {
            if (lastTaskRef.current) {
                observer.unobserve(lastTaskRef.current);
            }
        };
    }, [sortedTasks]);

    const dropWrapperStyle =
        tasks.length === 0
            ? {boxShadow: 'none'}
            : isLastTaskInView
                ? {boxShadow: 'none'}
                : {boxShadow: 'inset 0px -20px 20px -15px #111'};
    const handleAssignTask = async (taskId: number | null | undefined) => {
        if (taskId === null || taskId === undefined || isFetching) return;
        setIsFetching(true);
        try {
            const res = await axios.post('/api/assign-task', {task_id: taskId})
            if (res.status === 201) {
                toast.success(res.data.message)
                getLabels()
            }
        } catch (e) {
            toast.error(e.response.data.message)

        } finally {
            setTimeout(() => {
                setIsFetching(false)
            }, 2000)
        }
    }
    const handleAssigneeRemove = async (taskId: number | null | undefined) => {
        if (taskId === null || taskId === undefined || isFetching) return;
        setIsFetching(true);
        try {
            const res = await axios.delete(`/api/remove-assignee/${taskId}`)
            if (res.status === 201) {
                toast.success(res.data.message)
                getLabels()
            }
        } catch (e) {
            toast.error(e.response.data.message)
        } finally {
            setTimeout(() => {
                setIsFetching(false)
            }, 2000)
        }
    }
    const onTaskDelete = async (data) => {
        setIsFetching(true)
        try {
            const res = await axios.post('api/task-delete', data)
            if (res.status === 201) {
                toast.success(res.data.message)
                getLabels()
            }
        } catch (e) {
            toast.error(e.response.data.message)
        } finally {
            setIsFetching(false)
        }
    }
    return (
        <div ref={drop} className={`${styles.dropWrapper} ${hoveredItem ? (styles.blur) : ('')}`}
             style={dropWrapperStyle}>
            {sortedTasks.length > 0 ? (
                <>
                    {sortedTasks.map((task, index) => (
                        <div key={task.id} ref={index === sortedTasks.length - 1 ? lastTaskRef : null}>
                            <TaskComponent
                                task={task}
                                projectId={projectId}
                                handleAssignTask={handleAssignTask}
                                handleAssigneeRemove={handleAssigneeRemove}
                                onTaskDelete={onTaskDelete}
                                isFetching={isFetching}
                                getLabels={getLabels}
                                handleTaskEdit={taskEditHandler}
                            />
                        </div>
                    ))}
                </>
            ) : (
                <span>No tasks yet.</span>
            )}
        </div>
    )
}
export default TasksListComponent
