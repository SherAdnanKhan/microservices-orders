import React, { useState } from 'react';
import Modal from '../../common/modal/modal';
import ModalHeader from '../../common/modal/modalHeader';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import Input from '../../common/input';

const NoAnswerModal = ({ onClose, feelColor, onLeaveMessage, onCallMade }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!message)
      return 'Please write something.';
    return '';
  }

  const handleLeaveMessage = () => {
    const error = validate();

    if (!error) {
      onLeaveMessage(message);
    }
    setError(error);
  }

  return (
    <div className="no-answer-modal">
      <Modal>
        <ModalHeader onClose={onClose}>
        </ModalHeader>
        <ModalBody>
          <div className="no-answer-box">
            <div className="no-answer-text">
              No Answer
            </div>
            <div className="no-answer-actions">
              <Input
                autoFocus
                value={message}
                name="message"
                childPosition="down"
                placeholder="Please leave a message."
                onEnter={() => onLeaveMessage(message)}
                onChange={e => setMessage(e.target.value)}
                error={error}
              >
                <button
                  className="clickable"
                  style={{ backgroundColor: feelColor }}
                  onClick={handleLeaveMessage}
                >
                  send
                </button>

                <div
                  className='call-actions clickable'
                  onClick={onCallMade}
                  style={{ backgroundColor: feelColor }}
                >
                  <img src="/assets/images/call.png" alt="" />
                </div>
                <div className="callAgainText">
                  Call Again
                </div>
              </Input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default NoAnswerModal;
