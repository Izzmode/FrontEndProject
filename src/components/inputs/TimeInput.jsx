import Select from 'react-select';
import './inputs.css';


const TimeInput = ({ venue, selectedHours, setSelectedHours, setTotalAmount }) => {

  const optionsTime = [
    { value: 4, label: '08 - 12' },
    { value: 4, label: '12 - 16' },
    { value: 4, label: '16 - 20' },
    { value: 8, label: '08 - 16'},
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
    updateTotalAmount(selectedOption.value);
    setSelectedHours(selectedOption)
    localStorage.setItem('hours', selectedOption.label)
  };
  
  const updateTotalAmount = (selectedTimeValue) => {
    const selectedTimeOption = optionsTime.find(option => option.value === selectedTimeValue);
    const numberOfHours = selectedTimeOption ? selectedTimeOption.value : 0;
    const newTotalAmount = venue.pricePerHour * numberOfHours;
    setTotalAmount(newTotalAmount)
    localStorage.setItem('totalAmount', newTotalAmount)

  };


  return (
    <div className="TimeInput">
        <label htmlFor="time">Time</label>
        <Select 
        placeholder="Select Time" 
        options={optionsTime} 
        styles={customStyles}
        onChange={handleTimeChange}
        value={selectedHours} />
  </div>
  )
}

export default TimeInput