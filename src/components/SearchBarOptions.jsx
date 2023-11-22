import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import DateInput from '../components/inputs/DateInput';
import LocationInput from '../components/inputs/LocationInput';
import QuantityInput from '../components/inputs/QuantityInput'
import PriceInput from '../components/inputs/PriceInput'


const SearchBarOptions = () => {

  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';


      const handleSearch = () => {
      if (selectedLocation && selectedQuantity && selectedPrice && formattedDate) {
        const constructedURL = `/selectvenues?location=${selectedLocation.value}&quantity=${selectedQuantity.value}&price=${selectedPrice.value}&date=${formattedDate}`;
        navigate(constructedURL);
      }}

  return (

    
    <div className='CTA-options SBO-options'>
        <p>What kind of venues are you looking for?</p>
        <div className='cta-container sbo-container'>
        <div className="dropdowns dropdowns-sbo">
          <DateInput selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <LocationInput selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
          <QuantityInput selectedQuantity={selectedQuantity} setSelectedQuantity={setSelectedQuantity}/>
          <PriceInput selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice}/>
        </div>
        <button className='btn-search' onClick={handleSearch}>SEARCH</button>
        </div>
        </div>

  )
}



export default SearchBarOptions