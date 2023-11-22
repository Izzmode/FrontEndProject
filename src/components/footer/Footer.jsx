import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './footer.css'
import Login from '../login/Login';
import Register from '../register/Register';
import { useModal } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import iconInsta from '../../images/icon-insta.png';
import iconFacebook from '../../images/icon-facebook.png';
import visaLogo from '../../images/visa-logo.png';
import payPalLogo from '../../images/PayPal.png';
import klarnaLogo from '../../images/klarna-logo.png';
import whiteTechspaceLogo from '../../images/techspace-logo-white.png';
import { FaEnvelope, FaSearch, FaUser } from "react-icons/fa";



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
                <img src={whiteTechspaceLogo} alt="techspace" width="120" height="30"/>
            </Link>
            <ul className="nav-links">
                  <li><NavLink to={`/venues`} className='nav-link'>All venues</NavLink></li>
                  <li><HashLink to={'/#about-us'} className='nav-link' href="#about-us">About Us</HashLink></li>
                  <li><HashLink to={'/#contact-us'} className='nav-link' href="#contact-us">Contact Us</HashLink></li>
                  { !jwtToken && <li className="nav-link" onClick={handleLogin}>Login</li>}
                </ul>


                <div className='icons-footer'>
                    <img src={iconInsta} alt="instagram icon" />
                    <img src={iconFacebook}alt="facebook icon" className='fb-icon'/>
                </div>
        </div>
        <hr />
        <div className='footer-bottom'>
            <div className='filler'></div>
            <p>All rights reserved copyright</p>
            <div className='icons-footer'>
                    <img src={visaLogo} alt="visa logo" />
                    <img src={payPalLogo} alt="paypal logo"/>
                    <img src={klarnaLogo} alt="klarna logo"/>
                </div>
        </div>
        {currentModal === 'login' && <Login />}
        {currentModal === 'registerUser' && <Register />}
        <div className='fixed-menu-mobile'>
      <div className='mobile-icons'>
      <NavLink to={`/venues`} className='icon-link'>
      <div>
      <FaSearch className='icon-mobile'/>
      <p>Venues</p>
      </div>
      </NavLink>
      
      { jwtToken && <NavLink to={`/profile`} className='icon-link'>
      <div>
      <FaUser className='icon-mobile'/>
      <p>Profile</p>
      </div>
      </NavLink> 
      }
      <HashLink smooth to='/#contact-us' className='nav-link'>
        <div>
        <FaEnvelope className='icon-mobile'/>
        <p>Contact</p>
        </div>
      </HashLink>
      </div>
    </div>
    </div>
  )
}

export default Footer