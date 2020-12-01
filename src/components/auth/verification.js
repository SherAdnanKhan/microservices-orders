import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getCurrentUser } from '../../actions/authActions';
import Input from '../common/input';


const Verification = () => {
  const currentUser = getCurrentUser();
  const history = useHistory();
  useEffect(() => {
    if (currentUser.email_verified_at) {
      history.goBack();
    }
  }, []);
  return (

    <div className="wrapperOtp">
      <div className="verifyBox">
        <div className="logo">
          <img src="/assets/images/logoWhite.png" alt="" />
        </div>
        <div className="verificationInfo">
          <h1> Welcom {currentUser.username}</h1>
          <p>Please enter the verfication code we sent to {currentUser.email} <Link> Resend code </Link></p>
        </div>
        <div className="verficationOtp" >
          <div className="otpField">
            <Input
              type="password"
              className="otp"
              placeholder="xxxxx"
              maxLength="4"

            >
              <span className="passwordEye" eye="off">
                <i className="far fa-eye-slash" />
              </span>
            </Input>
            <button type="button" disable className="disable">Verify</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
