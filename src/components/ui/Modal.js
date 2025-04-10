import React from "react";

import classNames from "classnames";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, children, classes }) => {
  const modalClasses = classNames("modal", classes);
  return isOpen ? (
    <div className="overlay">
      <div className={modalClasses}>
        <div
          className="close"
          onClick={onClose}
          onKeyPress={onClose}
          role="button"
          tabIndex={0}
        >
          <IoMdClose />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
