import React, { useState, useEffect } from 'react'
import Modal from './modal/modal';
import ModalBody from './modal/modalBody';
import ModalFooter from './modal/modalFooter';
import ModalHeader from './modal/modalHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../actions/userActions';
import Avatar from './avatar';
import { createGroupConversation } from '../../actions/conversationActions';
import socket from '../../services/socketService';
import { toast } from 'react-toastify';
import LazyInput from "../common/lazyInput";
import { isEmpty } from "../../utils/helperFunctions";

const ChatInvitationModel = ({ onClose, participants, currentUser, room, callUsers = false }) => {
  const {
    user: { users }
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  const [selectedUsers, setSelectedUsers] = useState({});
  useEffect(() => {
    if (isEmpty(users)) {
      setError("No record Found")
    }
    else {
      setError("")
    }
  }, [users])


  const handleCheck = user => {
    const selected = { ...selectedUsers };

    if (selected[user.slug]) {
      delete selected[user.slug];
    } else {
      selected[user.slug] = user.id;
    }
    setSelectedUsers(selected);
  };

  const handleSubmit = () => {
    const selectedIds = Object.values(selectedUsers);
    const slugs = [...Object.keys(selectedUsers)].map(p => {
      return { slug: p }
    });

    const data = {
      user_ids: selectedIds
    };

    if (callUsers && slugs.length > 0) {
      socket.emit('outgoing-call', {
        caller: currentUser,
        room,
        participants: slugs
      });

      toast.success('Invitation sent');
      onClose();
    } else {
      dispatch(createGroupConversation(data, room));
      onClose();
    }
  };

  return (
    <div className="invitationModal">
      <Modal>
        <ModalHeader onClose={onClose}></ModalHeader>
        <ModalBody>
          <div className="search">
            <label>search users</label>
            <LazyInput
              autoFocus
              type="text"
              placeholder="search"
              action={getAllUsers}
            />
          </div>
          <div className="users">
            {error &&
              <p>{error}</p>
            }
            {users
              ?.filter(user => currentUser.id !== user.id)
              ?.map((user, index) => (
                <div className="row" key={index}>
                  <div className="user">
                    <Avatar
                      user={user}
                    />
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
                          value={selectedUsers[user.slug] || ''}
                          checked={selectedUsers[user.slug] || false}
                          onChange={() => handleCheck(user)}
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

export default React.memo(ChatInvitationModel);

