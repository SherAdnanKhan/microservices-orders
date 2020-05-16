import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Input from '../common/input';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../actions/authActions';
import Spinner from '../common/spinner';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');

  const dispatch = useDispatch();
  const {
    loading: { loading },
    error: { error }
  } = useSelector(state => state);

  const handleChange = ({ target: input }) => {
    setEmail(input.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (success)
      setSuccess('');

    dispatch(forgotPassword({ email }, response => setSuccess(response.message)));
  };

  return (
    <div className="wrapper">
      {loading && <Spinner />}

      <div className="forgotPasswordScreen">
        <div className="header">
          <h2>Forgot Password?</h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {success &&
            <div className="success">
              {success}
            </div>
          }
          {error &&
            <div className="error">
              {error.email && error.email}
              {error.message && error.message}
            </div>
          }
          <Input
            name="email"
            id="email"
            label="Enter your e-mail address below to reset you password"
            value={email}
            onChange={handleChange}
          />
          <button
            id="submit"
            type="submit"
            className="btn clickable"
          >
            Send
          </button>
          <div>
          </div>
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
