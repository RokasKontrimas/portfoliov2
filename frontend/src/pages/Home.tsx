import {useEffect} from 'react';
import useAuthContext from '../hooks/useAuthContext';
import toast from 'react-hot-toast';
import ProjectsListComponent from "../components/ProjectsListComponent/ProjectsListComponent.tsx";
import {Helmet} from "react-helmet-async";

export default function Home() {

    const {user, status, loading} = useAuthContext();
    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);


    if (loading) {
        return <h1>Loading..</h1>;
    }

    return (
        <>
            <Helmet title={`${import.meta.env.VITE_APP_TITLE} Projects / List`}/>
            <h1>
                Welcome back, <span>{user?.name}</span>!
            </h1>
            <ProjectsListComponent/>
        </>
    );
}
