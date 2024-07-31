import {Toaster} from 'react-hot-toast';
import {Route, Routes} from 'react-router-dom';
import AuthLayout from './components/layout/AuthLayout';
import GuestLayout from './components/layout/GuestLayout';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ErrorBoundary from './components/ErrorBoundary';
import ProjectPage from "./pages/ProjectPage/ProjectPage.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage.tsx";
import Navbar from "./components/ui/NavBar/Navbar.tsx";
import PortfolioPageV2 from "./pages/PortfolioPage/PortfolioPage-v2.tsx";

export default function App() {
    return (
        <>
            <Routes>
                <Route
                    element={
                        <ErrorBoundary>
                            <AuthLayout/>
                        </ErrorBoundary>
                    }
                >
                <Route path="projects/:id" element={<ProjectPage/>}/>
                </Route>
                <Route
                    element={
                        <ErrorBoundary>
                            <GuestLayout/>
                        </ErrorBoundary>
                    }
                >
                    <Route path="/projects" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/password-reset/:token" element={<ResetPassword/>}/>
                </Route>
                <Route path='*' element={<NotFound/>}/>
                <Route path="/" element={<PortfolioPage/>}/>
                <Route path="/2" element={<PortfolioPageV2/>}/>
            </Routes>
            <Toaster position="top-right" toastOptions={{duration: 2000}}/>
        </>
    );
}
