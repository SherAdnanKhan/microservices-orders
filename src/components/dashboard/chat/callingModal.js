import React from 'react';
import MeuzmLogo from '../../common/meuzmLogo';
import Modal from '../../common/modal/modal';
import ModalHeader from '../../common/modal/modalHeader';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';

const CallingModal = ({ onDecline, feelColor }) => {
  return (
    <div className="calling-modal">
      <Modal>
        <ModalHeader></ModalHeader>
        <ModalBody>
          <MeuzmLogo />
          <div className="calling">
            calling...
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="end-call" onClick={onDecline} style={{ backgroundColor: feelColor, opacity: "0.5" }}>
            <i className="fas fa-phone clickable"></i>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
};

export default CallingModal;
