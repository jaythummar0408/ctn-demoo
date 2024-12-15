export interface User {
    username: string;
    email: string;
    password: string;
    confirmPassword: string; 
    dob: string;
    gender: string;
    mobile: string;
  }
  
  export interface PrivateRouteProps {
    children: JSX.Element;
  }

  export 
  interface EditAccountModalProps {
    user: User | null;
    showModal: boolean;
    onClose: () => void;
    onSave: any;
  }

  export interface LayoutProps {
    children: JSX.Element;
  }

  
export interface DeleteConfirmationModalProps {
  showModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}