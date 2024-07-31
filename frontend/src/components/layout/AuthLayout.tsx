import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../ui/NavBar/Navbar.tsx';
import useAuthContext from '../../hooks/useAuthContext';

export default function AuthLayout() {
  const { loading, user } = useAuthContext();

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="">
      <Navbar />
          <Outlet />
    </div>
  );
}
