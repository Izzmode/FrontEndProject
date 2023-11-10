import React, { useState } from 'react'
import { useModal } from '../../context/ModalContext'
import { useAuth } from '../../context/AuthContext'
import './register.css'


const Register = () => {

  const { closeModal, openModal } = useModal();
  const { registerUser } = useAuth();

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    emailReg: '',
    passwordReg: '',
    passwordAgain: '',
  });

  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    try {
      if (formData.passwordReg !== formData.passwordAgain) {
        setError('Passwords do not match');
        return;
      }
      const userData = await registerUser(formData);
      closeModal();

    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div className='Register'>
      <div className='register-modal'>
        <h1>Register</h1>
        <p>Welcome to TechSpace!</p>

        <form action="">
            <label htmlFor="email">Email address *</label>
            <input 
            type="text" 
            // id='emailReg'
            name='emailReg'
            value={formData.emailReg}
            onChange={handleInputChange}/>

            <section className='password-section'>
            <div className='form-group'>
            <label htmlFor="password">Password *</label>
            <input 
            type="password" 
            // id='passwordReg' 
            name='passwordReg' 
            value={formData.passwordReg}
            onChange={handleInputChange}/>
            </div>

            <div className='form-group'>

            <label htmlFor="passwordAgain">Repeat password *</label>
            <input 
            type="password" 
            // id='passwordAgain' 
            name='passwordAgain' 
            value={formData.passwordAgain}
            onChange={handleInputChange}/>
            </div>
            </section>
        </form>
        {error && <p className="error-message" style={{ color: 'red'}}>{error}</p>}


          <button className='btn btn-login' onClick={handleRegister}>REGISTER</button>
        <button className='btn-dark' onClick={closeModal}>CLOSE</button>
        </div>

    </div>
  )
}

export default Register
