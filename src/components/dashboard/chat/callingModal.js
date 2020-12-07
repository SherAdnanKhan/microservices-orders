import React from 'react';
import Modal from '../../common/modal/modal';
import ModalHeader from '../../common/modal/modalHeader';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import { convertHexToRGBA } from '../../../utils/helperFunctions';

const CallingModal = ({ onDecline, feelColor, participants, currentUser }) => {
  const filtered = participants?.filter(p => p.id !== currentUser.id);

  return (
    <div className="calling-modal">
      <Modal avatar={filtered?.length === 1 ? filtered[0]?.avatars[0].path : ''}>
        <ModalHeader></ModalHeader>
        <ModalBody>
          <div className="calling">
            calling...
          </div>
          <div className="group-users">
            {filtered?.map((user, index) => (
              <span>
                {user.username}
                {index !== filtered.length - 1 && ','}
              &nbsp;
              </span>
            ))}
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
