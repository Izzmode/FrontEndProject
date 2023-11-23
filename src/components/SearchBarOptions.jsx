import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import DateInput from '../components/inputs/DateInput';
import LocationInput from '../components/inputs/LocationInput';
import QuantityInput from '../components/inputs/QuantityInput'
import PriceInput from '../components/inputs/PriceInput'
import Checkbox from '../components/checkbox/Checkbox';


const SearchBarOptions = () => {

  const navigate = useNavigate();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  // const [searchBreakout, setSearchBreakout] = useState(false);
  // const [searchCatering, setSearchCatering] = useState(false);
  const searchBreakoutLS = localStorage.getItem('searchBreakout')
  const searchCateringLS = localStorage.getItem('searchCatering')



      // const handleSearch = () => {
      // if (selectedLocation && selectedQuantity && selectedPrice && formattedDate) {
      //   const constructedURL = `/selectvenues?location=${selectedLocation.value}&quantity=${selectedQuantity.value}&price=${selectedPrice.value}&date=${formattedDate}`;
      //   navigate(constructedURL);
      // }}

      const handleSearch = () => {
        let queryParams = `location=${selectedLocation.value}&quantity=${selectedQuantity.value}&price=${selectedPrice.value}&date=${formattedDate}`;
    
        if (searchBreakoutLS === 'true') {
          queryParams += '&breakoutRooms=true';
          console.log('hej')
        }
    
        if (searchCateringLS === 'true') {
          queryParams += '&catering=true';
        }
    
        const constructedURL = `/selectvenues?${queryParams}`;
        navigate(constructedURL);
      };

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
          {/* Toggle "More options" */}
          <p
          className='btn-show-more-options'
          onClick={() => setShowMoreOptions(!showMoreOptions)}
          >
          {showMoreOptions ? 'Hide Options' : 'More Options'}
        </p>

        {/* More options collapse */}
        {showMoreOptions && (
          <div className='more-options-container'>
            <Checkbox label='Breakout Rooms' initState={false} identifier='searchBreakout'/>
            <Checkbox label='Catering' initState={false} identifier='searchCatering'/>
          </div>
        )}
        <button className='btn-search' onClick={handleSearch}>SEARCH</button>
        </div>
        </div>

  )
}



export default SearchBarOptions