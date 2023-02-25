import Link from 'next/link';
import { useContext, useState } from "react";
import classes from "./main-header.module.css";
import Dropdown from "react-dropdown";
import AuthContext from "../../store/auto-context";

function MainHeader(props) {
  const authCtx = useContext(AuthContext);
  const options = ["어드민", "매니저", "뷰어"];

  function onSetAuth(event) {
    if (event.value === "뷰어" || (!authCtx.toggle && event.value !== "뷰어")) {
      authCtx.toggleMenu(!authCtx.toggle);
    }
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Wisebirds</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/campaign">캠페인</Link>
          </li>
          {authCtx.toggle && (
            <li>
              <Link href="/user">사용자</Link>
            </li>
          )}
        </ul>
        <ul className={classes.auth}>
          <li>
            <a onClick={() => props.handlePopup(!props.isPopupOpen)}>
              {props.auth.name}
            </a>
          </li>
          <li>
            <Dropdown
              options={options}
              value={options[0]}
              onChange={onSetAuth}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
