import React from 'react'
import './checkbox.css'
import { useState, useEffect } from 'react'

const Checkbox = ({ label, checked, onChange }) => {

  const [isChecked, setIsChecked] = useState(
    localStorage.getItem('catering') === true ? true : false
  );

  useEffect(() => {
    // Update localStorage whenever the state changes
    localStorage.setItem('catering', isChecked);
  }, [isChecked]);

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