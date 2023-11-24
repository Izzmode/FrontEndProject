import React from 'react'
import './checkbox.css'
import { useState, useEffect } from 'react'

const Checkbox = ({ label, initState, identifier }) => {

  const [isChecked, setIsChecked] = useState(
    initState
    
    // localStorage.getItem(identifier) === 'true' ? true : initState
  );

  useEffect(() => {
    // Update localStorage whenever the state changes
    localStorage.setItem(identifier, isChecked);
  }, [isChecked, identifier]);

  const handleCheckboxChange = () => {
    // Update state based on the current state
    setIsChecked((prevChecked) => !prevChecked);
  };

  return (
    <div className="checkbox-wrapper">
    <label>
      <input 
      type="checkbox" 
      checked={isChecked} 
      onChange={handleCheckboxChange}
      className={isChecked ? 'checked' : ''}/>
      <span>{label}</span>
    </label>
  </div>
  )
}

export default Checkbox