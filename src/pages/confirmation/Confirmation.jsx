import './confirmation.css'
import useFetch from '../../hooks/useFetch';
import { useState, useEffect } from 'react'
import { FaWifi, FaParking, FaCoffee, FaWheelchair, FaChalkboard, FaMapMarkerAlt, FaClock, FaUserAlt, FaCoins } from "react-icons/fa";
import { MdOutlineSupportAgent, MdHeadsetMic, MdOutlineVideogameAsset, MdDinnerDining } from "react-icons/md"
import { BsProjector, BsCalendarDateFill } from "react-icons/bs"
import { CgScreen } from "react-icons/cg"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BookingContext } from '../../context/BookingContext';
import { createContext, useContext, useReducer } from 'react';
import { parseISO, format } from 'date-fns';


const Confirmation = () => {

  const hours = localStorage.getItem('hours')
  const totalAmountLS = localStorage.getItem('totalAmount')
  const dateLS = localStorage.getItem('date')
  const attendees = localStorage.getItem('quantity')

  const location = useLocation();
  // const history = useHistory();
  const { state, dispatch } = useContext(BookingContext);
  const selectedQuantity = state.selectedQuantity;
  // const selectedDate = state.selectedDate;
  const selectedTime = state.selectedTime;
  const totalAmount = state.totalAmount;
  const catering = state.catering;
  const date = dateLS === "null" ? null : new Date(dateLS);

  let formattedDate;
  if (!isNaN(date)) {
    // Format the date as "Month Day, Year"
      formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    console.log(formattedDate); 
  } else {
    console.log("Invalid date");
  }

  const { id } = useParams();
  const { data: venue, isLoading, error } = useFetch('http://localhost:9999/api/venues/' + id)

  // useEffect(() => {
  //   // Only update the context once when the component is mounted
  //   dispatch({ type: 'UPDATE_BOOKING_DATA', payload: { venue } });
  // }, []); 

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


  return (
    <div className='Confirmation'>

      <div className='confirmation-wrapper'>

      <section className='confirm-left'>
        <div className='confirm-details'>
          <img src={venue && venue.thumbnail} alt="locale" className='confirm-img'/>
          <section className='confirm-venue'>
            <h2>{venue && venue.name}</h2>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank">Venue Website</a>
          </section>
          {venue &&
          <section className='confirm-icons'>
            <p className='confirm-catering-icon'><span><FaMapMarkerAlt/> </span>{venue.address}</p>
            <p className='confirm-catering-icon'><span><FaClock/> </span>{hours}</p>
            <p className='confirm-catering-icon'><span><BsCalendarDateFill/> </span>{formattedDate}</p>
            {/* <p className='confirm-catering-icon'><span><FaUserAlt/> </span>{state.selectedQuantity?.label}</p> */}
            <p className='confirm-catering-icon'><span><FaUserAlt/> </span>{attendees}</p>
            <p className='confirm-catering-icon'><span><FaCoins/> </span>{totalAmountLS} SEK</p>
            {state.catering && 
            <p className='confirm-catering-icon'><span><MdDinnerDining/></span>Catering</p>
          }

          </section>
            }
        </div>
      {venue &&
        <div className='confirm-contact'>
          <h2>Contact Person</h2>
          <p className='contact-name'>{venue.contact.fullName}</p>
          <p>{venue.contact.email}</p>
          <p>08 123 456</p>
        </div>}
      </section>
      <section className='confirm-right'>
        <div className='confirm-top'>
        <div className='confirm-info-catering'>
          <div className='confirm-am'>
             {venue && venue.amenities.map(am => (
               <div key={am.id}>
                    {amenityIcons[am.service]}
                    <p>{am.service.split('_').join(' ')}</p>
                </div>
                 ))}
          </div>
          <div className='confirm-informaion'>
            <h2>Information</h2>
            <p>
              Our venue is located so that it is accessible to all. 
              We offer catering and many different type of aid so that your tech-event will run smoothly. 
              There is always coffee, tea and water available.
            </p>
          </div>
          {state.catering &&
          <div className='confirm-catering'>
            <h2>Catering</h2>
            <p>
            You have chosen catering for this booking.  
            You will be contacted by Catering Company within 2 days. 
            If you are not contacted, let us know at catering@techspace.com.
            </p>
          </div>}

        </div>

        <div className='confirm-terms'>
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
        </div>

        <div className='confirm-comment'>
          <h2>Anything else we need to know? Write down below</h2>
          <textarea></textarea>
        </div>
      </section>
                 </div>
                 <section className='confirm-btns'>
        <button className='btn-cancel'>CANCEL</button>
        <button className='btn btn-confirm'>CONFIRM BOOKING</button>
        </section>
    </div>
  )
}

export default Confirmation