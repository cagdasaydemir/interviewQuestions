/* eslint-disable react/prop-types */
import Modal from "../../Modal";
import CreateForm from "./CreateProductForm";
import api from "../../../../api/api";

const CreateProductModal = ({ isOpen, onClose, getAllProducts }) => {
  const handleFormSubmit = (values) => {
    const request = {
      name: values.name,
      category: values.category,
      subcategory: values.subcategory,
      price: values.price,
      sale_price: values.sale_price,
    };
    api
      .post(`/products`, request)
      .then(() => {
        getAllProducts();
        onClose();
      })
      .catch(() => {
      
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Product"
      middleContent={<CreateForm onSubmit={handleFormSubmit} />}
    />
  );
};

export default CreateProductModal;
