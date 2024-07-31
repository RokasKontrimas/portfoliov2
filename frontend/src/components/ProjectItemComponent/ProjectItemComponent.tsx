import {Link} from "react-router-dom";
import styles from './ProjectItemComponent.module.scss';

type ProjectItemProps = {
    project: {
        title: string;
        id: number;
        tasks: [];
        creator?: {
            name: string;
        };
    };
};
const ProjectItemComponent = ({project}: ProjectItemProps) => {
    const {title, tasks, creator, id} = project;
    return (
        <Link
            className={styles.linkButton}
            to={{
                pathname: `/projects/${id}`,

            }} state={{title: title}}
        >
            <span className={styles.projectAuthor}>Author: {creator?.name}</span>
            <h2 className={styles.projectTitle}>{title}<span>({tasks.length})</span></h2>
        </Link>
    )
}
export default ProjectItemComponent
