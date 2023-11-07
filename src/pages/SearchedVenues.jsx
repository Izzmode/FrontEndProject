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
    let selectedQuantityNumber;
    if (selectedQuantity){
      let maxQuantity;

      if(selectedQuantity.includes('-')){
       maxQuantity = selectedQuantity.split('-')[1]
      }
      else{
        maxQuantity = selectedQuantity;
      }

      if (maxQuantity !== undefined) {
        let selectedQuantityNumber = parseInt(maxQuantity.replace('+', ''), 10);
      } 
      else {
        console.error("The 'quantity' parameter is missing or invalid in the URL.");
      }
    } 
    

    
    
    const { data: venues, isLoading, error } = useFetch('http://localhost:9999/api/venues')

    
    const filteredVenues = venues?.filter((venue) => {
      
        const selectedPricePerHour = parseInt(selectedPrice, 10);

        if (
            //if the user didnt select a location/q or...
            // if the location of the venue/q matches the one they did select - return true
             (!selectedLocation || venue.area === selectedLocation) &&
             (!selectedQuantity || selectedQuantityNumber <= venue.numberOfPeople) &&
             (!selectedPrice || selectedPricePerHour >= venue.pricePerHour)
            ) {
                return true;
            }
            return false;
        });
        
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