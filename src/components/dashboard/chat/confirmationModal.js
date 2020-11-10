import React from 'react';
import MeuzmLogo from '../../common/meuzmLogo';
import Modal from '../../common/modal/modal';
import ModalHeader from '../../common/modal/modalHeader';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';

const ConfirmationModal = ({ onCancel, message, onConfirm }) => {
  return (
    <div className="confirmation-modal">
      <Modal>
        <ModalHeader onClose={() => onCancel(false)} />
        <ModalBody className="modal-content">
          <MeuzmLogo />
          <div className="confirm-content">
            {message}
          </div>
        </ModalBody>
        <ModalFooter>
          <button onClick={() => onConfirm()} >Yes</button>
          <button onClick={() => onCancel(false)}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  )
};
export default ConfirmationModal;