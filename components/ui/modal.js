import { Fragment } from "react";
import classes from "./modal.module.css";
import UserRegister from "./userRegister";
import UserEdit from "./userEdit";

function Modal(props) {
  return (
    <div className={classes.modalArea}>
      <button
        aria-label="Close Modal"
        aria-labelledby="close-modal"
        className={classes.modalClose}
        onClick={props.closeModal}
      >
        <span id="close-modal" className={classes.hideVisual}>
          Close
        </span>
        <svg className={classes.modalCloseIcon} viewBox="0 0 40 40">
          <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>
      <div className={classes.modalBody}>
        {props.type === "register" ? (
          <UserRegister closeModal={props.closeModal} />
        ) : (
          <UserEdit closeModal={props.closeModal} editId={props.editId} />
        )}
      </div>
    </div>
  );
}

export default Modal;
