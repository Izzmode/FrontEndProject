import React from 'react'

const BookingDetails = () => {
  return (
    <div className='BookingDetails'>
      <section className='booking-top'>
        <div className='booking-nr'>
          <h1>booking number</h1>
          <p>date - hours</p>
        </div>
        <div>
          <button className='btn btn-add-to-calender'> ICON ADD TO CALENDER</button>
        </div>
      </section>

      <section className='booking-venue-details'>
        <div className='booking-details-venue-top'>
          <div className='top-left'>
            <h2>venue name</h2>
            {/* copy from review booking */}
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div className='top-right'>
            <img src="" alt="" />
            <div className='booking-img-container'>
              <img src="" alt="" />
              <img src="" alt="" />
            </div>
          </div>

        </div>
      </section>
      <section className='booking-venue-location'></section>
    </div>
  )
}

export default BookingDetails