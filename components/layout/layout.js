import { Fragment } from "react";
import { getAuth } from "../../helpers/api-util";

import MainHeader from "./main-header";

function Layout(props) {
  const auth = getAuth();

  return (
    <Fragment>
      <MainHeader auth={auth} />
    </Fragment>
  );
}

export default Layout;
