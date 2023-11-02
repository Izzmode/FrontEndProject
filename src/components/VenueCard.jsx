import { NavLink } from 'react-router-dom'
// import { icons } from 'react-icons'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { useState } from 'react'

const VenueCard = ({ venue }) => {

    const [toggleFavourite, setToggleFavourite] = useState(false)

   const handleFavourite = (e) => {
    console.log('klickade')
    e.preventDefault()

    setToggleFavourite(!toggleFavourite)

   }

  return (

    <NavLink to={`/venues/${venue._id}` }>
    <li className='VenueCard'>
      <AiFillHeart 
      className={`heart-icon-filled ${toggleFavourite ? 'active' : ''}`}
      onClick={handleFavourite} 
      size={25}/>
      <AiOutlineHeart 
      className={`heart-icon ${!toggleFavourite ? 'active' : ''}`} 
      onClick={handleFavourite}
      size={25} />
      
      <img src={venue.thumbnail} alt={venue.name} className='VenueCard-img' />
      <div class="shadow"></div>
      <h2 className='venueAddress'>{venue.address}</h2>
      <p className='venuePrice'>{"SEK" + venue.pricePerHour}</p>
    </li>
     </NavLink>
  )
}

export default VenueCard