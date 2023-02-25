import React from "react";
import classes from "./popup.module.css";

function Popup(props) {
  if (!props.isOpen) {
    return null;
  }

  return (
    <div className={classes.popup}>
      <div className="popup-overlay" onClick={props.onClose} />
      <div className="popup-content">{props.content}</div>
    </div>
  );
}

export default Popup;
