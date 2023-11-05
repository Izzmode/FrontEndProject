import { useEffect } from 'react';


const Map = ({ longitude, latitude }) => {

      useEffect(() => {
    const google = window.google;
           
        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
          zoom: 17,
        });

        new google.maps.Marker({
            position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            map: map, 
            title: 'My Location',
          });
      
    
}, [latitude, longitude]);

  return (
    <div>
        <div id="map"></div>
    </div>
  )
}

export default Map

