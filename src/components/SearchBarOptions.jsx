import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import DateInput from '../components/inputs/DateInput';
import LocationInput from '../components/inputs/LocationInput';
import QuantityInput from '../components/inputs/QuantityInput'
import PriceInput from '../components/inputs/PriceInput'
import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';


const SearchBarOptions = () => {

  const navigate = useNavigate();
  const { state, dispatch } = useContext(BookingContext);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const formattedDate = state.selectedDate ? format(state.selectedDate, 'yyyy-MM-dd') : '';
  console.log(formattedDate)

  const resetDropdowns = () => {
    dispatch({ type: 'RESET_QUANTITY' });
    dispatch({ type: 'RESET_DATE' });
    setSelectedLocation(null)
    setSelectedPrice(null)
  };

      const handleSearch = () => {
      if (selectedLocation && state.selectedQuantity && selectedPrice && formattedDate) {
        resetDropdowns();
        const constructedURL = `/selectvenues?location=${selectedLocation.value}&quantity=${state.selectedQuantity.value}&price=${selectedPrice.value}&date=${formattedDate}`;
        navigate(constructedURL);
      }}

  return (

    
    <div className='CTA-options'>
        <p>What kind of venues are you looking for?</p>
        <div className='cta-container'>
        <div className="dropdowns">
          <DateInput />
          <LocationInput selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
          <QuantityInput/>
          <PriceInput selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice}/>
        </div>
        <button className='btn-search' onClick={handleSearch}>SEARCH</button>
        </div>
        </div>

  )
}



export default SearchBarOptions