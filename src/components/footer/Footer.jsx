import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import './footer.css'


const Footer = () => {
  return (
    <div className='Footer'>
        <div className='footer-top'>
            <Link to="/">
                <img src="src\images\techspace-logo-white.png" alt="techspace" width="120" height="30"/>
            </Link>
            <ul className="nav-links">
                  <li><NavLink to={`/venues`} className='nav-link'>All venues</NavLink></li>
                  <li><a className='nav-link' href="#about-us">About Us</a></li>
                  <li><a className='nav-link' href="#contact-us">Contact Us</a></li>
                  <li><NavLink to={`/venues`} className="nav-link">Log in</NavLink>
                  </li>
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
    </div>
  )
}

export default Footer