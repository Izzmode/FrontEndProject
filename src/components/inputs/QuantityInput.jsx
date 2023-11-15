import Select from 'react-select';
import './inputs.css'

const QuantityInput = ({ venueCapacity, selectedQuantity, setSelectedQuantity }) => {

  const optionsQuantity = [
    { value: '5-10', label: '5-10 attendees' },
    { value: '10-30', label: '10-30 attendees', isDisabled: venueCapacity < 10  },
    { value: '30-60', label: '30-60 attendees', isDisabled: venueCapacity < 30  },
    { value: '60+', label: '60+ attendees', isDisabled: venueCapacity < 60  },
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

    }),
    indicatorSeparator: () => ({
        display: 'none',
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#171717',
        borderRadius: '0px 0px 8px 8px',
        
      }),
      option: (provided, { isSelected, isFocused, isDisabled }) => ({
        ...provided,
        backgroundColor: isSelected ? '#171717' : 'transparent',
        '&:hover': {
          backgroundColor: isFocused ? '#2F2F2F' : 'transparent',
        },
        color: isFocused ? 'white' : 'white',
        ...(isDisabled && { color: 'grey' || 'lightgray' }),
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white', 
      }),
  };

  const handleQuantityChange = (selectedOption) => {
    setSelectedQuantity(selectedOption)
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