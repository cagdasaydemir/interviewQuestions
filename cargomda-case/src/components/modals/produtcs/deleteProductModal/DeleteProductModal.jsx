/* eslint-disable react/prop-types */

import api from "../../../../api/api";
import Modal from "../../Modal";

const DeleteProductModal = ({ isOpen, onClose, getAllProducts, product }) => {
  const deleteProductHandler = async (id) => {
    await api.delete(`/products/${id}`);
    onClose(false);
    getAllProducts();
  };

  const middleContent = (
    <>
      <span> You are about to delete the product which is:</span>
      <div className="align-self-center d-flex flex-column my-3">
        <span className="align-self-start">
          <strong>Id:</strong> {product.id}
        </span>
        <span className="align-self-start">
          <strong>Name:</strong> {product.name}
        </span>
      </div>
      <span>
        <strong>Are you sure to delete the product ?</strong>{" "}
      </span>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Product"
      middleContent={middleContent}
      actionButtonText="Delete"
      onActionButtonClick={() => deleteProductHandler(product.id)}
    />
  );
};

export default DeleteProductModal;
