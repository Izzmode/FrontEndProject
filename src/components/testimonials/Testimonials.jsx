import React from 'react'
import './testimonials.css'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from '../testimonialCard/TestimonialCard';
import useFetch from '../../hooks/useFetch';


const Testimonials = () => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 1171,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              dots: true,
              swipeToSlide: true,
              arrows: false,
            }
          }
        ]
      };

  const { data: venues, isLoading, error } = useFetch('http://localhost:9999/api/venues')

  const reviewedVenues = venues?.filter(data => {
    if (Array.isArray(data.reviews) && data.reviews.length > 0) {
      return true;
    }
    return false;
  });
  

  return (
    <div className='Testimonials'>
        <Slider {...settings}>
        {reviewedVenues && reviewedVenues.map(data => (
            <TestimonialCard data={data} key={data._id}/>
        ))}

        </Slider>

    </div>
  )



}

export default Testimonials