/* eslint-disable react/prop-types */

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../../input/Input";

const CreateCategoryForm = ({ onSubmit, formSubmitted }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    subcategories: Yup.string(),
  });

  const initialValues = {
    name: "",
    subcategories: "",
   
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
  };

  return (
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
            {isSubmitting || formSubmitted ? <>Creating...</> : <>Create</>}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCategoryForm;
