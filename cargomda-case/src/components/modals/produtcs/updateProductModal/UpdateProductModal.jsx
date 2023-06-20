/* eslint-disable react/prop-types */
import Modal from "../../Modal";
import UpdateForm from "./UpdateProductForm";
import api from "../../../../api/api";
import { useEffect, useState } from "react";

const UpdateProductModal = ({ isOpen, onClose, getAllProducts, product }) => {
  const [updateProduct, setUpdateProduct] = useState(undefined);
  const updateProductHandler = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  };

  useEffect(() => {
    updateProductHandler(product.id).then((values) => setUpdateProduct(values));
  }, []);

  const handleFormSubmit = (values) => {
    const request = {
      id: values.id,
      name: values.name,
      category: values.category,
      subcategory: values.subcategory,
      price: values.price,
      sale_price: values.sale_price,
    };
    api
      .put(`/products/${request.id}`, request)
      .then(() => {
        getAllProducts();
        onClose();
      })
      .catch(() => {});
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Product"
      middleContent={
        <UpdateForm onSubmit={handleFormSubmit} product={updateProduct} />
      }
    />
  );
};

export default UpdateProductModal;
