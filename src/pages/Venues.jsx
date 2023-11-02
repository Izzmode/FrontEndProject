import React from 'react'
import VenueCard from '../components/VenueCard'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

const Venues = () => {

    
    
      const { data: venues, isLoading, error } = useFetch('http://localhost:9999/api/venues')
      const navigate = useNavigate();

      return(
    
        <div className='Venues'>
    
          <h1 className="venuesTitle">Venues</h1>
          <ul className='VenueCards-container'>
            {isLoading && <p>Loading...</p>}
            {error && <h2>{ error }</h2>}
          { venues && venues.map(venue => (
                <VenueCard key={venue._id} venue={venue} />
              )) }
    
          </ul>
        </div>
        )
      
    
}

export default Venues