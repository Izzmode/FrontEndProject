import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const SearchBarOptions = () => {

  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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
      const optionsPrice = [
        { value: '299', label: '299SEK/h' },
        { value: '399', label: '399SEK/h' },
        { value: '499', label: '499SEK/h' },
        { value: '599', label: '599SEK/h' },
      ];

      const customStyles = {
        control: (provided) => ({
          ...provided,
          background: '#171717',
          border: 'none',
          outline: 'none',
          borderRadius: '8px',
          width: '150px',
          marginTop: '2px'

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
      const handlePriceChange = (selectedOption) => {
        setSelectedPrice(selectedOption);
      };
      const handleDateChange = (date) => {
        setSelectedDate(date);
      };

        const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

      const handleSearch = () => {
      if (selectedLocation && selectedQuantity && selectedPrice && formattedDate) {
        // Construct the URL with selected values
        navigate(`/selectvenues?location=${selectedLocation.value}&quantity=${selectedQuantity.value}&price=${selectedPrice.value}&date=${formattedDate}`);
      }}

  return (

    
    <div className='CTA-options'>
        {/* <div className='test'> */}
        <p>What kind of venues are you looking for?</p>
        <div className='cta-container'>
        <div className="dropdowns">
        <div className="dateSelector">
            <label htmlFor="date">Date</label>
            <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy" 
            className='date-picker'
            />
            </div>
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
            <div className="dropDownThree">
            <label htmlFor="price">Price</label>
            <Select 
            placeholder="Select max price" 
            options={optionsPrice} 
            styles={customStyles}
            onChange={handlePriceChange}
            value={selectedPrice} />
            </div>
        </div>
        <button className='btn-search' onClick={handleSearch}>SEARCH</button>
        </div>
        {/* </div> */}
        </div>

  )
}



export default SearchBarOptions