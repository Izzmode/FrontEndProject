import React from 'react'
import { useState } from 'react';

const Accordian = ({ title, content }) => {

  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? 'v' : '>'}</div>
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  </div>
  )
}

export default Accordian