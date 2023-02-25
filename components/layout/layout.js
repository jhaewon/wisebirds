import { Fragment, useState } from "react";
import { getAuth } from "../../helpers/api-util";

import MainHeader from "./main-header";
import Popup from "../ui/popup";

function Layout(props) {
  const auth = getAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(
    auth.name + auth.email + auth.company.name
  );

  function handlePopup(pop) {
    setIsPopupOpen(pop);
  }

  return (
    <Fragment>
      <MainHeader
        auth={auth}
        isPopupOpen={isPopupOpen}
        handlePopup={handlePopup}
      />
      <Popup
        isOpen={isPopupOpen}
        onClose={handlePopup}
        content={popupContent}
      />
    </Fragment>
  );
}

export default Layout;
