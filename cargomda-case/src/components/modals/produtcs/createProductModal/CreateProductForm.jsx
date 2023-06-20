/* eslint-disable react/prop-types */
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../../input/Input";
import SelectInput from "../../../input/SelectInput";
import { useEffect, useState } from "react";
import api from "../../../../api/api";

const CreateProductForm = ({ onSubmit, formSubmitted }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const retrieveCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
  };

  const retrieveSubCategories = async (categoryId) => {
    const response = await api.get(`/categories/${categoryId}`);
    if (response.data.subcategories && response.data.subcategories.length > 0) {
      return response.data.subcategories;
    } else {
      return [];
    }
  };

  const getAllCategories = async () => {
    const allCategories = await retrieveCategories();
    if (allCategories) {
      setCategories(allCategories);
    }
  };

  const getAllSubCategories = async (categoryId) => {
    const allSubCategories = await retrieveSubCategories(categoryId);
    if (allSubCategories) {
      setSubCategories(allSubCategories);
    }
  };

  useEffect(() => {
    getAllCategories();
    handleCategoryChange();
  }, []);
  
  useEffect(() => {
    handleCategoryChange();
  }, [categories]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    subcategory: Yup.string().required("Subcategory is required"),
    price: Yup.number().required("Price is required"),
    sale_price: Yup.number().required("Sale Price is required"),
  });

  const initialValues = {
    name: "",
    category: "",
    subcategory: "",
    price: "",
    sale_price: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(values);
    setSubmitting(false);
  };

  const handleCategoryChange = async (categoryId) => {
    if (categoryId) {
      await getAllSubCategories(categoryId);
    } else {
      setSubCategories([]);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, setFieldValue }) => (
        <Form className="form d-flex flex-column gap-2 w-100">
          <Input
            label="Name"
            name="name"
            type="text"
            errors={errors}
            touched={touched}
          />

          <SelectInput
            label="Category"
            name="category"
            options={categories}
            onChange={(name, value) => {
              setFieldValue(name, value);
              handleCategoryChange(value);
            }}
            errors={errors}
            touched={touched}
          />

          <SelectInput
            label="Subcategory"
            name="subcategory"
            options={subCategories}
            onChange={(name, value) => setFieldValue(name, value)}
            errors={errors}
            touched={touched}
          />

          <Input
            label="Price"
            name="price"
            type="number"
            errors={errors}
            touched={touched}
          />

          <Input
            label="Sale Price"
            name="sale_price"
            type="number"
            errors={errors}
            touched={touched}
          />

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

export default CreateProductForm;
