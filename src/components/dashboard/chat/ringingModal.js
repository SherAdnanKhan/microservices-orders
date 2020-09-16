import React from 'react';
import Modal from '../../common/modal/modal';
import ModalBody from '../../common/modal/modalBody';
import ModalHeader from '../../common/modal/modalHeader';
import ModalFooter from '../../common/modal/modalFooter';
import Avatar from '../../common/avatar';

const RingingModal = ({ onAcceptCall, onRejectCall, payload }) => {
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
        <ModalFooter>
          <div
            className="accept-call"
            onClick={onAcceptCall}
          >
            <i className="fas fa-phone clickable"></i>
          </div>
          <div
            className="end-call"
            onClick={onRejectCall}
          >
            <i className="fas fa-phone-slash clickable"></i>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RingingModal;
