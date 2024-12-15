import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; 
import initAdminUser from './utils/initAdminUser';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
initAdminUser();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer/>
    <App />
  </React.StrictMode>
);
