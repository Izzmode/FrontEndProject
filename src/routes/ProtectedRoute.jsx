import { useAuth } from "../context/AuthContext"
import { useModal } from "../context/ModalContext"
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
    const { jwtToken, loginComplete } = useAuth();
    const { openModal } = useModal();
    const location = useLocation();
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
      const handleNavigation = async () => {
        if (!jwtToken && loginComplete) {
          await openModal('login');
          setShouldNavigate(true);
        }
      };
  
      handleNavigation();
    }, [jwtToken, openModal, loginComplete]);
  
    return shouldNavigate ? <Navigate to="/" /> : jwtToken ? children : null;
  };

export default ProtectedRoute