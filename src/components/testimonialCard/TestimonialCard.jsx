import React from 'react'
import './testimonialCard.css'
import { FaStar } from "react-icons/fa"
import VenueCard from '../venueCard/VenueCard'
import MaxCharachterText from '../MaxCharachterText'


const TestimonialCard = ({ data }) => {

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <FaStar
              key={i}
              className={i <= rating ? "star active" : "star"}
            />
          );
        }
        return stars;
      };

      
    const maxCharCount = 200;


  return (
    <div>

        <div className='testimonial-wrapper'>
            <div className='testimonial-venue'>
                <VenueCard venue ={data}/>
            </div>

            <div className='review-wrapper'>
                <p className='testp'>{renderStars(data.rating)}</p>
                {data.reviews.map((review) => (
                    <div className='text-reviewer' key={review.id}>
                    <MaxCharachterText text={review.text} maxCharCount={maxCharCount} /> 
                <p className='p-reviewer'>{review.reviewer}</p>
                </div>
                ))}
            </div>
        </div>
    </div>

  )
}

export default TestimonialCard