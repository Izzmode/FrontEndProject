import React from 'react'

const Login = () => {
  return (
    <div className='Login'>
        <h1>Login</h1>
        <p>Welcome back to TechSpace!</p>
        <form action="">
            <label htmlFor="login-email">Email address</label>
            <input type="text" id='login-email'/>
            <label htmlFor="login-password">Password</label>
            <input type="password" id='login-password' />
        </form>
    </div>
  )
}

export default Login