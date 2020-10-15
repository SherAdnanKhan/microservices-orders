import React, { useRef, useState } from 'react'
import Modal from '../../common/modal/modal';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import ModalHeader from '../../common/modal/modalHeader';
import CanvasDraw from "react-canvas-draw";
// import socket from "../../../services/socketService";
// import { data } from 'jquery';


const Draw = ({ onClose, room }) => {
  // const [objects, setObjects] = useState();
  // const [lineColor, setLineColor] = useState('black');
  // const [hasRendered, setHasRendered] = useState(false);
  const [tool, setTool] = useState("Pencil");
  const [brushColor, setBrushColor] = useState("#444");
  const canvasRef = useRef();
  // const drawing = useRef(true);
  const [saveData] = useState();
  // const dataRef = useRef(true);

  // useEffect(() => {
  //   if (!hasRendered) {
  //     socket.on('drawing', payload => {
  //       console.log(payload);
  //       setSaveData(data => data = payload.data);
  //       dataRef.current = false;
  //     });

  //     setHasRendered(true);
  //   }

  // setSaveData(data => data =can.current.getSaveData());
  // return () => {
  //   socket.off('drawing');
  // }
  // }, [hasRendered, saveData]);

  // const handleChange = canvas => {
  //   const data = canvas.getSaveData();
  //   // console.log('handle change',)

  //   const payload = {
  //     data,
  //     room: room
  //   };

  //   if (dataRef.current) {
  //     // socket.emit("draw", payload);
  //   } else {
  //     dataRef.current = true;
  //   }
  // }

  const handleToolChange = ({ target: input }) => {
    if (input.value === 'Eraser') {
      setBrushColor('#fff');
    } else {
      setBrushColor('#444');
    }
    setTool(input.value)
  }

  return (
    <div className='drawModal'>
      <Modal>
        <ModalHeader onClose={onClose}>
          <div>
            <label> Tools </label>
            <select value={tool} onChange={handleToolChange}>
              <option value="Select"> Select </option>
              <option value="Pencil"> Pencil </option>
              <option value="Eraser"> Eraser </option>
            </select>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="panel">
            <CanvasDraw
              ref={canvasRef}
              saveData={saveData}
              // onChange={handleChange}
              brushRadius={tool === 'Eraser' ? 20 : 2}
              brushColor={brushColor}
              catenaryColor="#0a0302"
              gridColor="rgba(150,150,150,0.17)"
              hideGrid={true}
              canvasWidth={'100%'}
              canvasHeight={'100%'}
              immediateLoading={true}
            />
          </div>

        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Draw;  
