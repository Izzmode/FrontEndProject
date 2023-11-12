import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Venues from "./pages/Venues"
import VenueDetails from "./pages/venueDetails/VenueDetails"
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import ProtectedRoute from './routes/ProtectedRoute'
// import OrderList from './pages/OrderList'
import BookingDetails from './pages/bookingDetails/BookingDetails'
import SearchedVenues from './pages/SearchedVenues'
import BookingSummary from './pages/bookingSummary/BookingSummary'
import { BookingProvider } from './context/BookingContext';
import Profile from './pages/profile/Profile'
import { ModalProvider } from './context/ModalContext'
import { AuthProvider } from './context/AuthContext'
import BookingConfirmation from './pages/bookingConfirmation/BookingConfirmation'

const App = () => {

  return (
    <div>
      <BookingProvider>
        <AuthProvider>
        <ModalProvider>
        <Navbar />
        <Routes>
            <Route path="/" element= { <Home/>}/>
            <Route path="/venues" element= {<Venues />}/>
            <Route path="/venues/:id" element= { <VenueDetails/>}/>
            
            <Route path="/venues/:id/booking-summary" element= { 
            <ProtectedRoute>
            <BookingSummary/>
            </ProtectedRoute>}/>

            <Route path="/bookings/confirmation" element= { 
            <ProtectedRoute>
            <BookingConfirmation/>
            </ProtectedRoute>}/>

            <Route path="/selectvenues" element= { <SearchedVenues/>}/>

            {/* <Route path= "/orders" element ={<OrderList/> }/> */}

            <Route path= "/bookings/:id" element ={
            <ProtectedRoute>
            <BookingDetails/>
            </ProtectedRoute>}/>

            <Route path= "/profile" element ={
            <ProtectedRoute>
            <Profile/>
            </ProtectedRoute>}/>
            
        </Routes>
        <Footer/>
        </ModalProvider>
        </AuthProvider>
        </BookingProvider>
    </div>
  )
}

export default App
