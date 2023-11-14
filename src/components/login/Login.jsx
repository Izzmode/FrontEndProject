import React, { useState } from 'react'
import { useModal } from '../../context/ModalContext'
import { useAuth } from '../../context/AuthContext'
import './login.css'

const Login = () => {

  const { closeModal, openModal } = useModal();
  const { loginUser } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const userData = await loginUser(formData);
      // If login is successful, close the modal
      closeModal();
      window.location.reload();
    } catch (error) {
      // If there's an error, set the error state
      setError('Invalid credentials');
    }
  };

  const handleRegisterClick = () => {
    closeModal();
    openModal('registerUser');
  };




  return (
    <div className='Login'>
      <div className='login-modal'>
        <h1>Login</h1>
        <p>Welcome back to TechSpace!</p>

        <form action="">
            <label htmlFor="email">Email address</label>
            <input 
            type="text" 
            // id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}/>

            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            // id='password' 
            name='password' 
            value={formData.password}
            onChange={handleInputChange}/>
        </form>
        {error && <p className="error-message" style={{ color: 'red'}}>{error}</p>}


        <div className='link-register'>
          <p>Don't have an account?<a className='register-link' onClick={handleRegisterClick}> Sign up here</a></p>
          <button className='btn btn-login' onClick={handleLogin}>LOG IN</button>
        </div>
        <button className='btn-close' onClick={closeModal}>CLOSE</button>
        </div>
    </div>
  )
}

export default Login