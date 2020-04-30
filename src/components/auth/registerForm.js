import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { emailWithDomains } from '../../constants/regex';

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
              <label htmlFor="first_name">
                <span className="labelText">First Name</span>
                <input
                  type="text"
                  name="first_name"
                  className={errors.first_name && 'is-invalid'}
                  id="first_name"
                  value={data.first_name}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="last_name">
                <span className="labelText">Last Name</span>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className={errors.last_name && 'is-invalid'}
                  value={data.last_name}
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
                  name="confirm_password"
                  id="password_2"
                  className={errors.confirm_password && "is-invalid"}
                  value={data.confirm_password}
                  onChange={handleChange}
                />
              </label>
              {errors.confirm_password && <div className="error"> {errors.confirm_password} </div>}
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
