import React from 'react'
import { useState } from 'react';
import Select from 'react-select';


const CallToAction = () => {

    const optionsLocation = [
        { value: 'option1', label: 'Centrum' },
        { value: 'option2', label: 'Kungsholmen' },
        { value: 'option2', label: 'Solna' },
        { value: 'option2', label: 'Söder' },
      ];
    const optionsQuantity = [
        { value: '5-10', label: '5-10 attendees' },
        { value: '10-30', label: '10-30 attendees' },
        { value: '30-60', label: '30-60 attendees' },
        { value: '60+', label: '60+ attendees' },
      ];

      const customStyles = {
        control: (provided) => ({
          ...provided,
          background: '#171717',
          border: 'none',
          outline: 'none',
          borderRadius: '8px',
          width: '250px'

        //   padding: '0.5rem 1rem'
        }),
        indicatorSeparator: () => ({
            display: 'none',
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: '#171717',
            borderRadius: '0px 0px 8px 8px',
            
          }),
          option: (provided, { isSelected, isFocused }) => ({
            ...provided,
            backgroundColor: isSelected ? '#171717' : 'transparent',
            '&:hover': {
              backgroundColor: isFocused ? '#2F2F2F' : 'transparent', // Add your hover color
            },
            color: isFocused ? 'white' : 'white', // Add your desired color for focused and unfocused options
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white', // Text color for selected option
          }),
      };

  return (

    
    <div className='CTA'>
        {/* <div className='test'> */}
        <h1>Book Your Next Tech Event Here!</h1>
        <div className='cta-container'>
        <div className="dropdowns">
            <div className="dropdownOne">
            <label htmlFor="location">Location</label>
            <Select placeholder="Select Location" options={optionsLocation} styles={customStyles} />
            </div>
            <div className="dropdownTwo">
                <label htmlFor="quantity">Attendees</label>
                <Select placeholder="Quantity" options={optionsQuantity} styles={customStyles} />
            </div>
        </div>
        <button className='btn-search'>SEARCH</button>
        </div>
        {/* </div> */}
        </div>

  )
}

export default CallToAction