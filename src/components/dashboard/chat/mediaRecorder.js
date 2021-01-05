import React, { useState } from 'react';
import VideoRecorder from 'react-video-recorder';
import Modal from '../../common/modal/modal';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import ModalHeader from '../../common/modal/modalHeader';
import { Decoder, tools, Reader } from 'ts-ebml';

const MediaRecorder = ({ onClose, onLeaveVideoMessage, feelColor }) => {
  const [showAction, setShowAction] = useState(false);
  const [videoMessage, setVideoMessage] = useState('');

  const readAsArrayBuffer = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onloadend = () => { resolve(reader.result); };
      reader.onerror = (ev) => { reject(ev.error); };
    });
  }

  const injectMetadata = blob => {
    const decoder = new Decoder();
    const reader = new Reader();
    reader.logging = false;
    reader.drop_default_duration = false;

    return readAsArrayBuffer(blob)
      .then(buffer => {
        const elms = decoder.decode(buffer);
        elms.forEach((elm) => { reader.read(elm); });
        reader.stop();

        const refinedMetadataBuf =
          tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
        const body = buffer.slice(reader.metadataSize);

        return new Blob([refinedMetadataBuf, body], { type: blob.type });
      });
  }

  const handleRecordingComplete = blob => {
    injectMetadata(blob)
      .then(seekableBlob => {
        const file = new File([seekableBlob], 'video-message.mp4', { type: 'video/mp4', lastModified: Date.now() });

        setVideoMessage(videoMessage => videoMessage = file);
        setShowAction(showAction => showAction = true);
      })
  };

  return (
    <div className="video-recorder-modal">
      <Modal>
        <ModalHeader onClose={onClose}>
        </ModalHeader>
        <ModalBody>
          <VideoRecorder
            isOnInitially={true}
            isReplayingVideo={true}
            isFlipped={false}
            onStartRecording={() => setShowAction(false)}
            onRecordingComplete={handleRecordingComplete}
          />
        </ModalBody>
        <ModalFooter>
          {showAction &&
            <button
              style={{ backgroundColor: feelColor }}
              onClick={() => onLeaveVideoMessage(videoMessage)}>
              Send
            </button>
          }
        </ModalFooter>
      </Modal>
    </div>

  );
};

export default MediaRecorder;
