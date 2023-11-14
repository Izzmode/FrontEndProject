import { NavLink, useLocation } from 'react-router-dom'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FaStar, FaUserAlt } from "react-icons/fa"
import { useEffect, useState } from 'react'
import './venueCard.css'
// import { useLike } from '../../context/LikeContext'


const VenueCard = ({ venue }) => {

  // const { likes, setLikes } = useLike();
  
    const [toggleFavourite, setToggleFavourite] = useState(false)
    

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedDateParam = searchParams.get('date');

  //  useEffect(() => {

  //    if(isLiked){
  //      setToggleFavourite(isLiked)
  //    }
  //  }, [])
   
  //   const fetchUserLikes = async => {

  //   try{
  //     const res = await fetch('http://localhost:9999/api/likes', {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
 
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
    
  //       const data = await res.json();
  //       return data.map(like => like.venue);

      
  //   } 
  //   catch (error){
 
  //     console.error('Error fetching likes:', error);
  //     return [];
  //   }
  // }

  const fetchUserLikes = async () => {
  
    try {
      const response = await fetch('http://localhost:9999/api/likes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.map(like => like.venue);
    } catch (error) {
      console.error('Error fetching likes:', error);
      return [];
    }
  };


  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchUserLikes().then(userLikes => {
      const isVenueLiked = userLikes.some(like => like._id === venue?._id);
      setIsLiked(isVenueLiked);
    });
  }, [venue]);
  
    // Rest of your VenueCard component remains the same
  
    
    const token = localStorage.getItem('token').replace(/['"]+/g, '');

    const handleFavourite = async (e) => {
      console.log('klickade')
      e.preventDefault()
      const venueId = venue._id;

    try {
      const response = await fetch('http://localhost:9999/api/likes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ venueId }),
      });

      if (response.ok) {
        setIsLiked(prevIsLiked => !prevIsLiked);
        console.log('Toggle success');
      } else {
        // Handle the error case
        console.error('Failed to toggle like:', response.status);
      }

    } catch (error) {
      // Handle any network or other errors
      console.error('Error toggling like:', error);
    }
  
  };


  return (
    
    <NavLink to={`/venues/${venue?._id}?date=${selectedDateParam}` } style={{ textDecoration: 'none' }}>
    
    {/* <NavLink to={`/venues/${venue._id}` } style={{ textDecoration: 'none' }}> */}

    <li className='VenueCard' style={{ textDecoration: 'none' }}>
    {isLiked ? (
        <AiFillHeart
          className={`heart-icon-filled active`}
          onClick={handleFavourite}
          size={25}
        />
      ) : (
        <AiOutlineHeart
          className={`heart-icon active`}
          onClick={handleFavourite}
          size={25}
        />
      )}
      
      <img src={venue?.thumbnail} alt={venue?.name} className='VenueCard-img' />
      {/* <div className="shadow"></div> */}

      <section className='info-wrapper'>

        <div className='rating-container'>
          <h2 className='venueAddress'>{venue?.address}</h2>
          <p className='venue-rating'>{venue?.rating}</p>
          <FaStar className='star-icon'/>
        </div>
        <div className='bottom-container'>
          <div className='numOfPeople-container'>
            <FaUserAlt className='user-icon'/>
            <p className='venueNumOfPeople'>{venue?.numberOfPeople}</p>
          </div>

          <p className='venuePrice'>From {venue?.pricePerHour}SEK/h</p>
        </div>
      </section>
    </li>

     </NavLink>
  )
}

export default VenueCard