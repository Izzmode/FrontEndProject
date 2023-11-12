import React from 'react'
import './checkbox.css'
import { useState, useEffect } from 'react'

const Checkbox = ({ label, checked, onChange }) => {

  const [isChecked, setIsChecked] = useState(
    localStorage.getItem('catering') === true ? true : false
  );

  // const handleCheckboxChange = () => {
  //   const newCheckedValue = !isChecked;
  //   setIsChecked(newCheckedValue);
  //   onChange(newCheckedValue); // Notify the parent component of the change
  // };

  // const [checkedCatering, setCheckedCatering] = useState(false)

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked)
  //   const updatedValue = !isChecked
  //   localStorage.setItem('catering', updatedValue )
  //   console.log(updatedValue)
  // };

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
      // onChange={() => setIsChecked((prev) => !prev)} 
      className={isChecked ? 'checked' : ''}/>
      <span>{label}</span>
    </label>
  </div>
  )
}

export default Checkbox