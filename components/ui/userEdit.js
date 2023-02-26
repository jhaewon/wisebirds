import { React, useState } from "react";
import { Formik, Form, Field } from "formik";
import { patchUser } from "../../helpers/api-util";

function UserEdit(props) {
  const [editId, setEditId] = useState(props.editId);
  function validateName(value) {
    let error;
    if (!value) {
      error = "이름을 입력하세요.";
    } else if (
      value.length < 1 ||
      value.length > 16 ||
      value.search(/[a-z]/gi) < 0
    ) {
      error = "이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력불가)";
    }
    return error;
  }

  function onSubmit(data) {
    const newData = patchUser(data);
    console.log(newData);
    props.closeModal(newData);
  }

  return (
    <div>
      <h1>사용자 생성</h1>
      <Formik
        initialValues={{
          id: editId,
          name: "",
        }}
        onSubmit={(values) => {
          // same shape as initial values
          onSubmit(values);
        }}
      >
        {({ errors, touched, isValidating }) => (
          <Form>
            <label>아이디</label>
            <div>{props.editId}</div>

            <label>이름</label>
            <Field name="name" validate={validateName} />
            {errors.name && touched.name && (
              <div className="inputFeedback">{errors.name}</div>
            )}

            <button onClick={props.closeModal}>취소</button>
            <button type="submit">저장</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserEdit;
