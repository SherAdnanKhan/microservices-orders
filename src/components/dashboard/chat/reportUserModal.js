import React, { useState } from 'react';
import MeuzmLogo from '../../common/meuzmLogo';
import Modal from '../../common/modal/modal';
import ModalHeader from '../../common/modal/modalHeader';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import { useDispatch } from 'react-redux';
import { reportUser } from "../../../actions/userActions";
import { isEmpty } from '../../../utils/helperFunctions';

const ReportUserModal = ({ user, onClose }) => {
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');
  const dispatch = useDispatch();

  const handleReason = (event) => {
    setReason(event.target.value)
    if (reason.length > 0) {
      setReasonError('')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isEmpty(reason) && reason.length > 0) {
      setReasonError('')
      const data = {
        report_user_id: user.id,
        reason: reason
      }
      const username = user.username
      dispatch(reportUser(data, username));
      onClose(false)
    }
    else {
      setReasonError("reported reason cannot be empty")
    }
  }
  return (
    <div className="report-user-modal">
      <Modal>
        <form onSubmit={handleSubmit}>
          <ModalHeader onClose={() => onClose(false)}>
            Report User
        </ModalHeader>
          <ModalBody className="modal-content">
            <MeuzmLogo />
            <div className="reason">
              <label>Reported Reason</label>
              <textarea
                placeholder="Add reason"
                value={reason}
                onChange={handleReason}
                rows={13}
                colums={10}
              />
              {
                reasonError &&
                <div className="error-section">
                  <span className="error">
                    {reasonError}
                  </span>
                </div>
              }
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="report-submit" >
              <button>Submit </button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
};

export default ReportUserModal;
