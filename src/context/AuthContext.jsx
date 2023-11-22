import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(null);
  const [loginComplete, setLoginComplete] = useState(false);
  const [user, setUser] = useState(false)

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

          //change this??
          const userData = await res.text()
          setJwtToken(userData)
          setUser(true)
          localStorage.setItem('token', userData)

        } else {
          throw new Error('Invalid credentials');
        }
      }
      catch(error) {
      console.error('Login error:', error.message);
      throw error; 
    } finally {
      setLoginComplete(true);
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
        console.log('Received token:', regUser);
        setJwtToken(regUser)
        setUser(true)
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
    setJwtToken(null);
    localStorage.removeItem('token');
    setUser(false)
  };

  


  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
       // Decode the token to get its expiration date
    const decodedToken = jwtDecode(storedToken);
    const expirationDate = new Date(decodedToken.exp * 1000);
    // Check if the token is expired
    if (expirationDate <= new Date()) {
      // Token is expired, remove it from local storage
      localStorage.removeItem('token');
      setJwtToken(null);
    } else {
      // Token is still valid
      setJwtToken(storedToken);
    }
  }
  }, []); 


  return (
    <AuthContext.Provider value={{ jwtToken: jwtToken || false, loginUser, registerUser, logout, loginComplete }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
