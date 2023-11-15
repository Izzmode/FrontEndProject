import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './footer.css'
import Login from '../login/Login';
import Register from '../register/Register';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';


const Footer = () => {

  const { currentModal, closeModal, openModal } = useModal();
  const { jwtToken } = useAuth();

  const handleLogin = () => {
    openModal('login')
  }

  return (
    <div className='Footer'>
        <div className='footer-top'>
            <Link to="/">
                <img src="src\images\techspace-logo-white.png" alt="techspace" width="120" height="30"/>
            </Link>
            <ul className="nav-links">
                  <li><NavLink to={`/venues`} className='nav-link'>All venues</NavLink></li>
                  <li><HashLink to={'/#about-us'} className='nav-link' href="#about-us">About Us</HashLink></li>
                  <li><HashLink to={'/#contact-us'} className='nav-link' href="#contact-us">Contact Us</HashLink></li>
                  { !jwtToken && <li className="nav-link" onClick={handleLogin}>Login</li>}
                </ul>


                <div className='icons-footer'>
                    <img src="src\images\icon-insta.png" alt="instagram icon" />
                    <img src="src\images\icon-facebook.png" alt="facebook icon" className='fb-icon'/>
                </div>
        </div>
        <hr />
        <div className='footer-bottom'>
            <div className='filler'></div>
            <p>All rights reserved copyright</p>
            <div className='icons-footer'>
                    <img src="src\images\visa-logo.png" alt="instagram icon" />
                    <img src="src\images\PayPal.png" alt="facebook icon"/>
                    <img src="src\images\klarna-logo.png" alt="facebook icon"/>
                </div>
        </div>
        {currentModal === 'login' && <Login />}
        {currentModal === 'registerUser' && <Register />}
    </div>
  )
}

export default Footer