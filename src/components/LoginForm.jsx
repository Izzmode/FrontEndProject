import React, { useEffect } from 'react'
import FormInput from './FormInput'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  
  const [errors, setErrors] = useState({})

  const [submitted, setSubmitted] = useState(false)

  navigate = useNavigate();


    const [formData, setFormData,] = useState({
      email: '',
      password: ''
    })
  
    const handleChange = e => {
      const { id, value } = e.target
      setFormData(formData => {
        return {
          ...formData,
          [id]: value
        }
      })
    }

  
    const handleSubmit = async e => {
      e.preventDefault()

      if(!validateLogin(formData, setErrors)){
        return
      }
      
      await dispatch(loginUser(formData))
      setSubmitted(true)

    }
    
    useEffect(() => {
      if(user !== null){
        navigate("/venues")
      } 
      
    }, [ submitted, user])
  
  
    return (
      <form noValidate onSubmit={handleSubmit}>
      <FormInput
      id="email"
      type="email"
      label="Email*"
      value={formData.email}
      onChange={handleChange}
      errorMsg={errors.email}
      />
      <FormInput
      id="password"
      type="password"
      label="Password*"
      value={formData.password}
      onChange={handleChange}
      errorMsg={errors.password}
      />

      <button className='login-btn'>Submit</button>
      </form>
    )
}

export default LoginForm