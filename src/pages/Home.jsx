import React from 'react'
import CallToAction from '../components/CallToAction'
import VenueCard from '../components/venueCard/VenueCard'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import AboutUs from '../components/aboutUs/AboutUs'
import Testimonials from '../components/testimonials/Testimonials'
import ContactUs from '../components/contactUs/ContactUs'


const Home = () => {

  const navigate = useNavigate();

  const { data: venues, isLoading, error } = useFetch('http://localhost:9999/api/venues')

  const popularVenues = venues?.filter((venue) => {
        
    if (venue.rating >= 4) {
            return true;
        }
        return false;
    });

  return (
    <div>
      <CallToAction/>
      <section className='welcome-text'>
        <h1>Innovative Meetings, Easily Booked</h1>
        <p>Welcome to TechSpace Stockholm!</p>
      </section>
      <section className='venues-container'>
        <h2 className='pop-venues'>Popular Venues</h2>
        <ul className='VenueCards-container'>
            {isLoading && <p>Loading...</p>}
            {error && <h2>{ error }</h2>}
          { venues && popularVenues.map(venue => (
                <VenueCard key={venue._id} venue={venue} />
              )) }
    
          </ul>
      <button 
      className='btn-search btn-home'
      onClick={ () => navigate('/venues')}
      >SEE ALL VENUES</button>
      </section>
      <Testimonials/>
      <AboutUs/>
      <ContactUs/>
    </div>
  )
}

export default Home