import React from 'react'
import Map from '../components/Map'
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';

const VenueDetails = () => {


  const { id } = useParams();

  const { data: venues, isLoading, error } = useFetch('http://localhost:9999/api/venues/' + id)

  const latitude = venues?.latitude; // Use optional chaining (?.) to access properties safely
  const longitude = venues?.longitude;

  console.log(venues?.latitude)

  const isNumber = (value) => {
    return typeof value === 'number';
  }
  console.log(isNumber(longitude));
  


  return (
      <>
      { venues ? <Map latitude={latitude} longitude={longitude}/> : <div>Loading...</div>}
      </>
  )
}

export default VenueDetails