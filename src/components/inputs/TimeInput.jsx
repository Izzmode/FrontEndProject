import Select from 'react-select';
import { useState } from 'react';
import './inputs.css'


const TimeInput = ({ selectedTime, setSelectedTime, setTotalAmount, venue }) => {

  const optionsTime = [
    { value: 4, label: '08 - 12 AM' },
    { value: 4, label: '12 - 04 PM' },
    { value: 4, label: '04 - 08 PM' },
    { value: 8, label: '08 AM - 04 PM'},
  ];
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: '#171717',
      border: 'none',
      outline: 'none',
      borderRadius: '8px',
      marginTop: '2px'
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
          backgroundColor: isFocused ? '#2F2F2F' : 'transparent', 
        },
        color: isFocused ? 'white' : 'white', 
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
      }),
  };

  const handleTimeChange = (selectedOption) => {
    setSelectedTime(selectedOption);
    updateTotalAmount(selectedOption.value);
  };

  const updateTotalAmount = (selectedTimeValue) => {
    const selectedTimeOption = optionsTime.find(option => option.value === selectedTimeValue);
    const numberOfHours = selectedTimeOption ? selectedTimeOption.value : 0;
    const newTotalAmount = venue.pricePerHour * numberOfHours;
  
    setTotalAmount(newTotalAmount);
  };


  return (
    <div className="TimeInput">
        <label htmlFor="time">Time</label>
        <Select 
        placeholder="Select Time" 
        options={optionsTime} 
        styles={customStyles}
        onChange={handleTimeChange}
        value={selectedTime} />
  </div>
  )
}

export default TimeInput