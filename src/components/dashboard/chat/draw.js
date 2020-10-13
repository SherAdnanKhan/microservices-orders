import React, { useEffect, useRef, useState } from 'react'
import Modal from '../../common/modal/modal';
import ModalBody from '../../common/modal/modalBody';
import ModalFooter from '../../common/modal/modalFooter';
import ModalHeader from '../../common/modal/modalHeader';
import { SketchField, Tools } from 'react-sketch';


const Draw = ({ onClose, socket, room }) => {
  const [objects, setObjects] = useState();
  const [lineColor, setLineColor] = useState('black');
  const [tool, setTool] = useState(Tools.Pencil);
  const [hasRendered, setHasRendered] = useState(false);

  const sketchRef = useRef();


  useEffect(() => {
    if (!hasRendered) {
      socket.on('drawing', data => {
        console.log(data);
        setObjects(objects => objects = JSON.stringify(data));
      });
      setHasRendered(true);
    }
    return () => {
      socket.off('drawing');
    }
  }, [hasRendered, socket]);

  const handleChange = () => {
    const newObjects = sketchRef.current._fc._objects
    const payload = {
      objects: newObjects,
      room: room
    };

    const data = {
      objects: newObjects
    }

    if (JSON.stringify(data) !== objects) {
      socket.emit("draw", payload);
    }
  }

  const handleToolchange = ({ target: input }) => {
    if (input.value === 'Eraser') {
      setTool(Tools.Pencil)
      setLineColor('white')
    } else {

      setTool(Tools[input.value]);
      setLineColor('black')
    }
  }

  return (
    <div className='drawModal'>
      <Modal>
        <ModalHeader onClose={onClose}>
          <div>
            <label> Tools </label>
            <select onChange={handleToolchange} value="Pencil">
              <option value="Select"> Select </option>
              <option value="Pencil"> Pencil </option>
              <option value="Circle"> Circle </option>
              <option value="Rectangle"> Rectangle </option>
              <option value="Eraser"> Eraser </option>
            </select>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="panel">
            <SketchField
              width='100%'
              ref={sketchRef}
              style={{ background: 'white' }}
              height='100%'
              tool={tool}
              lineColor={lineColor}
              lineWidth={lineColor === 'white' ? 20 : 3}
              value={objects}
              onChange={handleChange}
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
