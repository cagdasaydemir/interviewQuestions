import { ErrorMessage, Field } from "formik";

/* eslint-disable react/prop-types */
const SelectInput = ({ label, name, options, onChange, errors, touched }) => {
  const handleSelectChange = (event) => {
    const { value } = event.target;
    onChange(name, value);
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field
        as="select"
        id={name}
        name={name}
        className={`form-control ${
          errors[name] && touched[name] ? "is-invalid" : ""
        }`}
        onChange={handleSelectChange}
      >
        <option value="">Select an option</option>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option.id ? option.id : option}>
              {option.name ? option.name : option}
            </option>
          ))}
      </Field>
      <ErrorMessage name={name} component="div" className="invalid-feedback" />
    </div>
  );
};

export default SelectInput;
