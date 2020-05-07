import React, { useState } from 'react';
import Input from '../common/input';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword } from '../../actions/authActions';
import Spinner from '../common/spinner';

const ChangePassword = () => {
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    old_password: '',
    password: '',
    confirm_password: ''
  });

  const dispatch = useDispatch();
  const {
    loading: { loading },
    error: { error }
  } = useSelector(state => state);

  const validate = () => {
    const errors = {};

    if (!data.old_password) {
      errors.old_password = 'Required';
    }
    if (data.password.length < 8) {
      errors.password = 'Password must have at least eight characters';
    } else if (data.password !== data.confirm_password) {
      errors.confirm_password = 'Password and confirm password do not match.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }

  const validateProperty = input => {
    const newErrors = { ...errors };

    switch (input.name) {
      case 'old_password':
        newErrors.old_password = !input.value ? 'Required.' : '';
        break;
      case 'password':
        newErrors.password = input.value.length < 8 ? 'Password must have at least eight characters.' : '';
        break;
      case 'confirm_password':
        newErrors.confirm_password = data.password !== input.value ? 'Password and confirm password do not match.' : '';
        break;
      default:
        break;
    }

    return Object.keys(newErrors).length === 0 ? null : newErrors;
  }

  const handleChange = ({ target: input }) => {
    const errors = validateProperty(input);
    if (errors) {
      setErrors(errors);
    }
    setData({ ...data, [input.name]: input.value });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (success)
      setSuccess('');

    dispatch(changePassword(data, response => setSuccess(response.message)));
  }

  return (
    <div className="wrapper changePasswordScreen">
      <form onSubmit={handleSubmit}>
        {success && <div className="success"> {success} </div>}
        {error && <div className="error"> {error.message && error.message} </div>}
        <Input
          type="password"
          name="old_password"
          id="old_password"
          label="Current Password"
          value={data.old_password}
          onChange={handleChange}
          error={errors.old_password}
        />
        <Input
          type="password"
          name="password"
          id="password"
          label="New Password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          type="password"
          name="confirm_password"
          id="confirm_password"
          label="Confirm New Password"
          value={data.confirm_password}
          onChange={handleChange}
          error={errors.confirm_password}
        />
        <button className="btn" disabled={validate()}> Change Password</button>
        {loading && <Spinner />}
      </form>
    </div>
  )
}

export default ChangePassword;
