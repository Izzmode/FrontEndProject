import React from 'react'
import { useState } from 'react';
import Select from 'react-select';

const Dropdowns = () => {

    const options = [
        { value: 'option1', label: 'Centrum' },
        { value: 'option2', label: 'Kungsholmen' },
        { value: 'option2', label: 'Solna' },
        { value: 'option2', label: 'Söder' },
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
            borderRadius: '0px 0px 8px 8px'
          }),
          option: (provided, { isSelected, isFocused }) => ({
            ...provided,
            backgroundColor: isSelected ? 'red' : 'transparent',
            '&:hover': {
              backgroundColor: isFocused ? '#2F2F2F' : 'transparent', // Add your hover color
            },

        }),
      };

  return (
    <Select styles={customStyles} />
  )
}

export default Dropdowns