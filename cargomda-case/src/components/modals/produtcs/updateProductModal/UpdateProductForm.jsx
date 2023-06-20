import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useEffect, useState } from "react";
import Input from "../../../input/Input";

// eslint-disable-next-line react/prop-types
const UpdateProductForm = ({ onSubmit, formSubmitted, product }) => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues(product);
  }, [product]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    subcategory: Yup.string().required("Subcategory is required"),
    price: Yup.number().required("Price is required"),
    sale_price: Yup.number().required("Sale Price is required"),
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
              <Input
                label="Name"
                name="name"
                type="text"
                value={initialValues.name}
                errors={errors}
                touched={touched}
              />

              <Input
                label="Category"
                name="category"
                type="text"
                value={initialValues.category}
                errors={errors}
                touched={touched}
              />

              <Input
                label="Subcategory"
                name="subcategory"
                type="text"
                value={initialValues.subcategory}
                errors={errors}
                touched={touched}
              />

              <Input
                label="Price"
                name="price"
                type="number"
                value={initialValues.price}
                errors={errors}
                touched={touched}
              />

              <Input
                label="Sale Price"
                name="sale_price"
                type="number"
                value={initialValues.sale_price}
                errors={errors}
                touched={touched}
              />

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

export default UpdateProductForm;
