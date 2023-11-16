import { useAuth } from "../context/AuthContext"
import { useModal } from "../context/ModalContext"
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
    const { jwtToken, loginComplete } = useAuth();
    const { openModal } = useModal();
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
      const handleNavigation = async () => {
        if (!token ) {
          console.log('hej')
          await openModal('login');
          setShouldNavigate(true);
        }
      };
      handleNavigation();
    }, [jwtToken, openModal]);

  
    return shouldNavigate ? <Navigate to="/" /> : jwtToken ? children : null;
  };

export default ProtectedRoute