import React from 'react';
import MeuzmLogo from '../../common/meuzmLogo';
import Modal from '../../common/modal/modal';
import ModalHeader from '../../common/modal/modalHeader';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import { useDispatch } from 'react-redux';
import { blockUser, unBlockUser } from "../../../actions/userActions";

const BlockUserModal = ({ onClose, user, isBlocked }) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = user.username;
    if (isBlocked) {
      const data = {
        unblock_user_id: user.id,
      }
      dispatch(unBlockUser(data, username))
    }
    else {
      const data = {
        block_user_id: user.id,
      }
      dispatch(blockUser(data, username));
    }
    onClose(false);
  }

  return (
    <div className="block-user-modal">
      <Modal>
        <form onSubmit={handleSubmit}>
          <ModalHeader onClose={() => onClose(false)} />
          <ModalBody className="modal-content">
            <MeuzmLogo />
            <div className="block-content">
              {isBlocked
                ? <> Are you sure you want to unblock {user.first_name} ?</>
                : <>Are you sure you want to block {user.first_name} ?</>
              }
            </div>
          </ModalBody>
          <ModalFooter>
            {/* <div className="block-submit" > */}
            <button onClick={handleSubmit} >Yes</button>
            <button onClick={() => onClose(false)}>No</button>
            {/* </div> */}
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
};
export default BlockUserModal;