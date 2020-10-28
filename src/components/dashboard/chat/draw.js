import React, { useRef, useState, useEffect } from 'react'
import Modal from '../../common/modal/modal';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import ModalHeader from '../../common/modal/modalHeader';
import CanvasDraw from "react-canvas-draw";
import socket from "../../../services/socketService";
import { PhotoshopPicker } from 'react-color';

const Draw = ({ onClose, room }) => {
  const [show, setShow] = useState(false);
  const [brushColor, setBrushColor] = useState("#444");
  const canvasRef = useRef();
  const [saveData, setSaveData] = useState('');


  useEffect(() => {

    socket.on('drawing', payload => {
      setSaveData(data => data = payload.data);
    });

    return () => {
      socket.off('drawing');
    }
  }, []);

  const sendDrawing = () => {
    const data = canvasRef.current.getSaveData();

    const payload = {
      data,
      room: room
    };

    socket.emit("draw", payload);
  }

  const handleMouseUp = () => {
    sendDrawing();
  }

  const handleSave = () => {
    const result = canvasRef.current.canvas.drawing.toDataURL('');
    const image = document.createElement('a');

    image.href = result;
    image.download = 'image.jpeg';
    image.click();
  }

  const handleUndo = () => {
    canvasRef.current.undo();
    sendDrawing();
  }

  const handleClear = () => {
    canvasRef.current.clear();
    sendDrawing();
  }

  const handleChangeComplete = (color) => {
    setBrushColor(color.hex);
  };

  const handleBrushColor = () => {
    setShow(true);
  }

  const handleShow = () => {
    setShow(!show);
  }

  return (
    <div className='drawModal'>
      <Modal>
        <ModalHeader onClose={onClose}>
          <div className="drawActions">
            {show &&
              <PhotoshopPicker
                color={brushColor}
                onChangeComplete={handleChangeComplete}
                onAccept={handleShow}
                onCancel={handleShow}
              />
            }
            <button onClick={handleUndo}> Undo </button>
            <button onClick={handleClear}> Clear </button>
            <button onClick={handleBrushColor}> brush color </button>
            <button onClick={handleSave} className="saveDownload"> Save and Download </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <div
            className="panel"
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
          >
            <CanvasDraw
              style={{
                position: 'absolute',
                left: '0',
                top: '0'
              }}
              ref={canvasRef}
              saveData={saveData}
              brushRadius={2}
              brushColor={brushColor}
              catenaryColor="#0a0302"
              gridColor="rgba(150,150,150,0.17)"
              hideGrid={true}
              canvasWidth="100%"
              canvasHeight='100%'
              immediateLoading={true}
              backgroundColor='white'
            />
          </div>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </div >
  );
};

export default Draw;  
