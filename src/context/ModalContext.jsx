import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalStack, setModalStack] = useState([]);

    const openModal = (modalType) => {
        setModalStack((prevStack) => [...prevStack, modalType]);
      };

    const closeModal = () => {
        setModalStack((prevStack) => prevStack.slice(0, -1));
      };

    const currentModal = modalStack.length > 0 ? modalStack[modalStack.length - 1] : null;

  return (
    <ModalContext.Provider value={{ currentModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
