import React from 'react';
import MeuzmLogo from '../../common/meuzmLogo';
import Modal from '../../common/modal/modal';
import ModalHeader from '../../common/modal/modalHeader';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import { convertHexToRGBA } from '../../../utils/helperFunctions';

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
          <div
            className="end-call"
            onClick={onDecline}
            style={{ backgroundColor: convertHexToRGBA(feelColor, 0.5) }}
          >
            <i className="fas fa-times"></i>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
};

export default CallingModal;
