import { Navigate } from 'react-router-dom';
import Layout from './Layout';
import { toast } from 'react-toastify';
import { PrivateRouteProps } from '../types';

const PrivateRoute = ({ children }:PrivateRouteProps) => {
  const currentUser = localStorage.getItem('currentUser');

  if (!currentUser) {
    toast.error('You must log in to access this page.');
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

export default PrivateRoute;
