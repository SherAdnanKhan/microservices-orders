import React from 'react';
import Modal from '../../common/modal/modal';
import ModalHeader from '../../common/modal/modalHeader';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
// import Input from '../../common/input';

const NoAnswerModal = ({ onClose, feelColor, onLeaveMessage, onCallMade, onVideoMessage }) => {
  return (
    <div className="no-answer-modal">
      <Modal>
        <ModalHeader onClose={onClose}>
        </ModalHeader>
        <ModalBody>
          <div className="no-answer-box">
            {/* <div className="no-answer-text">
              No Answer
            </div> */}
            <div className="no-answer-actions">
              <div className="cancel" onClick={onClose}>
                <i className="far fa-times-circle"></i>
                <span>Cancel</span>
              </div>
              <div className="record" onClick={onVideoMessage}>
                <img src="/assets/images/v-record.png" alt="" />
                <span>Video<br /> Message</span>
              </div>
              <div
                className="call-again"
                onClick={onCallMade}
              >
                <i className="fas fa-video"></i>
                <span>Call <br /> Again</span>
              </div>
              {/* <Input
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
              </Input> */}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="recordHold">
            <span>Hold to REC</span>
            <div className="recordButton">
              <button></button>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default NoAnswerModal;
