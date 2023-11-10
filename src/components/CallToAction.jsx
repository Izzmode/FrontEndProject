import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import LocationInput from './inputs/LocationInput';
import QuantityInput from './inputs/QuantityInput'
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

const CallToAction = () => {

  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { state, dispatch } = useContext(BookingContext);

  const resetDropdowns = () => {
    dispatch({ type: 'RESET_QUANTITY' });
    setSelectedLocation(null)
  };

  useEffect(() => {
    resetDropdowns();
  }, []);



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

      const handleSearch = () => {
      if (selectedLocation && state.selectedQuantity) {
        navigate(`/selectvenues?location=${selectedLocation.value}&quantity=${state.selectedQuantity.value}`);
        dispatch({ type: 'RESET_QUANTITY' });
      }}

  return (

    
    <div className='CTA'>
        <h1>Book Your Next Tech Event Here!</h1>
        <div className='cta-container'>
        <div className="dropdowns">
          <LocationInput selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
          <QuantityInput />
        </div>
        <button className='btn-search' onClick={handleSearch}>SEARCH</button>
        </div>
        </div>

  )
}

export default CallToAction