import React from 'react';
import Modal from '../../common/modal/modal';
import ModalHeader from '../../common/modal/modalHeader';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import Avatar from '../../common/avatar';

const ParticipantsModel = ({ onClose, participants, currentUser, onlineUsers }) => {
  return (
    <div className="participantsModel">
      <Modal>
        <ModalHeader onClose={onClose}></ModalHeader>
        <ModalBody>
          <div className="users">
            {participants
              ?.filter(participant => participant.id !== currentUser.id)
              ?.map((participant, index) => (
                <div className="row" key={index}>
                  <div className="user">
                    <Avatar
                      avatars={participant.avatars}
                      feelColor={participant.feel.color_code}
                    />
                    <span> {participant.username} </span>
                  </div>
                  <div className="userStatus">
                    {onlineUsers?.some(user => user === participant.slug)
                      ? 'Online'
                      : 'Offline'
                    }
                  </div>
                </div>
              ))}
          </div>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ParticipantsModel;
