import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  selectedQuantity: null,
  selectedDate: null,
  selectedTime: null,
  totalAmount: null,
  catering: false,
  venue: null,
};

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_BOOKING_DATA':
      return { ...state, ...action.payload };
    case 'TOGGLE_CATERING':
      return { ...state, catering: action.payload };
    case 'RESET_QUANTITY':
      return { ...state, selectedQuantity: null };
    case 'RESET_TIME':
        return { ...state, selectedTime: null };
    case 'RESET_DATE':
        return { ...state, selectedDate: null };
    default:
      return state;

  };
};
  

export { BookingContext, BookingProvider };
