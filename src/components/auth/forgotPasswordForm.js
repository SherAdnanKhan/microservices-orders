import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleChange = ({ target: input }) => {
    setEmail(input.value);
  };

  const validate = () => {
    let error = '';

    if (!email) {
      error = 'Please enter your email.';
    }

    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();

    if (!errors) {

    }

    // setErrors(errors || {});
  };

  return (
    <div className="wrapper">
      <div className="forgotPasswordScreen">
        {/* Hello world */}
        {/* <img src="avataricongray.png" height="100%" style={{ display: "none" }} /> */}
        <div className="header">
          <h2>Forgot Password?</h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Enter your e-mail address below to reset you password
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
            />
          </label>
          {/* <div className="message"></div> */}
          <button
            id="submit"
            type="submit"
            className="btn clickable"
          >
            Send
          </button>
          <div>

          </div>
          {/* <div className="sendload">
              <svg className="loader" width={40} height={40}>
                <circle cx={20} cy={20} r={15}></circle>
              </svg>
            </div> */}
          <p>
            Return to <Link to="/login">Login page</Link>
          </p>
        </form>

        <p id="trouble">
          If you encounter any problem with this form please email us the details so
          that we may rectify the problem, please include a screenshot of what your
          browser is displaying, thank you.
          <Link to=""> Contact us</Link>
        </p>

        <footer>
          <p>production of: QuetzalArtz x R&amp;R </p>
        </footer>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
