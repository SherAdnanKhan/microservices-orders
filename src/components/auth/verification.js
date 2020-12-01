import React from 'react';

const Verification = () => {
  return (
    <div className="wrapperOtp">
      <div className="verifyBox">
        <div className="logo">
          <img src="/assets/images/logoWhite.png" alt="" />
        </div>
        <div className="verficationOtp" >
          <h3>Verfication</h3>
          <p>Please enter OTP:</p>
          <div className="otpField">
            <input type="text" className="otp" placeholder="OTP" />
            <button type="button" disable className="disable">Verify</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
