/* eslint-disable react/prop-types */
import Modal from "../../Modal";

import api from "../../../../api/api";
import { useEffect, useState } from "react";
import UpdateCategoryForm from "./UpdateCategoryForm";

const UpdateCategoryModal = ({ isOpen, onClose, getAllCategories, category }) => {
  const [updateCategory, setUpdateCategory] = useState(undefined);
  const updateCategoryHandler = async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  };

  useEffect(() => {
    updateCategoryHandler(category.id).then((values) => {
      if(values.subcategories.length > 0){
        values.subcategories = values.subcategories.join("; ")
      }else{
        values.subcategories = ""
      }
      setUpdateCategory(values)});
  }, []);

  const handleFormSubmit = (values) => {
    const subcategories = values.subcategories.split(";");
    const trimmedSubcategories = subcategories
      .map((subcategory) => subcategory.trim())
      .filter((subcategory) => subcategory.length > 0);
  
    const request = {
      id: values.id,
      name: values.name,
      subcategories: trimmedSubcategories,
    };
    api
      .put(`/categories/${request.id}`, request)
      .then(() => {
        getAllCategories();
        onClose();
      })
      .catch(() => {});
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Category"
      middleContent={
        <UpdateCategoryForm onSubmit={handleFormSubmit} category={updateCategory} />
      }
    />
  );
};

export default UpdateCategoryModal;
