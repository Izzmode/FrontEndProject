import React from 'react'

export const Slider = () => {
  return (
    
    <div className="slider-wrapper">

    <Slider
      {...settingsMain}
      asNavFor={nav2}
      ref={slider => (setSlider1(slider))}
    >

      {slidesData.map((slide) =>

        <div className="slick-slide" key={slide.id}>
          <h2 className="slick-slide-title">{slide.title}</h2>
          <img className="slick-slide-image" src={`https://picsum.photos/800/400?img=${slide.id}`} />
          <label className="slick-slide-label">{slide.label}</label>
        </div>

      )}

    </Slider>
    <div className="thumbnail-slider-wrap">
      <Slider
        {...settingsThumbs}
        asNavFor={nav1}
        ref={slider => (setSlider2(slider))}>

        {slidesData.map((slide) =>

          <div className="slick-slide" key={slide.id}>
            <img className="slick-slide-image" src={`https://picsum.photos/800/400?img=${slide.id}`} />
          </div>

        )}

      </Slider>
    </div>
  </div>
  )
}
