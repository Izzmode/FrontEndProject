import { NavLink } from 'react-router-dom'
const VenueCard = ({ venue }) => {

  return (

    <NavLink to={`/venues/${venue._id}` }>
    <li className='VenueCard'>
      <img src={venue.thumbnail} alt={venue.name} className='VenueCard-img' />
      <h2 className='venueName'>{venue.name}</h2>
      <p className='venuePrice'>{"SEK" + venue.pricePerHour}</p>
    </li>
     </NavLink>
  )
}

export default VenueCard