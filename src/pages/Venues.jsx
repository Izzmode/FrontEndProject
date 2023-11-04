import React from 'react'
import VenueCard from '../components/venueCard/VenueCard'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import SearchBarOptions from '../components/SearchBarOptions'

const Venues = () => {

    
    
      const { data: venues, isLoading, error } = useFetch('http://localhost:9999/api/venues')
      const navigate = useNavigate();

      return(
    
    
        <div className='Venues'>

        <SearchBarOptions/>
    
          <section className='venues-container'>
          <h1 className="venuesTitle">Venues</h1>
          <ul className='VenueCards-container'>
            {isLoading && <p>Loading...</p>}
            {error && <h2>{ error }</h2>}
          { venues && venues.map(venue => (
                <VenueCard key={venue._id} venue={venue} />
              )) }
    
          </ul>
          </section>
        </div>
        )
      
    
}

export default Venues