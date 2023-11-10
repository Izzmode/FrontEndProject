import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Venues from "./pages/Venues"
import VenueDetails from "./pages/venueDetails/VenueDetails"
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
// import { ProtectedRoute } from './routes/ProtectedRoute'
// import OrderList from './pages/OrderList'
import BookingDetails from './pages/BookingDetails'
import SearchedVenues from './pages/SearchedVenues'
import Confirmation from './pages/confirmation/Confirmation'
import { BookingProvider } from './context/BookingContext';
import Profile from './pages/Profile'
import { ModalProvider } from './context/ModalContext'
import { AuthProvider } from './context/AuthContext'

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
            <Route path="/venues/:id/confirm" element= { <Confirmation/>}/>
            <Route path="/selectvenues" element= { <SearchedVenues/>}/>

            {/* <Route path= "/orders" element ={<OrderList/> }/> */}

            <Route path= "/profile/bookings/:id" element ={<BookingDetails/>}/>
            <Route path= "/profile" element ={<Profile/>}/>
            
        </Routes>
        <Footer/>
        </ModalProvider>
        </AuthProvider>
        </BookingProvider>
    </div>
  )
}

export default App
