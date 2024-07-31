import { Outlet, Navigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';

export default function GuestLayout() {
  const { user, sessionVerified } = useAuthContext();

  if (sessionVerified && !user) {
    return (
        <span>Authenticating...</span>
    );
  }

  return !user ? <Outlet /> : <Navigate to={'/'} />;
}
