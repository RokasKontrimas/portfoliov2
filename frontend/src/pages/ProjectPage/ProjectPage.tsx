import { useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from '../../lib/axios.tsx';
import {AxiosError} from "axios";
import useAuthContext from '../../hooks/useAuthContext.tsx';
import LabelComponent from '../../components/LabelComponent/LabelComponent.tsx';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import toast from "react-hot-toast";
import LabelFormComponent from "../../components/LabelFormComponent/LabelFormComponent.tsx";
import styles from './ProjectPage.module.scss';
import {Helmet} from "react-helmet-async";

const ProjectPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [labels, setLabels] = useState<Label[] | null>(null);
    const {csrf} = useAuthContext();
    const [isOpenLabelForm, setIsOpenLabelForm] = useState(false)
    const [projectTitle, setProjectTitle] = useState('')
    type Task = {
        id: number;
        title: string;
        description: string;
        priority: number;
        status: number;
        due_date: string;
    };

    type Label = {
        id: number;
        name: string;
        tasks: Task[];
    };

    const getLabels = async () => {
        await csrf();
        try {
            const res = await axios.get(`api/labels/${id}?_embed[]=tasks`);
            setLabels(res.data.labels);
            setProjectTitle(res.data.projectTitle);
        } catch (e) {
            const error = e as AxiosError;
            if (error.response?.status === 404) {
                navigate('/not-found');
            }
        }
    };

    useEffect(() => {
        getLabels();
    },[]);

    const handleDropTask = async (taskId: number, labelId: number) => {
        try {
            // Make API call to change task status
            const res = await axios.patch(`/api/change-status/${taskId}`, {
                newLabel: labelId,
                projectId: id
            });

            // After successful API call, update labels state
            if (res.status === 200) {
                toast.success(res.data.message);
                await getLabels();
            }
        } catch (e) {
            const error = e as AxiosError;
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat().join(' ');
                toast.error(errorMessages);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    };
    const handleCloseForm = (value: boolean) => {
        setIsOpenLabelForm(value); // Update isOpenLabelForm state
    };
    if (!labels) {
        return <h1>Loading..</h1>;
    }

    return (
        <div className={styles.projectBody}>
            <Helmet title={`${import.meta.env.VITE_APP_TITLE} ${projectTitle}`}/>
            <div className={styles.projectWrapper}>
                <DndProvider backend={HTML5Backend}>
                    <div className={styles.labelsWrapper}>
                        <div className={styles.createLabel}>
                            {isOpenLabelForm ? (
                                <LabelFormComponent
                                    isFormOpened={handleCloseForm}
                                    projectId={id}
                                    getLabels={getLabels}/>
                            ) : (
                                <button
                                    className={styles.createLabelButton}
                                    role="button"
                                    onClick={() => setIsOpenLabelForm(true)}
                                >New label</button>
                            )}
                        </div>
                        {labels.map((label: Label) => (
                            <LabelComponent
                                key={label.id}
                                label={label}
                                onDropTask={handleDropTask}
                                projectId={id}
                                getLabels={getLabels}/>
                        ))}
                    </div>
                </DndProvider>
            </div>
        </div>
    );
};

export default ProjectPage;
