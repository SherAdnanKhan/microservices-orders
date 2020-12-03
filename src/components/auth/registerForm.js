import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { emailWithDomains } from '../../constants/regex';
import Input from '../common/input';
import Spinner from '../common/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { register, getCurrentUser } from '../../actions/authActions';
import { useWindowUnloadEffect } from '../common/useWindowUnloadEffect';
import ImageCropper from '../common/imageCropper';
import { isEmpty, completeDate } from '../../utils/helperFunctions';
import { alphabets, alphabetsWithoutSpecialChars } from "../../constants/regex";

const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    loading: { loading },
    error: { error }
  } = useSelector(state => state);

  const [toggle, setToggle] = useState(false);
  // const [skip, setSkip] = useState(true);
  const [image, setImage] = useState('/assets/images/avataricon.png');
  const [croppedImage, setCroppedImage] = useState({});

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    dob: "",
    email: '',
    password: '',
    confirm_password: '',
    avatar: null,
    agreement: 0,
  });

  // this hook will
  // call when we reload our page so that we
  // can easily save our form data in a localstorage

  useWindowUnloadEffect(() => {
    if (step > 1 && !isEmpty(data)) {
      localStorage.setItem('step', JSON.stringify(step));
      localStorage.setItem('data', JSON.stringify({ ...data, avatar: null }));
    }
  }, true);

  useEffect(() => {
    if (localStorage.data) {
      const _data = JSON.parse(localStorage.getItem('data'));
      setData(_data);
    }

    if (localStorage.step) {
      const previousStep = JSON.parse(localStorage.getItem('step'));
      previousStep === 9 ? setStep(previousStep - 1) : setStep(previousStep);
    } else {
      setStep(1);
    }
  }, []);

  const validate = () => {
    const errors = {};
    let ageError;

    switch (step) {
      case 2:
        if (!data.first_name && !data.last_name) {
          errors.name = 'Please fill first and last name.';
          errors.first_name = true;
          errors.last_name = true;
        }
        else if (!data.first_name) {
          errors.name = 'Please fill first name.';
          errors.first_name = true;
        }
        else if (!data.last_name) {
          errors.name = 'Please fill last name.';
          errors.last_name = true;
        }
        else if (data.first_name.length < 3) {
          errors.name = 'First name must be atleast 3 charcters long';
          errors.first_name = true;
        }
        else if (data.last_name.length < 3) {
          errors.name = 'Last name must be atleast 3 charcters long';
          errors.last_name = true;
        }
        else if (data.first_name.length < 3 && data.last_name.length < 3) {
          errors.name = 'First and last name must be atleast 3 charcters long';
          errors.last_name = true;
        }
        else if (!alphabets.test(data.first_name)) {
          errors.name = 'First name must only contains alphabets';
          errors.first_name = true;
        }
        else if (!alphabets.test(data.last_name)) {
          errors.name = 'Last name must only contains alphabets';
          errors.last_name = true;
        }
        else if (!alphabets.test(data.first_name) && !alphabets.test(data.last_name)) {
          errors.name = 'First and last name must only contains alphabets';
          errors.last_name = true;
        }
        break;
      case 3:
        if (!data.dob) {
          errors.dob = 'Please select date of birth';
        }
        else {
          ageError = validateAge(data.dob);
          if (ageError) {
            errors.dob = 'Age must be atleast 13 years or greater'
          }
        }
        break;
      case 4:
        if (!data.username) {
          errors.username = 'Please fillout your Artist name.';
        }
        else if (!alphabetsWithoutSpecialChars.test(data.username)) {
          errors.username = 'Artist name must only contains alphabets ,digits or special characters';
        }
        else if (data.username.length < 8) {
          errors.username = 'Artist name must be atleast 8 characters long';
        }
        break;
      case 5:
        if (!data.email) {
          errors.email = 'Please fillout your Email.';
        }
        else if (!emailWithDomains.test(data.email)) {
          errors.email = 'Not valid Email.';
        }
        break;
      case 6:
        if (data.password.length < 8) {
          errors.password = 'Password must have at least eight characters';
        } else if (data.password !== data.confirm_password) {
          errors.confirm_password = 'Password and confirm password do not match.';
        }
        break;
      case 7:
        if (!data.avatar) {
          errors.avatar = 'please add a profile pic';
        }
        break;
      case 8:
        if (!data.agreement) {
          errors.agreement = 'Please select terms and conditions to proceed';
        }
        break;
      default:
        break;
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const validateAge = (date) => {
    var today = new Date();
    var birthDate = new Date(date);
    var currentAge = today.getFullYear() - birthDate.getFullYear();
    if (currentAge < 13) {
      return true
    }
  }

  const handleChange = ({ target: input }) => {
    if (input.type === 'file' && input.files[0]) {
      setData({ ...data, [input.name]: input.files[0] });
      setErrors({ ...errors, avatar: '' });
      setImage(URL.createObjectURL(input.files[0]));
      setToggle(true);

    } else {
      if (input.type === "checkbox") {
        if (input.checked) {
          setErrors({ ...errors, agreement: '' });
        }
        setData({ ...data, [input.name]: input.checked ? 1 : 0 });
      } else {
        if (input.type === "date") {
          const isErrors = validateAge(input.value);
          if (isErrors) {
            setErrors({ ...errors, dob: "Age must be atleast 13 years or greater" })
          }
          else {
            setErrors({ ...errors, dob: "" })
          }
        }
        if (input.name === "email") {
          setData({ ...data, [input.name]: input.value.trim(" ") });
        }
        else {
          setData({ ...data, [input.name]: input.value });
        }
      }
    }
  };

  const handleBackPress = () => {
    if (step === 1) {
      history.push('/login');
    }

    setStep(step => step - 1);
  };

  const handleNextPress = () => {
    console.log("next press is called")
    const errors = validate();
    if (!errors && step < 9) {
      setStep(step => step + 1);
    }
    setErrors(errors || {});
  };

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('submitting..')
    const formData = new FormData();

    if (!isEmpty(croppedImage)) {
      data.avatar = croppedImage;
    }
    for (let key in data) {
      formData.append(key, data[key]);
    }
    setData({});
    dispatch(register(formData));

  };

  const handleCompleteCrop = blob => {
    setCroppedImage(blob);
  };

  const handleToggle = value => {
    setToggle(value);
  };

  const handleSkip = value => {
    setToggle(value);
    setCroppedImage('');
  };

  return (
    <>
      {getCurrentUser() && <Redirect to="/home" />}
      {loading && <Spinner />}
      <div>
        <div className="return" onClick={handleBackPress}>
          <span>
            <i className="fas fa-arrow-left" />
          </span>
        </div>
        <div className="wrapper registerationScreen">
          <form className="view">
            {step === 1
              && (
                <div className="animated" step={1} active="true">
                  <div className="logo">
                    <img src="./assets/images/logowhite.png" alt="logo white" />
                  </div>
                  <h3>Join Meuzm</h3>
                  <p>
                    Lets open your Studio up in a few easy steps
                  </p>
                </div>
              )}
            {step === 2
              && (
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
                    onEnter={handleNextPress}
                  />
                  <Input
                    name="last_name"
                    id="last_name"
                    label="Last Name"
                    value={data.last_name}
                    onChange={handleChange}
                    error={errors.last_name}
                    showError={false}
                    onEnter={handleNextPress}
                  />
                  {errors.name && (
                    <div className="error">
                      {' '}
                      {errors.name}
                      {' '}
                    </div>
                  )}
                </div>
              )}
            {step === 3
              && (
                <div className="animated fullWidth" step={3}>
                  <Input
                    name="dob"
                    type="date"
                    className="dob"
                    label="Select date of birth"
                    value={data.dob}
                    onChange={handleChange}
                    error={errors.dob}
                    max={completeDate(new Date())}
                    onEnter={handleNextPress}
                  />
                </div>
              )}
            {step === 4
              && (
                <div className="animated fullWidth" step={4}>
                  <Input
                    name="username"
                    id="username"
                    label="Select an Artistname"
                    value={data.username}
                    onChange={handleChange}
                    error={errors.username}
                    onEnter={handleNextPress}
                  />
                </div>
              )}
            {step === 5
              && (
                <div className="animated fullWidth" step={5}>
                  <Input
                    name="email"
                    id="email"
                    label="Email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                    onEnter={handleNextPress}
                  />
                </div>
              )}
            {step === 6
              && (
                <div className="animated fullWidth" step={6}>
                  <Input
                    type="password"
                    name="password"
                    id="password_1"
                    label="Create a Password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                    onEnter={handleNextPress}
                  />
                  <Input
                    type="password"
                    name="confirm_password"
                    id="password_2"
                    label="Confirm Password"
                    value={data.confirm_password}
                    onChange={handleChange}
                    error={errors.confirm_password}
                    onEnter={handleNextPress}
                  />
                </div>
              )}
            {step === 7
              && (
                <div className="animated fullWidth" step={7}>
                  <ImageCropper
                    imageUrl={image}
                    toggle={toggle}
                    onToggle={handleToggle}
                    onSkip={handleSkip}
                    onCompleteCrop={handleCompleteCrop}
                    croppedImage={croppedImage}
                  />
                  <Input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleChange}
                    error={errors.avatar}
                    onEnter={handleNextPress}
                  >
                    <h3>Click avatar to add your own profile pic</h3>
                    <label htmlFor="avatar" className={errors.avatar ? 'avatar clickable is-invalid' : 'avatar clickable'}>
                      {isEmpty(croppedImage)
                        ? <img src={image} alt="avatar" />
                        : <img src={URL.createObjectURL(croppedImage)} alt="avatar" />}
                    </label>
                  </Input>
                </div>
              )}
            {step === 8
              && (
                <div className="agreement-box" step={8} >
                  <Input
                    name="agreement"
                    checked={data.agreement}
                    value={data.agreement}
                    type="checkbox"
                    onChange={handleChange}
                    onEnter={handleNextPress}
                  />
                  <a className="agreement"
                    href="/agreement"
                    target="_blank"
                    rel="noopener noreferrer" >
                    I agree to the muezm website and services agreement.
                  </a>
                  <div className="error">
                    {errors.agreement}
                  </div>
                </div>
              )}
            {step === 9
              && (
                <div className="animated fullWidth" step={9}>
                  <div className="action">
                    <button
                      className="btn"
                      onClick={handleSubmit}
                    >
                      Create Studio
                    </button>
                  </div>
                  {error
                    && (
                      <>
                        <div className="error">
                          {error.username && (
                            <p>
                              {' '}
                        Artistname &#34;
                              {data.username}
                        &#34; already exist
                            </p>
                          )}
                          {error.email && (
                            <p>
                              {' '}
                        Email &#34;
                              {data.email}
                        &#34; already exist
                              {' '}
                            </p>
                          )}
                          {error.avatar && (
                            <p>
                              {error.avatar}
                              {' '}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                </div>
              )}
          </form>
          {step < 9
            && (
              <div className="action">
                <button
                  className="btn"
                  onClick={handleNextPress}
                >
                  Next
                </button>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
