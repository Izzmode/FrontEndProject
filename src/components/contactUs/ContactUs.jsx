import React from 'react'
import Map from '../Map'
import './ContactUs.css'

const ContactUs = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('tack för ditt mail')
    }



  return (
    <div className='ContactUs' id='contact-us'>
        <div className='contact-form-wrapper'>
        <div className='wrapper-one-contact'>
            <h2>Contact Us</h2>
            <p>Do you have any questions or thoughts you would like to share with us? Let us now!</p>
            <form className='contact-form'>
                <label htmlFor="contact-email">Email</label>
                <input type="text" id='contact-email'/>
                <label htmlFor="contact-title">Subject</label>
                <input type="text" className='contact-subject' />
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message"></textarea>
                <button className='btn btn-contact' onClick={handleSubmit}>SEND</button>
            </form>
        </div>
        </div>
        <div className='find-us-wrapper'>
        <div className='find-us'>
            <h2>Find Us</h2>
            <h3>Phone</h3>
            <p>08 321 123</p>

            <h3 className='h3adress'>Address</h3>
            <p>Drottninggatan 56</p>
            <p>123 45 Stockholm</p>
            </div>
            <Map className='map-contact' longitude={18.062293184656447} latitude={59.33344943795326}/>
            </div>
    </div>
  )
}

export default ContactUs