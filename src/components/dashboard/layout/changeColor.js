import React from 'react';

const ChangeColor = ({ onColorChange }) => {
  return (
    <div className="colorChangerScreen">
      <div className="centerCenter">
        <div className="feelImg">
          <div className="gold">
            <img alt="" src="/assets/images/expressions/iconyellow.png" color="gold" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
          </div>
          <div className="gray">
            <img alt="" src="/assets/images/expressions/icongray.png" color="gray" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
          </div>
          <div className="orange">
            <img alt="" src="/assets/images/expressions/iconorange.png" color="orange" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
          </div>
          <div className="green">
            <img alt="" src="/assets/images/expressions/icongreen.png" color="limegreen" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
          </div>
          <div className="red">
            <img alt="" src="/assets/images/expressions/iconred.png" color="red" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
          </div>
          <div className="purple">
            <img alt="" src="/assets/images/expressions/iconpurple.png" color="purple" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
          </div>
          <div className="blue">
            <img alt="" src="/assets/images/expressions/iconblue.png" color="dodgerblue" onClick={e => onColorChange(e.currentTarget.attributes.color.value)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeColor;
