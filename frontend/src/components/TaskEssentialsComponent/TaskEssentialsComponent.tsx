import React, {useState} from 'react'
import styles from "../TaskComponent/TaskComponent.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import useAuthContext from "../../hooks/useAuthContext.tsx";
import ModalPopupComponent from "../shared/modalPopupComponent/ModalPopupComponent.tsx";

type Assignee = {
    id: number;
    name: string;
}
type Task = {
    id: number;
    created_by: number;
};
type EssentialsProps = {
    task: Task;
    assignees: [];
    isFetching: boolean;
    projectId: number;
    onTaskDelete: (value: object) => void;
    handleTaskEdit: (value: object) => void;
    handleAssignTask: (taskId: number | null | undefined) => void;
    handleAssigneeRemove: (taskId: number | null | undefined) => void;
}
const TaskEssentialsComponent: React.FC<EssentialsProps> = (
    {
        task,
        projectId,
        assignees,
        isFetching,
        onTaskDelete,
        handleTaskEdit,
        handleAssignTask,
        handleAssigneeRemove
    }
) => {
    const [modalIsOpened, setModalIsOpened] = useState(false)
    const {user} = useAuthContext();
    const assignTaskHandler = () => {
        handleAssignTask(task.id)
    }
    const removeTaskAssigneeHandler = () => {
        handleAssigneeRemove(task.id)
    }
    const modalOpenHandler = () => {
        setModalIsOpened(!modalIsOpened)
        console.log(modalIsOpened)
    }
    const taskDeleteHandler = () => {
        const data = {
            project_id: projectId,
            task_id: task.id,
        }
        onTaskDelete(data)
    }
    const taskEditHandler = () => {
        handleTaskEdit(task)
    }
    return (
        <div className={styles.settingsWrapper}>
            {assignees.find((assignee: Assignee) => assignee.id === Number(user?.id)) ? (
                <button className={`${styles.btn} ${styles.btnRemove}`} onClick={removeTaskAssigneeHandler}
                        disabled={isFetching}>Remove from assignees</button>
            ) : (
                <button className={`${styles.btn} ${styles.btnAdd}`} onClick={assignTaskHandler}
                        disabled={isFetching}>Assign self task</button>
            )}
            {task.created_by === Number(user.id) && (
                <div className={styles.functionsWrapper}>

                    <FontAwesomeIcon
                        className={styles.editButton}
                        aria-disabled={isFetching}
                        onClick={() => taskEditHandler()}
                        icon={faPen}
                        title="Edit"
                    />
                    <FontAwesomeIcon
                        className={styles.trashButton}
                        aria-disabled={isFetching}
                        onClick={() => modalOpenHandler()}
                        icon={faTrash}
                        title="Remove"
                    />

                </div>
            )}
            <ModalPopupComponent isOpen={modalIsOpened} classes={'confirmPopup'}>
                <div className={styles.popupWrapper}>

                <span className={styles.popupTitle}>Delete this item?</span>
                <div className={styles.buttonsWrapper}>
                    <button onClick={() => taskDeleteHandler()}>Confirm</button>
                    <button onClick={() => setModalIsOpened(!modalIsOpened)}>Cancel</button>
                </div>
                </div>
            </ModalPopupComponent>
        </div>
    )
}
export default TaskEssentialsComponent
