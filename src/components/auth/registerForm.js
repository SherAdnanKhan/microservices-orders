import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { emailWithDomains } from '../../constants/regex';

const RegisterForm = () => {
  const history = useHistory();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: ''
  });

  const validate = () => {
    const errors = {};

    if (step === 2) {
      if (!data.firstName && !data.lastName) {
        errors.name = 'Please fill first and last name.';
        errors.firstName = true;
        errors.lastName = true;
      } else if (!data.firstName) {
        errors.name = 'Please fill first name.';
        errors.firstName = true;
      } else if (!data.lastName) {
        errors.name = 'Please fill last name.';
        errors.lastName = true;
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
      } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Password and confirm password do not match.';
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
        console.log("adsadadad");
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
              <label htmlFor="firstName">
                <span className="labelText">First Name</span>
                <input
                  type="text"
                  name="firstName"
                  className={errors.firstName && 'is-invalid'}
                  id="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="lastname">
                <span className="labelText">Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  id="lastname"
                  className={errors.lastName && 'is-invalid'}
                  value={data.lastName}
                  onChange={handleChange}
                />
              </label>
              {errors.name && <div className="error"> {errors.name} </div>}
            </div>
          }
          {step === 3 &&
            <div className="animated fullWidth" step={3}>
              <label htmlFor="username">
                <span className="labelText">Select an Artistname</span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className={errors.username && 'is-invalid'}
                  value={data.username}
                  onChange={handleChange}
                />
              </label>
              {errors.username && <div className="error"> {errors.username} </div>}
            </div>
          }
          {step === 4 &&
            <div className="animated fullWidth" step={4}>
              <label htmlFor="email">
                <span className="labelText">Email</span>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={errors.email && 'is-invalid'}
                  value={data.email}
                  onChange={handleChange}
                />
              </label>
              {errors.email && <div className="error"> {errors.email} </div>}
            </div>
          }
          {step === 5 &&
            <div className="animated fullWidth" step={5}>
              <label htmlFor="password_1">
                <span className="labelText">Create a Password</span>
                <input
                  type="password"
                  name="password"
                  id="password_1"
                  className={errors.password && "is-invalid"}
                  value={data.password}
                  onChange={handleChange}
                />
              </label>
              {errors.password && <div className="error"> {errors.password} </div>}

              <label htmlFor="password_2">
                <span className="labelText">Confirm Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  id="password_2"
                  className={errors.confirmPassword && "is-invalid"}
                  value={data.confirmPassword}
                  onChange={handleChange}
                />
              </label>
              {errors.confirmPassword && <div className="error"> {errors.confirmPassword} </div>}
            </div>
          }
          {step === 6 &&
            <div className="animated fullWidth" step={6} >
              <h3>Click avatar to add your own profile pic</h3>
              <label htmlFor="avatar" className={errors.avatar ? "avatar clickable is-invalid" : "avatar clickable"}>
                {data.avatar && <img src={data.avatar} alt="avatar" />}
              </label>
              <input type="file" name="avatar" id="avatar" accept=".png, .jpg, .jpeg" onChange={handleChange} />
              {errors.avatar && <div className="error"> {errors.avatar} </div>}
            </div>
          }
          <div className="animated fullWidth" step={7} />
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
