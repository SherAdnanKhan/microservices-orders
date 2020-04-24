import React from 'react'
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  return (
    <div>
      <div className="return">
        <Link to="">
          <i className="fas fa-arrow-left"></i>
        </Link>
      </div>
      <div className="wrapper registerationScreen">
        <div className="view">
          <div className="logo">
            <img src="./assets/images/logowhite.png" alt="" />
          </div>

          <h3>Join Meuzm</h3>
          <p>
            Lets open your Studio up in a few easy steps
          </p>
          <button className="btn">
            Next
         </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 
