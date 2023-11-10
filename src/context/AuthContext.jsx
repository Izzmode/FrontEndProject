import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

    const loginUser = async (formData) => {

      try {

        const inputUser = {
          email: formData.email,
          password: formData.password
        }
      
        const res = await fetch('http://localhost:9999/api/users/login', {
          method: 'POST',
          body: JSON.stringify(inputUser),
          headers: {
            'content-type': 'application/json'
          }
        })
      
        if (res.ok) {
          const userData = await res.text()
          setUser(userData)
          localStorage.setItem('token', userData)

        } else {
          throw new Error('Invalid credentials');
        }
      }
      catch(error) {
      console.error('Login error:', error.message);
      throw error; 
    }
  };

  const registerUser = async (formData) => {

    try{
      const inputUser = {
        email: formData.emailReg,
        password: formData.passwordReg,
        passwordAgain: formData.passwordAgain,
      }
  
      const res = await fetch('http://localhost:9999/api/users/add', {
        method: 'POST',
        body: JSON.stringify(inputUser),
        headers: {
          'content-type': 'application/json'
        }
      })

      if (res.ok) {
        //regUser data is the jwt in stringform
        const regUser = await res.text()
        setUser(regUser)
        localStorage.setItem('token', regUser)

      } else {
        throw new Error('Invalid credentials');
      }
      
    }
    catch(error) {

        console.error('Login error:', error.message);
        throw error; 
    }
  }
  

  const logout = () => {
    // Your logout logic here.
    setUser(null);
    localStorage.removeItem('token');
  };


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setUser({ token });
    }
  }, []); 


  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
