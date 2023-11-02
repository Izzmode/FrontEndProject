import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';


const CallToAction = () => {

  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);

    const optionsLocation = [
        { value: 'Centrum', label: 'Centrum' },
        { value: 'Kungsholmen', label: 'Kungsholmen' },
        { value: 'Solna', label: 'Solna' },
        { value: 'Södermalm', label: 'Södermalm' },
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

      const handleLocationChange = (selectedOption) => {
        setSelectedLocation(selectedOption);
      };
    
      const handleQuantityChange = (selectedOption) => {
        setSelectedQuantity(selectedOption);
      };

      const handleSearch = () => {
      // console.log(isSelected)
      if (selectedLocation && selectedQuantity) {
        // Construct the URL with selected values
        navigate(`/selectvenues?location=${selectedLocation.value}&quantity=${selectedQuantity.value}`);

        // navigate('/selectvenues')
      }}

  return (

    
    <div className='CTA'>
        {/* <div className='test'> */}
        <h1>Book Your Next Tech Event Here!</h1>
        <div className='cta-container'>
        <div className="dropdowns">
            <div className="dropdownOne">
            <label htmlFor="location">Location</label>
            <Select 
            placeholder="Select Location" 
            options={optionsLocation} 
            styles={customStyles}
            onChange={handleLocationChange}
            value={selectedLocation} />
            </div>
            <div className="dropdownTwo">
                <label htmlFor="quantity">Attendees</label>
                <Select 
                placeholder="Quantity" 
                options={optionsQuantity} 
                styles={customStyles}
                onChange={handleQuantityChange} // Add this
                value={selectedQuantity} />
            </div>
        </div>
        <button className='btn-search' onClick={handleSearch}>SEARCH</button>
        </div>
        {/* </div> */}
        </div>

  )
}

export default CallToAction