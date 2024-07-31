import {useEffect, useState} from "react";
import axios from "../../lib/axios.tsx";
import useAuthContext from "../../hooks/useAuthContext.tsx";
import ProjectItemComponent from "../ProjectItemComponent/ProjectItemComponent.tsx";
import styles from './ProjectsListComponent.module.scss';

const ProjectsListComponent = () => {

    const [projects, setProjects] = useState<Project[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const {csrf} = useAuthContext()

    type Creator = {
        name: string;
    };
    type Task = {
        id: number,
        title: string,
        description: string,
        priority: number,
        due_date: string
    };

    type Project = {
        id: number;
        title: string;
        description: string;
        creator?: Creator;
        tasks: Task[];
    };
    useEffect(() => {
        const getProjects = async () => {
            csrf()
            try {
                const res = await axios.get('api/projects?_embed[]=creator&_embed[]=tasks')
                if (res.status === 200) {
                    setProjects(res.data.data as Project[]);
                }
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
            }

        }
        if (!projects) {
            getProjects()
        }
    }, []);
    if (loading) {
        return <h1>Loading..</h1>
    }
    return (
        <div className={styles.projectsWrapper}>
            {projects && projects.length > 0 && (
                //projects wrapper
                <div className={styles.projectList}>
                    {projects.map((project: Project) => (
                        //project item
                        <ProjectItemComponent
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
export default ProjectsListComponent
