import { Field } from "formik";

/* eslint-disable react/prop-types */
const Input = ({ label, name, type, defaultValue, errors, touched,placeholder }) => {
  const inputProps = {
    id: name,
    name,
    defaultValue,
    className: `form-control ${errors[name] && touched[name] ? "is-invalid" : ""}`,
  };

  const inputElement =
    type === "textarea" ? (
      <Field as="textarea" type="textarea" placeholder={placeholder ? placeholder : ""} {...inputProps} />
    ) : (
      <Field type={type} {...inputProps} />
    );

  return (
    <div className="form-group" >
      <label htmlFor={name}>{label}</label>
      {inputElement}
      {errors[name] && touched[name] && (
        <div className="invalid-feedback">{errors[name]}</div>
      )}
    </div>
  );
};

export default Input;