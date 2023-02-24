import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  toggle: true,
  toggleMenu: function (toggleShow) {},
});

export function AuthContextProvider(props) {
  const [showMenu, setShowMenu] = useState(true);

  function toggleMenuHandler(toggleShow) {
    setShowMenu(toggleShow);
  }

  const context = {
    toggle: showMenu,
    toggleMenu: toggleMenuHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
