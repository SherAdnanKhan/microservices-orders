import React, { useState } from 'react';
import Input from '../common/input';

const ChangePassword = () => {
  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!data.currentPassword) {
      errors.currentPassword = 'Required';
    }
    if (data.newPassword.length < 8) {
      errors.newPassword = 'Password must have at least eight characters';
    } else if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = 'Password and confirm password do not match.';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }

  const validateProperty = input => {
    const newErrors = { ...errors };

    switch (input.name) {
      case 'currentPassword':
        newErrors.currentPassword = !input.value ? 'Required.' : '';
        break;
      case 'newPassword':
        newErrors.newPassword = input.value.length < 8 ? 'Password must have at least eight characters.' : '';
        break;
      case 'confirmPassword':
        newErrors.confirmPassword = data.newPassword !== input.value ? 'Password and confirm password do not match.' : '';
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
  }

  return (
    <div className="wrapper changePasswordScreen">
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          name="currentPassword"
          id="currentPassword"
          label="Current Password"
          value={data.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
        />
        <Input
          type="password"
          name="newPassword"
          id="newPassword"
          label="New Password"
          value={data.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm New Password"
          value={data.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <button className={validate() ? 'btn btnDisabled' : 'btn btnEnabled'} disabled={validate()}> Change Password</button>
      </form>
    </div>
  )
}

export default ChangePassword;
