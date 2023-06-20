/* eslint-disable react/prop-types */
import { BsX } from "react-icons/bs";

const ModalActionButton = ({ onClick, buttonText }) => {
  return (
    <button type="button" className="btn btn-danger" onClick={onClick}>
      {buttonText}
    </button>
  );
};

const Modal = ({
  isOpen,
  onClose,
  title,
  middleContent,
  actionButtonText,
  onActionButtonClick,
  containerStyle
}) => {
  return (
    <div>
      {isOpen && (
        <>
          <div className="modal-backdrop show"></div>
          <div
            className="modal show"
            tabIndex={-1}
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered" style={containerStyle} role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title}</h5>
                  <button
                    type="button"
                    className="close btn"
                    onClick={() => onClose(false)}
                  >
                    <BsX size={24} />
                  </button>
                </div>
                <div className="modal-body d-flex flex-column align-items-center">
                  {middleContent}
                </div>
                {actionButtonText || onActionButtonClick ? (
                  <div className="modal-footer d-flex justify-content-center">
                    <ModalActionButton
                      onClick={onActionButtonClick}
                      buttonText={actionButtonText}
                    />

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => onClose(false)}
                    >
                      Close
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
