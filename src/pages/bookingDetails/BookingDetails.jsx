import React, { useState, useEffect } from 'react'
import './bookingDetails.css'
import { FaWifi, FaParking, FaCoffee, FaWheelchair, FaChalkboard, FaMapMarkerAlt, FaClock, FaUserAlt, FaCoins, FaCalendarCheck, FaBus, FaCar, FaSubway, FaRegClock } from "react-icons/fa";
import { MdOutlineSupportAgent, MdHeadsetMic, MdOutlineVideogameAsset, MdDinnerDining, MdTram } from "react-icons/md"
import { BsProjector, BsCalendarDateFill } from "react-icons/bs"
import { CgScreen } from "react-icons/cg"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Map from '../../components/Map'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";


const BookingDetails = () => {

  const { id } = useParams();
  const [booking, setBooking] = useState(null)

  const downloadPdfDocument = () => {
    const input = document.getElementById('divToDownload');
    input.classList.add('pdf-styles'); 
    html2canvas(input)
      .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'JPEG', 0, 0);
          pdf.save("download.pdf");
      })
  }

  useEffect(() => {

    const getBooking = async () =>{
      try{
  
        //ändra i authcontext när jag lägger till token i localstorage???
  
        // const token = localStorage.getItem('token');
        const token = localStorage.getItem('token').replace(/['"]+/g, '');
  
        const res = await fetch('http://localhost:9999/api/bookings/' + id, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        if (res.ok) {
          //regUser data is the jwt in stringform
          const fetchedBooking = await res.json()
          setBooking(fetchedBooking)
          // navigate('/bookings/confirmation')
          
  
        } else {
          console.error('Failed to fetch booking:', res.status);
        }
  
  
      }
      catch(error){
        console.error('Error fetching booking:', error);
      }
    }
  
      getBooking();
  }, [])
  
  //to get a value 30 days from booking date
  const date = new Date(booking?.date);
  const paymentDueDate = new Date (date)
  paymentDueDate.setDate(paymentDueDate.getDate() + 30)

  //to calculate the amount of hours without having it in booking
  const hoursStart = +booking?.hours.split('-')[0]
  const hoursEnd = +booking?.hours.split('-')[1]
  const hoursValue = hoursEnd - hoursStart;

  const totalAmount = booking?.totalPrice;

  const vat = totalAmount * 0.25;


  //to format all dates to be more readlabe
  let formattedDate;
  let formattedDateTwo;
  let formattedPaymentDueDate
  if (!isNaN(date)) {
    // Format the date as "Month Day, Year"
      formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    // console.log(formattedDate); 
    formattedDateTwo = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    // console.log(formattedDateTwo); 
    formattedPaymentDueDate = paymentDueDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    // console.log(formattedPaymentDueDate); 
  } else {
    console.log("Invalid date");
  }

  const amenityIcons = {
    Wifi: <FaWifi className='am-icons' />,
    Parking: <FaParking className='am-icons'/>,
    Coffee: <FaCoffee className='am-icons'/>,
    Technical_Support: <MdOutlineSupportAgent className='am-icons'/>,
    Accessibility: <FaWheelchair className='am-icons'/>,
    Projector: <BsProjector className='am-icons'/>,
    Screens: <CgScreen className='am-icons'/>,
    Microphones: <MdHeadsetMic className='am-icons'/>,
    Catering: <FaCoffee className='am-icons'/>,
    Whiteboards: <FaChalkboard className='am-icons'/>,
    Gaming_Stations: <MdOutlineVideogameAsset className='am-icons'/>
  };

  const transportIcons = {
    Bus: <FaBus className='am-icons' />,
    Tram: <MdTram className='am-icons'/>,
    Subway: <FaSubway className='am-icons'/>,
    Car: <FaCar className='am-icons'/>,
  };

  const addToCalendar = (bookingDetails) => {
    const { title, description, startDateTime, endDateTime, location } = bookingDetails;
  
    const startDate = new Date(startDateTime).toISOString().replace(/-|:|\.\d+/g, '');
  
    const calendarEvent = `BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    DTSTART:${startDate}
    LOCATION:${location}
    END:VEVENT
    END:VCALENDAR`;
  
    const calendarData = new Blob([calendarEvent], { type: 'text/calendar;charset=utf-8' });
    const calendarFileURL = window.URL.createObjectURL(calendarData);
  
    const link = document.createElement('a');
    link.href = calendarFileURL;
    link.setAttribute('download', 'event.ics');
    document.body.appendChild(link);
    link.click();
  };
  const bookingDetails = {
    startDateTime: booking?.date, 
    location: booking?.venue.address
  };  

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: true,
          swipeToSlide: true,
          // arrows: false,
        }
      }
    ]
  };

  const longitude = booking?.venue.longitude;
  const latitude = booking?.venue.latitude;

  return (
    <div className='BookingDetails'>
      <section className='booking-top'>
        <div className='booking-nr'>
          <h1>Booking Number #{booking?.bookingNumber}</h1>
          <p>{formattedDateTwo}</p>
          <p className='hours-clock'>{booking?.hours}</p>
        </div>
        <div>
          <button className='btn btn-add-to-calender' onClick={() => addToCalendar(bookingDetails)}><FaCalendarCheck/>  ADD TO CALENDER</button>
        </div>
      </section>

      <div className='BookingDetails-wrapper'>
      <section className='booking-venue-details'>

        <div className='booking-details-venue-top'>
          <div className='top-left'>
          <div className="slider-wrapper slider-mobile">

            <Slider {...settings}>
            {booking?.venue.images.map((slide, index) => 
              <div className="slider-image-container-main" key={index}>
                <img className="slick-slide-image" src={slide} />
              </div>
            )}
            </Slider>
            </div>

            <h2>{booking?.venue.name}</h2>
            {booking &&
            <section className='booking-details-icons'>
            <p className='confirm-catering-icon'><span><FaMapMarkerAlt/> </span>{booking.venue.address}</p>
            <p className='confirm-catering-icon'><span><FaClock/> </span>{booking.hours}</p>
            <p className='confirm-catering-icon'><span><BsCalendarDateFill/> </span>{formattedDate}</p>
            <p className='confirm-catering-icon'><span><FaUserAlt/> </span>{booking.venue.numberOfPeople}</p>
            <p className='confirm-catering-icon'><span><FaCoins/> </span>{booking.totalPrice} SEK</p>
            {booking.catering && 
            <p className='confirm-catering-icon'><span><MdDinnerDining/></span>Catering</p>
            }
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank">To Venue Page</a>
          </section>}
          </div>

          <div className='top-right'>
            <img src={booking?.venue.thumbnail} alt="" className='booking-img-large'/>
            <div className='booking-img-container'>
              <img src={booking?.venue.images[0]} alt="" />
              <img src={booking?.venue.images[1]} alt="" />
            </div>
          </div>
          </div>

          <div className='booking-details-bottom'>
          <div className='bottom-left'>
            <div className='confirm-am'>
              {booking && booking.venue.amenities.map(am => (
                <div key={am._id}>
                      {amenityIcons[am.service]}
                      <p>{am.service.split('_').join(' ')}</p>
                  </div>
                  ))}
            </div>

            <div className='booking-details-information'>
            <h2>Information</h2>
            <p>
              Our venue is located so that it is accessible to all. 
              We offer catering and many different type of aid so that your tech-event will run smoothly. 
              There is always coffee, tea and water available.
            </p>
          </div>

          {booking?.catering &&
          <div className='booking-details-catering'>
            <h2>Catering</h2>
            <p>
            You have chosen catering for this booking.  
            You will be contacted by Catering Company within 2 days. 
            If you are not contacted, let us know at catering@techspace.com.
            </p>
          </div>}

          </div>

          <div className='bottom-right'>
            <div className='booking-details-terms'>
              <h2>Terms</h2>
              <p>
                When it comes to cancellations, notify us at least 24 hours to avoid charges. 
                After your meeting,  leave the room in a tidy state and dispose of any trash properly.
                We expect responsible usage and reporting of any damage. 
                Please aim to start and finish your session as scheduled to avoid overtime charges. 
                Make sure to keep your valuables attended. The number of attendees should not exceed the room's capacity. 
                Kindly inform us in advance if you have specific accessibility requirements so we can make necessary accommodations. 
                There is always staff on scene should you need us.
              </p>
            </div>

            {booking &&
            <section className='booking-details-contact'>
            <div className='booking-contact-left'>
              <h2> {booking && booking.venue.name }</h2>
              <p>{booking && booking.venue.address}</p>
              <p>123 45 Stockholm</p>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank">Venue website</a>
            </div>
            <div className='booking-contact'>
              <h2>Contact Person</h2>
              <p className='contact-name'>{booking?.venue.contact.fullName}</p>
              <p>{booking?.venue.contact.email}</p>
              <p>08 123 456</p>
            </div>
            
            </section>}
          </div>
              </div>
        
      </section>
      <section className='booking-venue-location-wrapper'>
        <div className='venue-location-text'>
          <h2>Venue Location</h2>
          <p>{booking?.venue.address}, {booking?.venue.area}</p>
        </div>
        <div className='booking-venue-location'>
              <div className='booking-details-transportation'>
                <div className='img-transport'><img src={booking?.venue.images[2]} alt="" /></div>
                  <div className='transport-wrapper'>
                  <p>Directions</p>
                  <div className='transport-icons-wrapper'>
                {booking && booking.venue.transportation.map(transport => (
                  <div key={transport._id} className='transport-map'>
                    {transportIcons[transport.mode]}
                    <p>{transport.stop}</p>
                    <p className='thinner'>{transport.distance} m</p>
                  </div>
                 ))}
              </div>
                  </div>
              </div>
              <div className='booking-details-map'>
                { booking ? <Map latitude={latitude} longitude={longitude}/> : <div>Loading...</div>}
              </div>
              <div className='booking-details-billing' id="divToDownload">
                <div className='billing-download'>
                  <div className='billing-due-date'>
                  <h2>Billing</h2>
                  <p>Due Date: {formattedPaymentDueDate}</p>
                  </div>
                  <button className='btn-dark' onClick={downloadPdfDocument}>DOWNLOAD PDF</button>
                </div>
                <div className='billing-details'>
                  <section className='bill-description'>
                    <h3>Description</h3>
                    <p>Venue Rent</p>
                  </section>
                  <section className='bill-quantity'>
                    <h3>Qty</h3>
                    <p>{hoursValue}</p>
                  </section>
                  <section className='bill-unit'>
                    <h3>Unit</h3>
                    <p>Hours</p>
                  </section>
                  <section className='bill-unit-price'>
                    <h3>Unit Price</h3>
                    <p>SEK {booking?.venue.pricePerHour}</p>
                  </section>
                  <section className='bill-vat'>
                    <h3>VAT 25%</h3>
                    <p>{String(vat)}</p>
                  </section>
                  <section className='bill-total'>
                    <h3>Total Price</h3>
                    <p>SEK {booking?.totalPrice}</p>
                  </section>
                </div>
                <hr />
                <div className='billing-detail-bottom'>
              <div className='bottom-top'>
                <p>Sub Total</p>
                <p>Total VAT</p>
                <h2>Total Amount Due</h2>

              </div>
              <div className='bottom-bottom'>
                <p>SEK {booking?.totalPrice}</p>
                {/* <p>Total VAT</p> */}
                <p>SEK {String(vat)}</p>
                <h2>SEK {booking?.totalPrice}</h2>
              </div>
              {/* <div className='bottom-total'>
                <h2>Total Amount Due</h2>
              </div> */}
                </div>
              </div>
        </div>
      </section>
      </div>
    </div>
  )
}

export default BookingDetails