import React from 'react'
import Select from 'react-select';
import { useState } from 'react'
import './inputs.css'

const LocationInput = ({ selectedLocation, setSelectedLocation }) => {


    const optionsLocation = [
        { value: 'Centrum', label: 'Centrum' },
        { value: 'Kungsholmen', label: 'Kungsholmen' },
        { value: 'Solna', label: 'Solna' },
        { value: 'Södermalm', label: 'Södermalm' },
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

      const handleLocationChange = (selectedOption) => {
        setSelectedLocation(selectedOption);
      };
 

  return (
    <div className="LocationInput">
        <label htmlFor="location">Location</label>
        <Select 
        placeholder="Select Location" 
        options={optionsLocation} 
        styles={customStyles}
        onChange={handleLocationChange}
        value={selectedLocation} />
    </div>
  )
}

export default LocationInput