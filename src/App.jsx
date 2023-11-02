import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Venues from "./pages/Venues"
import VenueDetails from "./pages/VenueDetails"
import Navbar from './components/Navbar'
// import { ProtectedRoute } from './routes/ProtectedRoute'
// import OrderList from './pages/OrderList'
import BookingDetails from './pages/BookingDetails'
import SearchedVenues from './pages/SearchedVenues'

const App = () => {

  return (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element= { <Home/>}/>
    
            <Route path="/venues" element= {<Venues />}/>

            <Route path="/venues/:id" element= { <VenueDetails/>}/>
            <Route path="/selectvenues" element= { <SearchedVenues/>}/>

            {/* <Route path= "/orders" element ={<OrderList/> }/> */}

            <Route path= "/bookings/:id" element ={<BookingDetails/>}/>
            
            </Routes>
    </div>
  )
}

export default App
