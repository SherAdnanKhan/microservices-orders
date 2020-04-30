import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { emailWithDomains } from '../../constants/regex';
import Input from '../common/input';

const RegisterForm = () => {
  const history = useHistory();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    avatar: ''
  });

  const validate = () => {
    const errors = {};

    if (step === 2) {
      if (!data.first_name && !data.last_name) {
        errors.name = 'Please fill first and last name.';
        errors.first_name = true;
        errors.last_name = true;
      } else if (!data.first_name) {
        errors.name = 'Please fill first name.';
        errors.first_name = true;
      } else if (!data.last_name) {
        errors.name = 'Please fill last name.';
        errors.last_name = true;
      }
    } else if (step === 3) {
      if (!data.username) {
        errors.username = 'Please fillout your Artist name.';
      }
    } else if (step === 4) {
      if (!data.email) {
        errors.email = 'Please fillout your Email.';
      } else if (!emailWithDomains.test(data.email)) {
        errors.email = 'Not valid Email.';
      }
    } else if (step === 5) {
      if (data.password.length < 8) {
        errors.password = 'Password must have at least eight characters';
      } else if (data.password !== data.confirm_password) {
        errors.confirm_password = 'Password and confirm password do not match.';
      }
    } else if (step === 6) {
      if (!data.avatar) {
        errors.avatar = 'please add a profile pic';
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }

  const handleChange = ({ target: input }) => {
    if (input.type === 'file') {
      if (input.files[0]) {
        setData({ ...data, [input.name]: URL.createObjectURL(input.files[0]) });
      }
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();

    if (!errors) {
      if (step < 7) {
        setStep(step => step + 1);
      }
    }
    setErrors(errors || {});
  }

  return (
    <div>
      <div className="return" onClick={() => step === 1 ? history.push('/login') : setStep(step => step - 1)}>
        <span>
          <i className="fas fa-arrow-left" />
        </span>
      </div>
      <div className="wrapper registerationScreen">
        <form className="view">
          {step === 1 &&
            <div className="animated" step={1} active="true">
              <div className="logo">
                <img src="./assets/images/logowhite.png" alt="logo white" />
              </div>
              <h3>Join Meuzm</h3>
              <p>
                Lets open your Studio up in a few easy steps
              </p>
            </div>
          }
          {step === 2 &&
            <div className="animated" step={2}>
              <h3>What is your Real Name?</h3>
              <Input
                name="first_name"
                id="first_name"
                label="First Name"
                value={data.first_name}
                onChange={handleChange}
                error={errors.first_name}
                showError={false}
              />
              <Input
                name="last_name"
                id="last_name"
                label="Last Name"
                value={data.last_name}
                onChange={handleChange}
                error={errors.last_name}
                showError={false}
              />
              {errors.name && <div className="error"> {errors.name} </div>}
            </div>
          }
          {step === 3 &&
            <div className="animated fullWidth" step={3}>
              <Input
                name="username"
                id="username"
                label="Select an Artistname"
                value={data.username}
                onChange={handleChange}
                error={errors.username}
              />
            </div>
          }
          {step === 4 &&
            <div className="animated fullWidth" step={4}>
              <Input
                name="email"
                id="email"
                label="Email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>
          }
          {step === 5 &&
            <div className="animated fullWidth" step={5}>
              <Input
                type="password"
                name="password"
                id="password_1"
                label="Create a Password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Input
                type="password"
                name="confirm_password"
                id="password_2"
                label="Confirm Password"
                value={data.confirm_password}
                onChange={handleChange}
                error={errors.confirm_password}
              />
            </div>
          }
          {step === 6 &&
            <div className="animated fullWidth" step={6} >
              <Input
                type="file"
                name="avatar"
                id="avatar"
                accept=".png, .jpg, .jpeg"
                onChange={handleChange}
                error={errors.avatar}
              >
                <h3>Click avatar to add your own profile pic</h3>
                <label htmlFor="avatar" className={errors.avatar ? "avatar clickable is-invalid" : "avatar clickable"}>
                  {data.avatar && <img src={data.avatar} alt="avatar" />}
                </label>
              </Input>
            </div>
          }
          {/* <div className="animated fullWidth" step={7} /> */}
        </form>
        <div className="action">
          <button
            className="btn"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
    </div >
  );
};

export default RegisterForm;
