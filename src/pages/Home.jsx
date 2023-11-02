import React from 'react'
import CallToAction from '../components/CallToAction'
import VenueCard from '../components/VenueCard'
import useFetch from '../hooks/useFetch'


const Home = () => {

  const { data: venues, isLoading, error } = useFetch('http://localhost:9999/api/venues')

  return (
    <div>
      <CallToAction/>
      <section className='welcome-text'>
        <h1>Innovative Meetings, Easily Booked</h1>
        <p>Welcome to TechSpace Stockholm!</p>
      </section>
      <section className='popular-venues'>
        <h2>Popular Venues</h2>
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

export default Home