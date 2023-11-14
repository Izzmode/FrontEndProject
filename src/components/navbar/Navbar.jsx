import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { HashLink } from 'react-router-hash-link';
import {  FaUserAlt } from "react-icons/fa";
import './navbar.css'
import Login from '../login/Login';
import Register from '../register/Register';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';


const Navbar = () => {
  const { currentModal, closeModal, openModal } = useModal();
  const { jwtToken, logout } = useAuth();

  const handleLogin = () => {
    openModal('login')
  }

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="Navbar">
              {currentModal === 'login' && <Login />}
              {currentModal === 'registerUser' && <Register />}
              <div className="container">
                <Link to="/">
                  <h1><img src="src\images\techspace-logo.png" alt="techspace" width="120" height="30" /></h1>
                </Link>
                <ul className="nav-links">
                  <li><NavLink to={`/venues`} className='nav-link'>All venues</NavLink></li>
                  <li><HashLink to={'/#about-us'} className='nav-link'>About us</HashLink></li>
         
                  {jwtToken ? ( 
                  <div className='navbar-loggedIn'>
                    <NavLink to={`/profile`} className='nav-user-icon'><span> <FaUserAlt className='nav-user-icon'/></span></NavLink>
                    <li className="nav-link" onClick={handleLogout}>Logout</li>
                  </div>
                  ) : (
                  <li className="nav-link" onClick={handleLogin}>Login</li>
                  )}

                </ul>
              </div>

            </div>
          );
}

export default Navbar
