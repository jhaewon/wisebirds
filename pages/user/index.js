import React, { Fragment, useState, useContext } from "react";
import UserGrid from "../../components/ui/userGrid";
import Pagination from "../../components/ui/pagination";
import { getUsers } from "../../helpers/api-util";
import ModalContext from "../../store/modal-context";
import Modal from "../../components/ui/modal";
import UserRegister from "../../components/ui/userRegister";

function User(props) {
  const modalCtx = useContext(ModalContext);

  const [modalType, setModalType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(props.list.content);
  const rowsPerPage = 25;
  const pageCount = Math.ceil(data.length / rowsPerPage);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  function handleSwitchToggle(itemId) {
    const newData = data.map((item) => {
      if (item.id === itemId) {
        return { ...item, enabled: !item.enabled };
      }
      return item;
    });
    setData(newData);
  }

  function handleOpenModal(type) {
    setModalType(type);
    modalCtx.modalOpen();
  }

  function handleCloseModal() {
    modalCtx.modalClose();
  }

  return (
    <Fragment>
      <h2 className="title">
        사용자 관리{" "}
        <button
          onClick={() => {
            handleOpenModal("register");
          }}
        >
          생성
        </button>
      </h2>
      <div>
        <UserGrid
          data={data}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onSwitch={handleSwitchToggle}
          onEdit={handleOpenModal}
        />
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        {modalCtx.isOpen ? <Modal closeModal={handleCloseModal} /> : null}
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const users = getUsers();

  return {
    props: {
      list: users,
    },
  };
}

export default User;
