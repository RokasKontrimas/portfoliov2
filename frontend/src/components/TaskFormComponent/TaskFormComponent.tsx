import {SubmitHandler, useForm} from 'react-hook-form';
import React, {useEffect, useState} from "react";
import axios from "../../lib/axios.tsx";
import useAuthContext from "../../hooks/useAuthContext.tsx";
import toast from "react-hot-toast";
import styles from './TaskFormComponent.module.scss';
import {getPriority} from "../../essentials/essentials.tsx";

type Task = {
    id: number;
    created_by: number;
    title: string,
    description: string,
    priority: number,
    due_date: string,
    project_id: number,
};
type TaskFormProps = {
    closeModal: () => void,
    getLabels: () => void,
    projectId: number,
    labelId: number
    selectedTask: Task
};

const TaskFormComponent: React.FC<TaskFormProps> = ({closeModal, projectId, labelId, getLabels, selectedTask}) => {
    const {user} = useAuthContext();
    const {register, reset, handleSubmit, watch, setValue, formState: {errors}} = useForm<Task>();
    const [isFetching, setIsFetching] = useState(false)
    const title = watch('title');
    const description = watch('description');
    const priority = watch('priority');
    const due_date = watch('due_date');
    useEffect(() => {
        if (selectedTask) {
            setValue("title", selectedTask.title);
            setValue('description', selectedTask.description)
            setValue('priority', selectedTask.priority)
            setValue('due_date', selectedTask.due_date);

        } else {
            setValue("title", '');
            setValue('description', '');
            setValue('priority', 1);
            setValue('due_date', '');
        }
    }, [labelId, selectedTask, setValue]);
    const onSubmit: SubmitHandler<Task> = async data => {
        let url;
        data.project_id = Number(projectId)
        if (selectedTask) {
            data.id = selectedTask.id
            url = "api/update-task";
        } else {
            url = "api/create-task";
            data.created_by = Number(user.id)

        }
        console.log(data)

        setIsFetching(true);
        try {
            const res = await axios.post(url, data)
            if (res && res.status === 201 && !selectedTask) {
                const resLabel = await axios.post('api/insert-labeled-task', {
                    labelId: labelId,
                    taskId: res.data.id
                })
                if (resLabel && resLabel.status === 201) {
                    getLabels()
                    reset()
                    toast.success(resLabel.data.message)
                }
            }
            if (selectedTask && res && res.status === 201) {
                toast.success(res.data.message)
                getLabels()
            }
            closeModal();
        } catch (e) {
            toast.error(e.response.message);
        } finally {
            setIsFetching(false)
        }

    };

    // Custom validation function to check if the date is not in the past
    const validateDate = (value: string) => {
        const selectedDate = new Date(value);
        const now = new Date();

        // Set seconds and milliseconds to 0 to compare only up to minutes
        selectedDate.setSeconds(0);
        selectedDate.setMilliseconds(0);
        now.setSeconds(0);
        now.setMilliseconds(0);

        return selectedDate >= now || "Due date cannot be in the past";
    };
    const parseDate = () => {
        if (due_date) {
            const date = new Date(due_date)
            return date.toISOString()
        }
    }
    const currentPriority = getPriority(Number(priority))
    return (
        <>
            <div className={styles.wrapper}>
                <form className={styles.taskForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formWrapper}>
                        <div className={styles.formGroup}>
                            <input
                                className={styles.formControl}
                                type="text"
                                id="title"
                                maxLength={50}
                                {...register('title', {
                                    required: 'Title is required',
                                    minLength: {
                                        value: 3,
                                        message: "Title cannot be shorter than 3 letter",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Title cannot be longer than 50letters",
                                    }, validate: (value) => {
                                        if (value.trim().length <= 0)
                                            return "Title is required"
                                    }
                                })}
                                aria-invalid={errors.title ? 'true' : 'false'}
                            />
                            <label htmlFor="title">Title</label>

                            {errors.title && <p role="alert" className={styles.error}>{errors.title.message}</p>}
                        </div>
                        <div className={styles.formGroup}>
                        <textarea
                            className={styles.formControl}
                            id="description"
                            maxLength={255}
                            {...register('description', {
                                required: 'Description is required',
                                minLength: {
                                    value: 3,
                                    message: "Description cannot be shorter than 3 letter",
                                },
                                maxLength: {
                                    value: 255,
                                    message: 'Description must be less than 255 characters'
                                }
                                , validate: (value) => {
                                    if (value.trim().length <= 0)
                                        return "Description is required"
                                }
                            })}
                            aria-invalid={errors.description ? 'true' : 'false'}
                        />
                            <label htmlFor="description">Description</label>

                            {errors.description &&
                                <p role="alert" className={styles.error}>{errors.description.message}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <select
                                id="priority"
                                className={styles.formControl}
                                defaultValue="1"
                                {...register('priority', {
                                    required: 'Priority is required',
                                    min: {
                                        value: 1,
                                        message: 'Priority must be at least Low'
                                    },
                                    max: {
                                        value: 4,
                                        message: 'Priority must be at most Urgent'
                                    }
                                })}
                                aria-invalid={errors.priority ? 'true' : 'false'}
                            >
                                <option className={styles.option} value="1">Low</option>
                                <option value="2">Normal</option>
                                <option value="3">High</option>
                                <option value="4">Urgent</option>
                            </select>
                            <label htmlFor="priority">Priority</label>

                            {errors.priority && <p role="alert" className={styles.error}>{errors.priority.message}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <input
                                className={styles.formControl}
                                id="due-date"
                                type="datetime-local"
                                {...register('due_date', {
                                    required: 'Due date is required',
                                    validate: validateDate
                                })}
                                aria-invalid={errors.due_date ? 'true' : 'false'}
                            />
                            <label htmlFor="due-date">Due date</label>

                            {errors.due_date && <p role=" alert" className={styles.error}>{errors.due_date.message}</p>}
                        </div>

                        <button type="submit" disabled={isFetching} className={styles.submitBtn}>{selectedTask ? 'Edit' : 'Create'}</button>
                    </div>
                </form>
                <div className={styles.taskPlaceholders}>
                    {title && (
                        <h1>{title}</h1>
                    )}
                    {description && (
                        <p>{description}</p>
                    )}
                    {priority && title && description && (
                        <span>{currentPriority?.priority}</span>
                    )}
                    {due_date && (
                        <span>{parseDate()}</span>
                    )}
                </div>
            </div>
        </>

    );
};

export default TaskFormComponent;
