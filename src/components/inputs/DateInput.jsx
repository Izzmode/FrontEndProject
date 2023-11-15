import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import './inputs.css'

const DateInput = ({ selectedDate, setSelectedDate }) => {

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

  const handleDateChange = (date) => {
    setSelectedDate(date)
  };



  return (
    <div className="DateInput">
        <label htmlFor="date">Date</label>
        <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy" 
        className='date-picker'
        />
  </div>
  )
}

export default DateInput