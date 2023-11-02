import { useEffect } from 'react';


const Map = ({ longitude, latitude }) => {

      useEffect(() => {
    const google = window.google; // Get access to the global Google object

    // Perform any map initialization or other logic here
    // For example, you can create a map and attach it to a DOM element
   
        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
          zoom: 17,
        });

        new google.maps.Marker({
            position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            map: map, // Associate the marker with the map
            title: 'My Location', // Title for the marker (tooltip)
          });
      
    
}, [latitude, longitude]);

  return (
    <div>
        <div id="map" style={{ width: '50%', height: '300px' }}></div>;
    </div>
  )
}

export default Map

