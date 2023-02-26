import React, { Fragment, useState, useContext } from "react";
import UserGrid from "../../components/ui/userGrid";
import Pagination from "../../components/ui/pagination";
import { getUsers } from "../../helpers/api-util";
import ModalContext from "../../store/modal-context";
import Modal from "../../components/ui/modal";

function User(props) {
  const modalCtx = useContext(ModalContext);

  const [modalType, setModalType] = useState(null);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(props.list.content);
  const rowsPerPage = 25;
  const pageCount = Math.ceil(data.length / rowsPerPage);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  function handleOpenModal(type, id) {
    setModalType(type);
    setEditId(id);
    modalCtx.modalOpen();
  }

  function handleCloseModal(list) {
    modalCtx.modalClose();
    if (list.content !== undefined) {
      setData(list.content);
    }
  }

  return (
    <Fragment>
      <h2 className="title">
        사용자 관리
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
          onEdit={handleOpenModal}
        />
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        {modalCtx.isOpen ? (
          <Modal
            closeModal={handleCloseModal}
            type={modalType}
            editId={editId}
          />
        ) : null}
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
