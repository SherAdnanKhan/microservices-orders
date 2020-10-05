import React from 'react';
import Modal from '../../common/modal/modal';
import ModalBody from '../../common/modal/modalBody';
import ModalHeader from '../../common/modal/modalHeader';
import ModalFooter from '../../common/modal/modalFooter';
import Avatar from '../../common/avatar';
import { convertHexToRGBA } from '../../../utils/helperFunctions';

const RingingModal = ({ onAcceptCall, onRejectCall, payload, feelColor }) => {
  return (
    <div className="ringing-modal">
      <Modal>
        <ModalHeader></ModalHeader>
        <ModalBody>
          <Avatar
            user={payload?.caller}
          />
          <div className="caller-name">
            {payload?.caller?.username}
          </div>
          <div className="ringing">
            incoming call
          </div>
        </ModalBody>
        {/* Accept Button will be brighter */}
        <ModalFooter>
          <div
            className="accept-call"
            onClick={onAcceptCall}
            style={{ backgroundColor: convertHexToRGBA(feelColor, 1) }}
          >
            <img src="/assets/images/call.png" />
          </div>
          {/* reject Button will be darker */}
          <div
            className="end-call"
            onClick={onRejectCall}
            style={{ backgroundColor: convertHexToRGBA(feelColor, 0.4) }}
          >
            <i className="fas fa-times clickable"></i>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RingingModal;
