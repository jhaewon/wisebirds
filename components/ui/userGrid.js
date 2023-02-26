import { React, useContext } from "react";
import ModalContext from "../../store/modal-context";
import classes from "./campaignGrid.module.css";

function UserGrid({ data, rowsPerPage, currentPage, onEdit }) {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  function formatTimestamp(text) {
    if (text === "") return "";
    var today = new Date(text);
    today.setHours(today.getHours() + 9);
    return today.toISOString().replace("T", " ").substring(0, 19);
  }

  return (
    <table className={classes.campaign}>
      <thead>
        <tr>
          <th>아이디</th>
          <th>이름</th>
          <th>마지막 로그인 일시</th>
          <th>수정</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((item) => (
          <tr key={item.id}>
            <td className={classes.left}>{item.id}</td>
            <td className={classes.left}>{item.name}</td>
            <td className={classes.left}>
              {formatTimestamp(item.last_login_at)}
            </td>
            <td className={classes.center}>
              <label>
                <button onClick={() => onEdit("edit", item.email)}>수정</button>
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserGrid;
