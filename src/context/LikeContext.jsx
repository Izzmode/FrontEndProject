// import { createContext, useContext, useState, useEffect } from 'react';

// const LikeContext = createContext();

// export const useLike = () => {
//   return useContext(LikeContext);
// };

// export const LikeProvider = ({ children }) => {
//   const [venueId, setVenueId] = useState(null);
//   const token = localStorage.getItem('token');
//   const [likes, setLikes] = useState(null)
//   const cleanedToken = token.replace(/^"(.*)"$/, '$1');

// //   const handleFavourite = async (token, e) => {
// //     e.preventDefault();

// //     if (!venueId) {
// //       console.error('VenueId not set');
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:9999/api/likes/add', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({ venueId }),
// //       });

// //       if (response.ok) {
// //         // The like/unlike operation was successful
// //         console.log('Toggle success');
// //       } else {
// //         // Handle the error case
// //         console.error('Failed to toggle like:', response.status);
// //       }
// //     } catch (error) {
// //       // Handle any network or other errors
// //       console.error('Error toggling like:', error);
// //     }
// //   };


//   useEffect(() => {

//     fetch('http://localhost:9999/api/likes', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${cleanedToken}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setLikes(data)
//         console.log(data);
//       })
//       .catch(error => {
//         console.error('Error fetching likes:', error);
//       });
  
//     }, [])

//   const contextValue = {
//     likes,
//     setLikes
//   };

//   return <LikeContext.Provider value={contextValue}>{children}</LikeContext.Provider>;
// };
