import React, { useEffect, useState } from 'react'
import Modal from './modal/modal';
import ModalBody from './modal/modalBody';
import ModalFooter from './modal/modalFooter';
import ModalHeader from './modal/modalHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';
import Avatar from './avatar';
import { createGroupConversation } from '../../actions/conversationActions';
import { useHistory } from 'react-router-dom';

const ChatInvitationModel = ({ onClose, participants, currentUser }) => {
  const history = useHistory();
  const { users } = useSelector(state => state.user);

  const [selectedUsers, setSelectedUsers] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(''));
  }, [dispatch]);

  const handleSearch = ({ target: input }) => {
    dispatch(getAllUsers(input.value));
  }

  const handleChange = (user) => {
    const selected = { ...selectedUsers };

    if (selected[user.username]) {
      delete selected[user.username];
    } else {
      selected[user.username] = user.id;
    }
    setSelectedUsers(selected);
  };

  const handleSubmit = () => {
    const selectedIds =
      [...Object
        .values(selectedUsers),
      ...participants
        .filter(participant => participant.id !== currentUser.id)
        .map(participant => participant.id)
      ];

    const data = {
      user_ids: selectedIds
    };

    dispatch(createGroupConversation(data, history));
  };

  return (
    <div className="invitationModal">
      <Modal>
        <ModalHeader onClose={onClose}></ModalHeader>
        <ModalBody>
          <div className="search">
            <input
              autoFocus
              type="text"
              onChange={handleSearch}
            />
          </div>
          <div className="users">
            {users
              ?.filter(user => currentUser.id !== user.id)
              ?.map((user, index) => (
                <div className="row" key={index}>
                  <div className="user">
                    <Avatar avatars={user.avatars} feelColor={user.feel.color_code} />
                    <span>{user.username} </span>
                  </div>
                  <div className="option">
                    {participants?.some(participant => participant.id === user.id) ||
                      user.privacyStrq.is_allowed === 0
                      ? (
                        <input
                          type="checkbox"
                          checked
                          disabled
                        />
                      )
                      : (
                        <input
                          type="checkbox"
                          value={selectedUsers[user.username] || ''}
                          checked={selectedUsers[user.username] || false}
                          onChange={() => handleChange(user)}
                        />
                      )
                    }
                  </div>
                </div>
              ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            disabled={Object.keys(selectedUsers).length === 0}
            onClick={handleSubmit}
            style={{ backgroundColor: currentUser?.feel.color_code }}
          >
            Add
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ChatInvitationModel;

