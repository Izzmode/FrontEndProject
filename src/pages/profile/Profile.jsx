import React, { useState } from 'react'
import './profile.css'
import { MdOutlineEdit } from 'react-icons/md'
import { useEffect } from 'react'
import CurrentBookingsCard from '../../components/currentBookingsCard/CurrentBookingsCard'

//import bookings from database
//create current booking card and map out

const Profile = () => {

  const [bookings, setBookings] = useState(null)


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
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching bookings:', error);
    });

  }, [])


  const currentDate = new Date();
  const currentBookings = bookings?.filter(booking => {
    if(booking.date){

      const bookingDate = new Date(booking.date);
      console.log(bookingDate)
      return bookingDate >= currentDate;
    }
  })

  const previousBookings = bookings?.filter(booking => {
    if(booking.date){

      const bookingDate = new Date(booking.date);
      console.log(bookingDate)
      return bookingDate <= currentDate;
    }
  })


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
        {currentBookings && currentBookings.map(booking => (
          <CurrentBookingsCard booking={booking}/>
        ))}
      </section>
      <section className='profile-liked-venues'>
      <h2>Liked Venues</h2>

      </section>
      <section className='profile-prev-bookings'>
        <div className='prev-bookings-total'>
      <h2>Previous Bookings</h2>
      <p>{previousBookings?.length} Bookings </p>
      </div>

      {previousBookings && previousBookings.map(booking => (
          <CurrentBookingsCard booking={booking} style={{ backgroundColor: '#171717', border: '1px solid #2f2f2f'}}/>
        ))}

      </section>

    </div>
  )
}

export default Profile