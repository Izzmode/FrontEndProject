import './venueDetails.css'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Map from '../../components/Map'
import Accordian from '../../components/accordian/Accordian';
import useFetch from '../../hooks/useFetch';
import VenueCard from '../../components/venueCard/VenueCard'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FaWifi, FaParking, FaCoffee, FaWheelchair, FaChalkboard } from "react-icons/fa";
import { MdOutlineSupportAgent, MdHeadsetMic, MdOutlineVideogameAsset } from "react-icons/md"
import { BsProjector } from "react-icons/bs"
import { CgScreen } from "react-icons/cg"
import iconBoardroom from '../../images/icon-boardroom.png'
import iconStanding from '../../images/icon-standing.png'
import iconClassroom from '../../images/icon-classroom.png'
import iconBreakout from '../../images/icon-dining.png'



const VenueDetails = () => {

  const { id } = useParams();
  const { data: venues, isLoading, error } = useFetch('http://localhost:9999/api/venues/' + id)
  const { data: recVenues } = useFetch('http://localhost:9999/api/venues/')

  const latitude = venues?.latitude;
  const longitude = venues?.longitude;

  const recommendedVenues = recVenues?.filter(data => {
   if (venues.numberOfPeople <= data.numberOfPeople){
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2
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
      Breakout_Room: iconBreakout
  }

  return (
      <div className='VenueDetails'>
        <section className='details-adress-like'>
          <div className='adress-container'>
            <h1>{ venues && venues.name}</h1>
            <p>{ venues && venues.address}</p>
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
          <img src={ venues && venues.thumbnail} alt="image" />
          <div className='map-container'>
            { venues ? <Map latitude={latitude} longitude={longitude}/> : <div>Loading...</div>}
          </div>
        </div>

        <Slider {...settings}>
        {venues ? venues.images.map(image => (
          <div className='slider-image-container'>
              <img src={image} className='slider-images-details' ></img>
              </div>
        )) : isLoading}

        </Slider>

        <div className='information-containers'>
          <div className='left-information-container'>
            <div className='info-container'>
              <h2>Information</h2>
              <p>{venues && venues.information}</p>
            </div>

            <div className='amenities-container'>
              <h2>Amenities</h2>
              <div className='amenity-icons-container'>
                {venues && venues.amenities.map(am => (
                  <div key={am.id}>
                    {amenityIcons[am.service]}
                    <p>{am.service.split('_').join(' ')}</p>
                  </div>
                 ))}
              </div>
              <p>
                Our venue is located so that it is accessible to all...
              </p>
            </div>

            <Accordian title={'Equipment'} content={'test'}/>

            <div className='arr-container'>
              <h2>Arrangements</h2>
              <div className='arr-icons-container'>
                {venues && venues.arrangements.map(arr => (
                  <div key={arr.id}>
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
          <div className='right-information-container'></div>
      </div>
            <div className='other-venues'>
            <h2>Other venues you might like</h2>
            <div className="other-venues-container VenueCards-container">
              {recommendedVenues && recommendedVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
            </div>
      </div>
  )
}

export default VenueDetails