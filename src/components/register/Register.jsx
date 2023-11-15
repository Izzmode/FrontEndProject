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

      if(!formData.emailReg || !formData.passwordReg || !formData.passwordAgain){
        setError('You need to enter all fields')
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
        <h1>Sign Up</h1>
        <p>You're just one step away from joining the TechSpace Community!</p>

        <form action="">
            <label htmlFor="email">Email address *</label>
            <input 
            type="text" 
            name='emailReg'
            value={formData.emailReg}
            onChange={handleInputChange}/>

            <section className='password-section'>
            <div className='form-group'>
            <label htmlFor="password">Password *</label>
            <input 
            type="password" 
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
            <button 
            className='btn btn-login' 
            onClick={handleRegister}
            disabled={!formData.emailReg || !formData.passwordReg || !formData.passwordAgain} >SIGN UP</button>
        </form>
        {error && <p className="error-message" style={{ color: 'red'}}>{error}</p>}


        <button className='btn-close' onClick={closeModal}>CLOSE</button>
        </div>

    </div>
  )
}

export default Register
