import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import Input from '../common/input';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../common/spinner';
import { login, getCurrentUser } from '../../actions/authActions';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const {
    loading: { loading },
    error: { error }
  } = useSelector(state => state);
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    if (error) {
      // setErrors(error);
      console.log(error);
    }
  }, [error]);

  const validate = () => {
    const errors = {};

    if (!data.email) {
      errors.email = 'Please enter an artistname or email.';
    }

    if (!data.password) {
      errors.password = 'Please enter a password.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = ({ target: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(data));
  };

  return (
    <>
      {getCurrentUser() && <Redirect to="/home" />}
      <div className="wrapper">
        <div className="loginScreen">
          <h1>Meuzm</h1>
          <div className="procu">
            <div className="scene">
              <div className="cube">
                <div className="cube-face  cube-face-front" style={{ borderColor: 'transparent' }}><img src="./assets/images/logowhite.png" alt="" /></div>
                <div className="cube-face  cube-face-back" style={{ borderColor: 'transparent' }}><img src="./assets/images/logowhite.png" alt="" /></div>
                <div className="cube-face  cube-face-left" style={{ borderColor: 'transparent' }}><img src="./assets/images/logowhite.png" alt="" /></div>
                <div className="cube-face  cube-face-right" style={{ borderColor: 'transparent' }}><img src="./assets/images/logowhite.png" alt="" /></div>
              </div>
            </div>
          </div>

          <h2>LOGIN</h2>

          <form onSubmit={handleSubmit}>
            {error &&
              <div className="error">
                {error.errors.email && error.errors.email[0]}
                {error.errors.error && error.message}
              </div>
            }
            <Input
              name="email"
              id="email"
              label="Artistname or Email"
              value={data.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              id="password"
              label="password"
              value={data.password}
              onChange={handleChange}
            >
              <span className="passwordEye" eye="off">
                <i className="far fa-eye-slash"></i>
              </span>
            </Input>

            <button
              className="btn"
              name="login_user"
              disabled={validate()}
            >
              Login
            </button>
            {loading && <Spinner />}
            <div className="rightLeftLine">  or  </div>

            <div className="registerBtn">
              <Link to="/register">Create New Artist Account</Link>
            </div>

            <div className="forgotPassword">
              <Link to="/forgot">Forgot password?</ Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
