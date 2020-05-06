import React, { useState, useEffect } from 'react'
import { useHistory, Redirect } from 'react-router-dom';
import { emailWithDomains } from '../../constants/regex';
import Input from '../common/input';
import Spinner from '../common/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { register, getCurrentUser } from '../../actions/authActions';

const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    loading: { loading },
    error: { error }
  } = useSelector(state => state);

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    avatar: '',
    image: ''
  });

  useEffect(() => {
    if (error) {
      setErrors(error);
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (localStorage.data) {
      setData(JSON.parse(localStorage.getItem('data')));
    }

    if (localStorage.step) {
      setStep(JSON.parse(localStorage.getItem('step')));
    } else {
      setStep(1);
    }
  }, []);

  const validate = () => {
    const errors = {};

    switch (step) {
      case 2:
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
        break;
      case 3:
        if (!data.username) {
          errors.username = 'Please fillout your Artist name.';
        }
        break;
      case 4:
        if (!data.email) {
          errors.email = 'Please fillout your Email.';
        } else if (!emailWithDomains.test(data.email)) {
          errors.email = 'Not valid Email.';
        }
        break;
      case 5:
        if (data.password.length < 8) {
          errors.password = 'Password must have at least eight characters';
        } else if (data.password !== data.confirm_password) {
          errors.confirm_password = 'Password and confirm password do not match.';
        }
        break;
      case 6:
        if (!data.avatar) {
          errors.avatar = 'please add a profile pic';
        }
        break;
      default:
        break;
    }

    return Object.keys(errors).length === 0 ? null : errors;
  }

  const handleChange = ({ target: input }) => {
    if (input.type === 'file') {
      if (input.files[0]) {
        setData({ ...data, [input.name]: input.files[0], image: URL.createObjectURL(input.files[0]) });
        // const data = JSON.parse(localStorage.getItem('data'));
        // // data.i
      }
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  }

  const handleBackPress = () => {
    if (step === 1) {
      return history.push('/login');
    }

    setStep(step => step - 1);
    localStorage.setItem('step', JSON.stringify(step - 1));
  }

  const handleNextPress = () => {
    const errors = validate();

    if (!errors) {
      if (step < 7) {
        setStep(step => step + 1);
        localStorage.setItem('step', JSON.stringify(step + 1));
        localStorage.setItem('data', JSON.stringify(data));
      }
    }
    setErrors(errors || {});
  }

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in data) {
      if (key !== 'image') formData.append(key, data[key]);
    }

    dispatch(register(formData));
  }

  return (
    <>
      {getCurrentUser() && <Redirect to="/home" />}
      <div>
        <div className="return" onClick={handleBackPress}>
          <span>
            <i className="fas fa-arrow-left" />
          </span>
        </div>
        <div className="wrapper registerationScreen">
          <form className="view" enctype="multipart/form-data" onSubmit={handleSubmit}>
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
                    {data.avatar && <img src={data.image} alt="avatar" />}
                  </label>
                </Input>
              </div>
            }
            {step === 7 &&
              <div className="animated fullWidth" step={7}>
                <div className="action">
                  <button
                    className="btn"
                  >
                    Create Studio
                  </button>
                </div>
              </div>
            }
            {loading && <Spinner />}
          </form>
          {step < 7 &&
            <div className="action">
              <button
                className="btn"
                onClick={handleNextPress}
              >
                Next
             </button>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
