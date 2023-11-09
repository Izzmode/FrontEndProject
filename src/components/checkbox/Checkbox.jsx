import React from 'react'
import './checkbox.css'
import { useState } from 'react'

const Checkbox = ({ label, checked, onChange }) => {

  const [isChecked, setIsChecked] = useState(checked)

  const handleCheckboxChange = () => {
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue);
    onChange(newCheckedValue); // Notify the parent component of the change
  };

  return (
    <div className="checkbox-wrapper">
    <label>
      <input 
      type="checkbox" 
      checked={isChecked} 
      onChange={handleCheckboxChange}
      // onChange={() => setIsChecked((prev) => !prev)} 
      className={isChecked ? 'checked' : ''}/>
      <span>{label}</span>
    </label>
  </div>
  )
}

export default Checkbox