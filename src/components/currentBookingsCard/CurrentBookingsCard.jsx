import React from 'react'
import { NavLink } from 'react-router-dom';
import './currentBookingsCard.css'

const CurrentBookingsCard = ({ booking, style }) => {

    const bookingDate = booking.date;
    const date = bookingDate === "null" ? null : new Date(bookingDate);

    //formatting the date to a more "readable" one
    let formattedDate;
    if (!isNaN(date)) {
      // Format the date as "Month Day, Year"
        formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    
    } else {
      console.log("Invalid date");
    }

    
  return (
    <NavLink to={`/bookings/${booking._id}` } style={{ textDecoration: 'none' }}>
    <div className='CurrentBookingsCard' style={style}>

        <section className='left'>
            <p className='booking-number'>Booking Number #{booking.bookingNumber}</p>
       
            <section className='CBC-address'>
                <p className='booking-venue-name'>{booking.venue.name}</p>
                <p>{booking.venue.address}</p>
            </section>

            <p className='bookings-price'>SEK {booking.totalPrice}</p>
        </section>

        <section className='middle' id='booking-middle'>
            <p>{formattedDate}</p>
            <p>{booking.hours}</p>
        </section>
        <img src={booking.venue.thumbnail} alt="" />
    </div>
    </NavLink>
  )
}

export default CurrentBookingsCard