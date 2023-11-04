import React from 'react'
import './aboutUs.css'


const AboutUs = () => {
  return (
    <div className='AboutUs' id='about-us'>
        <h2 className='aboutTS'>About TechSpace</h2>
        <section className='aboutUs-wrapper' >
            <img src="src\images\img-techSpace.avif" alt="corporate building" className='img-techspace' />
        <article className='about-text'>
        TechSpace is an innovative company based in Stockholm, 
        offering a unique platform for tech companies and businesses 
        in the digital sector to rent conference rooms and meeting spaces. 
        Our company aims to revolutionize the way tech companies and their teams 
        meet and collaborate. We strive to provide customized meeting environments 
        that foster creativity, innovation, and business success.
        </article>
        </section>
    </div>
  )
}

export default AboutUs