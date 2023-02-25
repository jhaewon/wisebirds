import { createContext, useState, useEffect } from "react";

const ModalContext = createContext({
  isOpen: false,
  modalOpen: function () {},
  modalClose: function () {},
});

export function ModalContextProvider(props) {
  const [isOpen, setIsOpen] = useState(false);

  function modalOpenHandler() {
    setIsOpen(true);
  }

  function modalCloseHandler() {
    setIsOpen(false);
  }

  const context = {
    isOpen: isOpen,
    modalOpen: modalOpenHandler,
    modalClose: modalCloseHandler,
  };

  return (
    <ModalContext.Provider value={context}>
      {props.children}
    </ModalContext.Provider>
  );
}
export default ModalContext;
