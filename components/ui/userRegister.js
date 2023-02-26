import { React, useState } from "react";
import { Formik, Form, Field } from "formik";
import { postUser, getDuplicate } from "../../helpers/api-util";

function UserRegister(props) {
  const [pwInpt, setPwInput] = useState("");
  function validateId(value) {
    let error;
    if (!value) {
      error = "아이디(이메일)을 입력하세요.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
      value.length < 9 ||
      value.length > 50
    ) {
      error = "올바른 이메일 주소를 입력하세요.";
    }
    if (getDuplicate(value)) {
      error = "이미 사용중인 이메일입니다. 다른 이메일을 입력하세요";
    }
    return error;
  }

  function validatePassword(value) {
    setPwInput(value);
    let error;
    if (!value) {
      error = "비밀번호를 입력하세요.";
    } else if (
      value.length < 8 ||
      value.length > 15 ||
      value.search(/\s/) != -1 ||
      value.search(/[0-9]/g) < 0 ||
      value.search(/[a-z]/gi) < 0 ||
      value.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi) < 0
    ) {
      error = "8~15자 영문, 숫자, 특수문자를 사용하세요.";
    }
    return error;
  }

  function validatePasswordChk(value) {
    let error;
    if (!value) {
      error = "비밀번호를 입력하세요.";
    } else if (value !== pwInpt) {
      error = "비밀번호가 일치하지 않습니다.";
    }
    return error;
  }

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
    const newData = postUser(data);
    props.closeModal(newData);
  }

  return (
    <div>
      <h1>사용자 생성</h1>
      <Formik
        initialValues={{
          id: "",
          password: "",
          passwordChk: "",
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
            <Field name="id" validate={validateId} />
            {errors.id && touched.id && (
              <div className="inputFeedback">{errors.id}</div>
            )}

            <label>비밀번호</label>
            <Field
              name="password"
              validate={validatePassword}
              type="password"
            />
            {errors.password && touched.password && (
              <div className="inputFeedback">{errors.password}</div>
            )}

            <label>비밀번호 확인</label>
            <Field
              name="passwordChk"
              validate={validatePasswordChk}
              type="password"
            />
            {errors.passwordChk && touched.passwordChk && (
              <div className="inputFeedback">{errors.passwordChk}</div>
            )}

            <label>이름</label>
            <Field name="name" validate={validateName} />
            {errors.name && touched.name && (
              <div className="inputFeedback">{errors.name}</div>
            )}

            <button onClick={props.closeModal}>취소</button>
            <button type="submit">생성</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UserRegister;
