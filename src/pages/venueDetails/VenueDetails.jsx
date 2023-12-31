import './venueDetails.css'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Map from '../../components/Map'
import Accordian from '../../components/accordian/Accordian';
import useFetch from '../../hooks/useFetch';
import VenueCard from '../../components/venueCard/VenueCard'
import { useState, useEffect } from 'react'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FaWifi, FaParking, FaCoffee, FaWheelchair, FaChalkboard } from "react-icons/fa";
import { MdOutlineSupportAgent, MdHeadsetMic, MdOutlineVideogameAsset, MdDinnerDining } from "react-icons/md"
import { BsProjector } from "react-icons/bs"
import { CgScreen } from "react-icons/cg"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import iconBoardroom from '../../images/icon-boardroom.png'
import iconStanding from '../../images/icon-standing.png'
import iconClassroom from '../../images/icon-classroom.png'
import iconBreakout from '../../images/icon-dining.png'
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { parseISO } from 'date-fns';
import TimeInput from '../../components/inputs/TimeInput';
import Checkbox from '../../components/checkbox/Checkbox';
import QuantityInputBooking from '../../components/inputs/QuantityInputBooking';
import DateInputBooking from '../../components/inputs/DateInputBooking';
import { useAuth } from "../../context/AuthContext"
import { useModal } from "../../context/ModalContext"

