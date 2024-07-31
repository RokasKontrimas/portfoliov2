import React, {useState} from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "../../lib/axios.tsx";
import toast from "react-hot-toast";
import styles from './LabelFormComponent.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

type LabelProps = {
    projectId: number,
    getLabels: () => void;
    isFormOpened: (value: boolean) => void;
}
type Label = {
    name: string,
    project_id: number
}
const LabelFormComponent: React.FC<LabelProps> = ({isFormOpened, projectId, getLabels}) => {
    const {register, reset, handleSubmit, watch, formState: {errors}} = useForm<Task>();
    const [isFetching, setIsFetching] = useState(false)
    const labelName = watch('name');
    const onSubmit: SubmitHandler<Label> = async data => {
        setIsFetching(true)
        if (isFetching) return
        data.project_id = projectId
        try {
            const res = await axios.post('api/create-label', data)
            if (res && res.status === 201) {
                getLabels()
                reset()
                toast.success(res.data.message);
                isFormOpened(false)
            }
        } catch (e) {
            if (e.response || e.response.status === 429) {
                toast.error(e.response.data.message)
            }
        } finally {
            setIsFetching(false)
        }

    }
    return (
        <>
            <button className={styles.closeForm} onClick={() => isFormOpened(false)}><FontAwesomeIcon icon={faClose}/>
            </button>
            <p className={styles.labelName}>{labelName}</p>
            <form className={styles.labelForm} onSubmit={handleSubmit(onSubmit)}>
                <input
                    autoFocus={true}
                    maxLength={100}
                    className={styles.labelInput}
                    type="text"
                    id="label-title"
                    placeholder="Label title"
                    {...register('name',
                        {
                            required: 'Title is required',
                            maxLength: {
                                value: 100,
                                message: 'Title must be less than 100 characters'
                            },
                            minLength: {
                                value: 3,
                                message: 'Title must be at least 3 letter length'
                            },
                            validate: value => {
                                if (value.trim().length <= 0) {
                                    return 'Label title cannot be empty!'
                                }
                            }
                        })}
                    aria-invalid={errors.title ? 'true' : 'false'}
                />
                {errors.name && <p role="alert" className={styles.error}>{errors.name.message}</p>}
                <button
                    type="submit"
                    disabled={isFetching || errors.name}
                    className={styles.buttonSubmit}
                >
                    Create
                </button>
            </form>
        </>
    )
}
export default LabelFormComponent
