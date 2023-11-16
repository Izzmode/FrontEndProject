import React, { useState } from 'react'
import './profile.css'
import { MdOutlineEdit } from 'react-icons/md'
import { useEffect } from 'react'
import CurrentBookingsCard from '../../components/currentBookingsCard/CurrentBookingsCard'
import VenueCard from '../../components/venueCard/VenueCard'

//import bookings from database
//create current booking card and map out

const Profile = () => {

  const [bookings, setBookings] = useState(null)
  const [likes, setLikes] = useState(null)
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [showAllOldBookings, setShowAllOldBookings] = useState(false);
  const [showAllLikes, setShowAllLikes] = useState(false);

  // const limitedBookingsToShow = showAllBookings
  // ? bookings
  // : currentBookings?.slice(0, 3);
  
  const token = localStorage.getItem('token');
  const cleanedToken = token.replace(/^"(.*)"$/, '$1');

  useEffect(() => {

  fetch('http://localhost:9999/api/bookings', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${cleanedToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setBookings(data)
    })
    .catch(error => {
      console.error('Error fetching bookings:', error);
    });

  }, [])

  useEffect(() => {

    fetch('http://localhost:9999/api/likes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cleanedToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLikes(data)
      })
      .catch(error => {
        console.error('Error fetching likes:', error);
      });
  
    }, [])
  

  const currentDate = new Date();
  const currentBookings = bookings?.filter(booking => {
    if(booking.date){

      const bookingDate = new Date(booking.date);
      return bookingDate >= currentDate;
    }
  })

  const previousBookings = bookings?.filter(booking => {
    if(booking.date){

      const bookingDate = new Date(booking.date);
      return bookingDate <= currentDate;
    }
  })

  const limitedBookingsToShow = showAllBookings
  ? currentBookings
  : currentBookings?.slice(0, 3);

  const limitedOldBookingsToShow = showAllOldBookings
  ? previousBookings
  : previousBookings?.slice(0, 3);

  const limitedLikesToShow = showAllLikes
  ? likes
  : likes?.slice(0, 4);


  return (
    <div className='Profile'>
      <section className='profile-greeting'>
        <h1>Hello!</h1>
        <div className='profile-edit'> <p><MdOutlineEdit/></p> <p>Edit profile</p></div>
        {/* <div className='profile-edit'> <span><MdOutlineEdit/></span> <p>Edit profile</p></div> */}
      </section>


      <section className='profile-current-bookings'>
        <div className='current-bookings-total'>
        <h2>Current Bookings</h2>
        <p>{currentBookings?.length} Bookings </p>
        </div>
        {currentBookings && currentBookings.length > 0 ?
        <>
        {limitedBookingsToShow &&
          limitedBookingsToShow
            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort bookings based on date
            .map((booking) => (
              <CurrentBookingsCard key={booking._id} booking={booking} />
            ))}
          {!showAllBookings && currentBookings?.length > 3 && (
          <button className='btn btn-show-more' onClick={() => setShowAllBookings(true)}>
            SHOW ALL
          </button>
        )}
        </>
      : <p className='no-venues'>You have no current bookings</p> }
      </section>



      <section className='profile-liked-venues'>
      <div className='prev-bookings-total'>

        <h2 className='h2-profile'>Liked Venues</h2>
        <p>{likes?.length || 0 } Likes </p>
      </div>
     
        {likes && likes.length > 0 ? (
          <div className='profile-like-wrapper'>
             { limitedLikesToShow &&
              limitedLikesToShow
            .filter(like => like.venue).map(like => (
              <VenueCard key={like._id} venue={like.venue} isLiked={true} />
            ))}
          </div>
        ) : (
          <p className='no-venues'>You have no liked venues</p>
        )}
          {!showAllLikes && likes?.length > 4 && (
          <button className='btn btn-show-more' onClick={() => setShowAllLikes(true)}>
            SHOW ALL
          </button>
        )}
      </section>



      <section className='profile-prev-bookings'>
        <div className='prev-bookings-total'>
      <h2>Previous Bookings</h2>
      <p>{previousBookings?.length} Bookings </p>
      </div>
      {previousBookings && previousBookings.length > 0 ?
        <>
      {limitedOldBookingsToShow && 
        limitedOldBookingsToShow
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(booking => (
          <CurrentBookingsCard 
          key={booking._id} 
          booking={booking} 
          style={{ backgroundColor: '#171717', border: '1px solid #2f2f2f'}}/>
        ))}
          {!showAllOldBookings && previousBookings?.length > 3 && (
          <button className='btn btn-show-more' onClick={() => setShowAllOldBookings(true)}>
            SHOW ALL
          </button>
        )}
        </>
      : <p className='no-venues'>You have no previous bookings</p> }

      </section>

    </div>
  )
}

export default Profile