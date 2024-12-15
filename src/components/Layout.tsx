import { useNavigate } from 'react-router-dom';
import { LayoutProps } from '../types';
import Navbar  from './Navbar';

const Layout = ({ children }:LayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <>
    <div className="container-fluid p-0">
      <Navbar handleLogout={handleLogout} />
      <div className="m-4">{children}</div>
      </div>
    </>
  );
};

export default Layout;
