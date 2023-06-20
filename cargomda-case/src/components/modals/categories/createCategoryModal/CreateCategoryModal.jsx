/* eslint-disable react/prop-types */
import Modal from "../../Modal";
import api from "../../../../api/api";
import CreateCategoryForm from "./CreateCategoryForm";

const CreateCategoryModal = ({ isOpen, onClose, getAllCategories }) => {
  const handleFormSubmit = (values) => {
    const subcategories = values.subcategories.split(";");
    const trimmedSubcategories = subcategories
      .map((subcategory) => subcategory.trim())
      .filter((subcategory) => subcategory.length > 0);
  
    const request = {
      name: values.name,
     
      subcategories: trimmedSubcategories,

    };
    api
      .post(`/categories`, request)
      .then(() => {
        getAllCategories();
        onClose();
      })
      .catch(() => {
      
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Category"
      middleContent={<CreateCategoryForm onSubmit={handleFormSubmit} />}
    />
  );
};

export default CreateCategoryModal;
