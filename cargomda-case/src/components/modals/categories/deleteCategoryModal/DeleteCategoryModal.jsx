/* eslint-disable react/prop-types */

import api from "../../../../api/api";
import Modal from "../../Modal";

const DeleteCategoryModal = ({ isOpen, onClose, getAllCategories, category }) => {
  const deleteProductHandler = async (id) => {
    await api.delete(`/categories/${id}`);
    onClose(false);
    getAllCategories();
  };

  const middleContent = (
    <>
      <span> You are about to delete the category which is:</span>
      <div className="align-self-center d-flex flex-column my-3">
        <span className="align-self-start">
          <strong>Id:</strong> {category.id}
        </span>
        <span className="align-self-start">
          <strong>Name:</strong> {category.name}
        </span>
      </div>
      <span>
        <strong>Are you sure to delete the category ?</strong>{" "}
      </span>
    </>
  );

  return (
    <Modal
    containerStyle={{ maxWidth: "40vw" }}
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Product"
      middleContent={middleContent}
      actionButtonText="Delete"
      onActionButtonClick={() => deleteProductHandler(category.id)}
    />
  );
};

export default DeleteCategoryModal;
