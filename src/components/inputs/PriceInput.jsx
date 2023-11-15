import Select from 'react-select';
import './inputs.css'

const PriceInput = ({ selectedPrice, setSelectedPrice }) => {

    const optionsPrice = [
        { value: '299', label: '299SEK/h' },
        { value: '399', label: '399SEK/h' },
        { value: '499', label: '499SEK/h' },
        { value: '599', label: '599SEK/h' },
      ];

      
      const handlePriceChange = (selectedOption) => {
        setSelectedPrice(selectedOption);
      };

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


  return (
    <div className="PriceInput">
    <label htmlFor="price">Price</label>
        <Select 
        placeholder="Select max price" 
        options={optionsPrice} 
        styles={customStyles}
        onChange={handlePriceChange}
        value={selectedPrice} />
    </div>
  )
}

export default PriceInput