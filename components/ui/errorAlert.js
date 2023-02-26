import classes from "./errorAlert.module.css";

function ErrorAlert(props) {
  return (
    <div className={classes.alert}>
      에러가 발생했습니다. 같은 현상이 반복되면 고객센터로 문의 바랍니다.
    </div>
  );
}

export default ErrorAlert;
