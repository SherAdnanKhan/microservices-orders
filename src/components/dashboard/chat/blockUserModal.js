import React from 'react';
import MeuzmLogo from '../../common/meuzmLogo';
import Modal from '../../common/modal/modal';
import ModalHeader from '../../common/modal/modalHeader';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import { useDispatch } from 'react-redux';
import { blockUser } from "../../../actions/userActions";

const BlockUserModal = ({ onClose, user }) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = user.username;
    const data = {
      block_user_id: user.id,
    }
    dispatch(blockUser(data, username));
    onClose(false);
  }

  return (
    <div className="block-user-modal">
      <Modal>
        <ModalHeader className="btn-close">
          <i
            className="fas fa-window-close"
            onClick={() => onClose(false)}>
          </i>
        </ModalHeader>
        <ModalBody className="modal-content">
          <MeuzmLogo />
          <form onSubmit={handleSubmit}>
            <div className="block-content">
              <p>Are you sure you want to block {user.first_name}?</p>
            </div>
            <div className="block-submit" >
              <button onClick={handleSubmit} >Yes</button>
              <button onClick={() => onClose(false)}>No</button>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </div>
  )
};
export default BlockUserModal;