const VenueDetails = () => {

  const [totalAmount, setTotalAmount] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);

  const { jwtToken, loginComplete } = useAuth();
  const { openModal } = useModal();

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  //from checkbox. 
  // const initState = localStorage.getItem('catering') === true ? true : false;

  //the idea is to add the date they searched for, but not working? Check again now you changed inputs
  const params = new URLSearchParams(location.search);
  const dateParamString = params.get('date');
  const dateParam = dateParamString === "null" ? null : parseISO(dateParamString);
  const formattedDate = dateParam ? format(dateParam, 'yyyy-MM-dd') : '';
  
  const { data: venue, isLoading, error } = useFetch('http://localhost:9999/api/venues/' + id)
  const { data: recVenues } = useFetch('http://localhost:9999/api/venues/')

  const latitude = venue?.latitude;
  const longitude = venue?.longitude;

  const recommendedVenues = recVenues?.filter(data => {
   if (venue?.numberOfPeople <= data.numberOfPeople){
    return true
   }
   return false
  }).slice(0, 4);

  const [toggleFavourite, setToggleFavourite] = useState(false)

  const handleFavourite = (e) => {
   console.log('klickade')
   e.preventDefault()

   setToggleFavourite(!toggleFavourite)
  }

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  
  useEffect(() => {

    setNav1(slider1);
    setNav2(slider2);

  });

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    // centerPadding: '10px'
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
  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  };

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

  const seatingIcons = {
      Boardroom: iconBoardroom,
      Standing: iconStanding,
      Classroom: iconClassroom,
      Breakout_Rooms: iconBreakout
  }

  const offersCatering = venue?.amenities.filter(am => {
    if(am.service === 'Catering'){
    return true
    }
    return false
  })
  if (!offersCatering) {
    localStorage.setItem('catering', false);
  }

  const accContent = [
    {  content: 'Barco ClickShare Wireless' },
    {  content: 'Bose Professional Sound Systems' },
    {  content: 'Epson BrightLink Pro Interactive Projector' },
    {  content: 'Cisco Webex Board' },
  ];

  const handleClick = () => {
    if(jwtToken){

      navigate(`/venues/${id}/booking-summary`);
    }else{

      openModal('login');
    }
    
  }

  // adding thumbnail and images to display in slider
  const allImages = venue ? [venue.thumbnail, ...venue.images] : [];
  

  return (
      <div className='VenueDetails'>
        <section className='details-adress-like'>
          <div className='adress-container'>
            <h1>{ venue && venue.name}</h1>
            <p>{ venue && venue.address}</p>
          </div>
          <div className='like-details'>
            <p>Like</p>
            <AiFillHeart 
              className={`heart-icon-filled-details ${toggleFavourite ? 'active' : ''}`}
              onClick={handleFavourite} 
              />
              <AiOutlineHeart 
              className={`heart-icon-details ${!toggleFavourite ? 'active' : ''}`} 
              onClick={handleFavourite}
               />
          </div> 
        </section>
        <div className='top-img-map'>  
          
          <div className="slider-wrapper slider-desktop">
            <Slider
              {...settingsMain}
              asNavFor={nav2}
              ref={slider => (setSlider1(slider))}
            >
            {allImages.map((slide, index) =>
              <div className="slider-image-container-main" key={index}>
                <img className="slick-slide-image" src={slide} />
              </div>

            )}

            </Slider>
          </div>

          <div className="slider-wrapper slider-mobile">

            <Slider {...settings}>
            {allImages.map((slide, index) => 
              <div className="slider-image-container-main" key={index}>
                <img className="slick-slide-image" src={slide} />
              </div>
            )}
            </Slider>
          </div>


          <div className='map-container'>
            { venue ? <Map latitude={latitude} longitude={longitude}/> : <div>Loading...</div>}
          </div>
        </div>

        <div className="thumbnail-slider-wrap slider-desktop">
            <Slider
              {...settingsThumbs}
              asNavFor={nav1}
              ref={slider => (setSlider2(slider))}>

              {allImages.map((slide, index) =>

                <div className="slider-image-container" key={index} >
                  <img className="slick-slide-image" src={slide} />
                </div>

              )}

            </Slider>
          </div>

        {/* <Slider {...settingsThumbs}>
        {venue ? venue.images.map(image => (
          <div className='slider-image-container'>
              <img src={image} className='slider-images-details' ></img>
              </div>
        )) : isLoading}
        </Slider> */}

        <div className='information-containers'>
          <div className='left-information-container'>
            <div className='info-container'>
              <h2>Information</h2>
              <p>{venue && venue.information}</p>
            </div>

            <div className='amenities-container'>
              <h2>Amenities</h2>
              <div className='amenity-icons-container'>
                {venue && venue.amenities.map(am => (
                  <div key={am._id}>
                    {amenityIcons[am.service]}
                    <p>{am.service.split('_').join(' ')}</p>
                  </div>
                 ))}
              </div>
              <p>
              Our venue is located so that it is accessible to all. 
              We offer catering and many different type of aid so that your tech-event will run smoothly. 
              There is always coffee, tea and water available.
              </p>
            </div>

            <Accordian title={'Technical Equipment'} content={accContent}/>

            <div className='arr-container'>
              <h2>Arrangements</h2>
              <div className='arr-icons-container'>
                {venue && venue.arrangements.map(arr => (
                  <div key={arr._id}>
                    <img src={seatingIcons[arr.seating]} className='arr-icons'/>
                    <p className='seating-type'>{arr.seating.split('_').join(' ')}</p>
                    <p>{arr.capacity}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='info-contact-arr'>
              <h2> Venue Contact</h2>
              <p>Do you have any questions about this locale or its equipment? <br />
              Please contact the venue directly.</p>
            </div>
          </div>


        <div className='right-information-container'>

          <div className='booking-form'>
            <section className='text-section-top'> 
              <h2>Book This Venue</h2>
              <p>From {venue && venue.pricePerHour}SEK/h </p>
            </section>
            <div className='booking-form-dropdowns'>
              <div className='form-dropdowns-button'>
                <div className="form-dropdowns">
                  <QuantityInputBooking venueCapacity={venue && venue.numberOfPeople} selectedQuantity={selectedQuantity} setSelectedQuantity={setSelectedQuantity}/>
                  <DateInputBooking className='test' selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                  <TimeInput venue={venue} selectedHours={selectedHours} setSelectedHours={setSelectedHours} setTotalAmount={setTotalAmount}/> 
                </div>
                {offersCatering && offersCatering.length > 0 && (
                <div className='checkbox-container'>
                  <Checkbox label='Add catering to booking' initState={false} identifier='catering'/>
                  <span>
                  <MdDinnerDining className='food-icon'/>
                  </span>
                </div>
                )}
                <div className='total-amount'>
                  <section className='total-top'>
                    <p>SEK {venue && venue.pricePerHour} x {selectedHours ? selectedHours.value + ' hours' : '0 hours'}</p>
                    { totalAmount && <p>SEK {totalAmount}.00</p>}
                  </section>
                  <section className='total-bottom'>
                    <h2>Total Amount</h2>
                    {totalAmount && <p>SEK {totalAmount}.00</p>}
                  </section>
                </div>
              </div>
            </div>
            <button 
            className='btn btn-book' 
            onClick={handleClick}
            disabled={!selectedQuantity || !selectedDate || !selectedHours}
            >BOOK NOW</button>
            <section className='text-section-bottom'> 
              <p>Confirmation and payment options to follow</p>
              <p>Terms & conditions apply</p>
            </section>
          </div>

          <div className='contact-person'>
            <div className='details-contact-left'>
              <h2> {venue && venue.name }</h2>
              <p>{venue && venue.address}</p>
              <p>123 45 Stockholm</p>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank">Venue website</a>
            </div>
            <div className='details-contact-right'>
              <h2>Contact Person</h2>
              <p className='contact-name'>{venue && venue.contact.fullName}</p>
              <p>{venue && venue.contact.email }</p>
              <p>08 123 456</p>
            </div>
          </div>

        </div>

      </div>
            <div className='other-venues'>
              <h2>Other venues you might like</h2>
              <div className="other-venues-container VenueCards-container">
                {recommendedVenues && recommendedVenues.map((recVenue, index) => (
                <VenueCard key={index} venue={recVenue} />
                ))}
              </div>
            </div>
    </div>
  )
}

export default VenueDetails