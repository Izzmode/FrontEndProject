import React from 'react'
import './bookingConfirmation.css'
import { FaRegCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const BookingConfirmation = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    //navigera sen till bookings/id
    navigate('/profile')
  }
  return (
    <div className='BookingConfirmation'>
      
      <div className='confirmation-modal'>
      <FaRegCheckCircle className='icon-check'/>

      <section>
        <h1>Thank you for your booking with TechSpace!</h1>
        <p>You will revieve a confirmation to your account email,
          or you can view the details of your booking on your profile page.
        </p>
      </section>
      <button className='btn btn-view-booking' onClick={handleClick}>VIEW BOOKING DETAILS</button>

      </div>
      
      </div>
  )
}

export default BookingConfirmation