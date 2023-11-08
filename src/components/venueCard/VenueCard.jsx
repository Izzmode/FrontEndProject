import { NavLink, useLocation } from 'react-router-dom'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FaStar, FaUserAlt } from "react-icons/fa"
import { useState } from 'react'
import './venueCard.css'


const VenueCard = ({ venue }) => {
  
  const [toggleFavourite, setToggleFavourite] = useState(false)

   const handleFavourite = (e) => {
    console.log('klickade')
    e.preventDefault()

    setToggleFavourite(!toggleFavourite)
   }

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedDateParam = searchParams.get('date');


  return (
    <NavLink to={`/venues/${venue._id}?date=${selectedDateParam}` } style={{ textDecoration: 'none' }}>
    
    {/* <NavLink to={`/venues/${venue._id}` } style={{ textDecoration: 'none' }}> */}

    <li className='VenueCard' style={{ textDecoration: 'none' }}>
      <AiFillHeart 
      className={`heart-icon-filled ${toggleFavourite ? 'active' : ''}`}
      onClick={handleFavourite} 
      size={25}/>
      <AiOutlineHeart 
      className={`heart-icon ${!toggleFavourite ? 'active' : ''}`} 
      onClick={handleFavourite}
      size={25} />
      
      <img src={venue.thumbnail} alt={venue.name} className='VenueCard-img' />
      {/* <div className="shadow"></div> */}

      <section className='info-wrapper'>

        <div className='rating-container'>
          <h2 className='venueAddress'>{venue.address}</h2>
          <p className='venue-rating'>{venue.rating}</p>
          <FaStar className='star-icon'/>
        </div>
        <div className='bottom-container'>
          <div className='numOfPeople-container'>
            <FaUserAlt className='user-icon'/>
            <p className='venueNumOfPeople'>{venue.numberOfPeople}</p>
          </div>

          <p className='venuePrice'>From {venue.pricePerHour}SEK/h</p>
        </div>
      </section>
    </li>

     </NavLink>
  )
}

export default VenueCard