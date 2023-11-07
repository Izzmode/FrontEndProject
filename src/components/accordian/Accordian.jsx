import React from 'react'
import { useState } from 'react';
import './accordian.css'

const Accordian = ({ title, content }) => {

  const [isActive, setIsActive] = useState(false);


  return (
    <div className="accordion">
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div className='accordion-title-div'>{title}</div>
        <div>{isActive ? 'v' : '>'}</div>
      </div>
          <div className='test'>
          {isActive && Array.isArray(content) && (
            content.map((item, index) => (
              <ul className="accordion-content" key={index}>
               <li>{item.content}</li>
              </ul>
            )))}
          {isActive && typeof content === 'string' && (<div className="accordion-content">
              <p>{content}</p>
              </div>)}
              </div>
    </div>
  </div>
  )
}

export default Accordian