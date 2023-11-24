import React from 'react'
import useFetch from '../hooks/useFetch'
import VenueCard from '../components/venueCard/VenueCard'
import { useLocation } from 'react-router-dom'
import SearchBarOptions from '../components/SearchBarOptions'
const SearchedVenues = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedLocation = searchParams.get('location');
    const selectedQuantity = searchParams.get('quantity');
    const selectedPrice = searchParams.get('price');
    const selectedDate = searchParams.get('date');
    const breakoutRooms = searchParams.get('breakoutRooms');
    const catering = searchParams.get('catering');


    let selectedQuantityNumber;
    if (selectedQuantity){
      let maxQuantity;

      if(selectedQuantity.includes('-')){
       maxQuantity = selectedQuantity.split('-')[1]
      //  console.log(maxQuantity)

      }
      else{
        maxQuantity = selectedQuantity;
      }

      if (maxQuantity !== undefined) {
        selectedQuantityNumber = parseInt(maxQuantity.replace('+', ''), 10);
      } 
      else {
        console.error("The 'quantity' parameter is missing or invalid in the URL.");
      }
    } 


    const { data: venues, isLoading, error } = useFetch('http://localhost:9999/api/venues')

    const filteredVenues = venues?.filter((venue) => {

      const selectedQuantityRange = selectedQuantity?.split('-').map(Number);
      
        const selectedPricePerHour = parseInt(selectedPrice, 10);
        if (
          // Condition 1: Location
          (!selectedLocation || venue.area === selectedLocation) &&
      
          // Condition 2: Quantity
          (!selectedQuantity ||
            (selectedQuantityRange[0] <= venue.numberOfPeople && selectedQuantityRange[1] >= venue.numberOfPeople)) &&
      
          // Condition 3: Price
          (!selectedPrice || selectedPricePerHour >= venue.pricePerHour) &&
      
          // Condition 4: Breakout Rooms
          (!breakoutRooms || breakoutRooms && venue.arrangements.some(arrangement => arrangement.seating === 'Breakout_Rooms')) &&
      
          // Condition 5: Catering
          (!catering || catering && venue.amenities.some(amenity => amenity.service === 'Catering'))
        ) {
          return true;
        }
        
        return false;
      });
        

        // const breakoutRooms = searchParams.get('breakoutRooms');
        // const catering = searchParams.get('catering');
        
  return (
    <div>
    <SearchBarOptions/>
    <div className='venues-container'> 
    <h1 className="venuesTitle">Venues</h1>
    <ul className='VenueCards-container'>
        {isLoading && <p>Loading...</p>}
        {error && <h2>{error}</h2>}
        {filteredVenues && filteredVenues.map((venue) => (
          <VenueCard key={venue._id} venue={venue} />
        ))}
      </ul>
    
    </div>
    </div>
  )
}

export default SearchedVenues