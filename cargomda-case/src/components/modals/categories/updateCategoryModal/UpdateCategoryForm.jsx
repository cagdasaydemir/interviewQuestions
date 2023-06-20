import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useEffect, useState } from "react";
import Input from "../../../input/Input";

// eslint-disable-next-line react/prop-types
const UpdateCategoryForm = ({ onSubmit, formSubmitted, category }) => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues(category);
  }, [category]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    subcategories: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
          <Form className="form d-flex flex-column gap-2 w-100">
          <div>
          <Input
              label="Name"
              name="name"
              type="text"
              errors={errors}
              touched={touched}
            />
  
           <Input
            label="Subcategories"
            name="subcategories"
            type="textarea"
            errors={errors}
            touched={touched}
            placeholder="Please put ';' after every subcategory. e.g: test; test1; test2;"
          />
          </div>
  
            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={isSubmitting || formSubmitted}
            >
              {isSubmitting || formSubmitted ? <>Updating...</> : <>Update</>}
            </button>
          </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default UpdateCategoryForm;
