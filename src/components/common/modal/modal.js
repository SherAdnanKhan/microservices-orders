import React, { useState } from 'react';

const Modal = ({ children, avatar }) => {
  const [styles] = useState(
    avatar ?
      {
        backgroundImage: "url(" + avatar + ")",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }
      : {}
  );

  return (
    <div className="myModal">
      <div
        className="innerModal"
        style={styles}
      >

        {children && children}
      </div>
    </div>
  );
};

export default Modal;
