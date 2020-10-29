import React from 'react';
import MeuzmLogo from '../../common/meuzmLogo';
import Modal from '../../common/modal/modal';
import ModalHeader from '../../common/modal/modalHeader';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import { useDispatch } from 'react-redux';
import { muteUser, unMuteUser } from "../../../actions/userActions";

const MuteUserModal = ({ user, onClose, isMuted }) => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = user.username;
    if (isMuted) {
      const data = {
        unmute_user_id: user.id,
      }
      dispatch(unMuteUser(data, username))
    }
    else {
      const data = {
        mute_user_id: user.id,
      }
      dispatch(muteUser(data, username));
    }
    onClose(false);
  }
  return (
    <div className="mute-user-modal">
      <Modal>
        <ModalHeader onClose={() => onClose(false)} />
        <ModalBody className="modal-content">
          <MeuzmLogo />
          <div className="mute-text">
            {isMuted ?
              <p>Are you sure you want to unmute {user.first_name}?</p>
              : <p>Are you sure you want to mute {user.first_name}?</p>
            }
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="mute-submit" >
            <button onClick={handleSubmit}>yes</button>
            <button onClick={() => onClose(false)}>No</button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
};

export default MuteUserModal;
