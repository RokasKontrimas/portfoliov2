import React, {useEffect, useRef, useState} from 'react'
import styles from './TaskCommentsSection.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "../../lib/axios.tsx";
import toast from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply} from "@fortawesome/free-solid-svg-icons";
import useAuthContext from "../../hooks/useAuthContext.tsx";

type Task = {
    id: number;
    comments: Comment[];
};

type User = {
    id: number;
    name: string;
};
type TaskCommentsSectionProps = {
    task: Task;
    getLabels: () => void;
};
type Comment = {
    id: number;
    user: User;
    comment: string;
    created_at: string;
};
type FormData = {
    comment: string;
    task_id: number;
};
const TaskCommentsSection: React.FC<TaskCommentsSectionProps> = ({task, getLabels}) => {
    const [isFetching, setIsFetching] = useState(false)
    const {register, reset, handleSubmit, setFocus, formState: {errors}} = useForm<FormData>();
    const detailsRef = useRef<HTMLDetailsElement>(null);
    const {user} = useAuthContext();
    const formSubmit: SubmitHandler<FormData> = async (data) => {
        data.task_id = task.id
        setIsFetching(true)
        try {
            const res = await axios.post('/api/write-comment', data
            )
            if (res.status === 201) {
                getLabels()
                toast.success(res.data.message)
            }
        } catch (e) {
            toast.error(e)
        } finally {
            reset()
            setIsFetching(false)
        }
    }
    useEffect(() => {
        const handleToggle = () => {
            if (detailsRef.current?.open) {
                setFocus('comment');
            }
        };
        const detailsElement = detailsRef.current;
        detailsElement?.addEventListener('toggle', handleToggle);
        return () => {
            detailsElement?.removeEventListener('toggle', handleToggle);
        };
    }, [setFocus]);
    return (
        <>
            <details ref={detailsRef} className={styles.commentsDetails}>
                <summary>
                    View comments ({task.comments.length})
                </summary>
                {task.comments.length > 0 ? (
                    <div className={styles.commentsWrapper}>
                        {task.comments.map((comment) => {
                            return (
                                <div className={styles.commentItem} key={comment.id}>
                                    <div className={styles.commentInfo}>
                                        <span
                                            className={styles.commentAuthor}>{comment.user.name} {comment.user.id === Number(user.id) && '(you)'}</span>
                                        <span>{comment.created_at}</span>
                                    </div>
                                    <p>{comment.comment}</p>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className={styles.emptyComments}>No comments yet :(</p>
                )}
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className={styles.commentInput}>
                    <textarea
                        rows={10}
                        maxLength={255}
                        placeholder="Comment something..."
                        {...register('comment', {
                            required: "Type something...",
                            maxLength: {value: 255, message: "Comment cannot be longer than 255 characters!"},
                            validate: value => {
                                if (value.trim().length === 0) {
                                    return "comment cannot be empty!";
                                }
                                return
                            }
                        })}
                        aria-invalid={errors.comment ? 'true' : 'false'}
                    />
                        <button disabled={isFetching} type='submit'><FontAwesomeIcon icon={faReply}/>
                        </button>
                    </div>
                    {errors.comment && (<p role="alert" className={styles.error}>{errors.comment.message}</p>)}

                </form>
            </details>
        </>
    )
}
export default TaskCommentsSection
