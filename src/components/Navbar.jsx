import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
// import { useShoppingCart } from '../context/ShoppingCartContext';



const Navbar = () => {

    return (
            <div className="Navbar">
              <div className="container">
                <Link to="/">
                  <h1><img src="src\images\techspace-logo.png" alt="techspace" width="120" height="30" /></h1>
                </Link>
                <ul className="nav-links">
                  <li><NavLink to={`/venues`} className='nav-link'>All venues</NavLink></li>
                  <li><NavLink to='/' className='nav-link'>About us</NavLink></li>
                  <li><NavLink to={`/venues`} className="nav-link">Login</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          );
}

export default Navbar