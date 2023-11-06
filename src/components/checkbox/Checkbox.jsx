import React from 'react'
import './checkbox.css'
import { useState } from 'react'

const Checkbox = ({ label, checked }) => {

  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="checkbox-wrapper">
    <label>
      <input 
      type="checkbox" 
      checked={isChecked} 
      onChange={() => setIsChecked((prev) => !prev)} 
      className={isChecked ? 'checked' : ''}/>
      <span>{label}</span>
    </label>
  </div>
  )
}

export default Checkbox