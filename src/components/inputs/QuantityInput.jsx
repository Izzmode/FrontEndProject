import Select from 'react-select';
import { useState } from 'react'
import './inputs.css'



const QuantityInput = ({ selectedQuantity, setSelectedQuantity }) => {

  // const [selectedQuantity, setSelectedQuantity] = useState(null);
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

  const handleQuantityChange = (selectedOption) => {
    setSelectedQuantity(selectedOption);
  };
  return (
    <div className="QuantityInput">
        <label htmlFor="quantity">Attendees</label>
        <Select 
        placeholder="Quantity" 
        options={optionsQuantity} 
        styles={customStyles}
        onChange={handleQuantityChange}
        value={selectedQuantity} />
  </div>
  )
}

export default QuantityInput