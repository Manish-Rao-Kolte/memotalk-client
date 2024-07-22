import React, { useState } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAsync, userSelector } from "@/redux/reducers/userReducer";
import Input from "@/components/Input";

const initialUserData = {
  email: null,
  username: null,
  fullname: null,
  password: null,
  avatar: null,
};

const RegisterUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(userSelector);
  const [userData, setUserData] = useState(initialUserData);

  // const handleSuggestions = async () => {
  //   if (!suggestionClicked) {
  //     const words = userData.fullname.split(" ");
  //     const response = await axios.get(
  //       `https://api.datamuse.com/sug?s=${words[0]}`
  //     );
  //     setUsernameSuggestion([...response?.data]);
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    dispatch(registerUserAsync(formData))
      .then((result) => {
        if (result.error) return;
        setUserData(initialUserData);
        navigate("/login");
      })
      .catch((error) => {
        setUserData(initialUserData);
        return;
      });
  };

  return (
    <div className='h-screen w-screen'>
      <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        {/* header starts here */}
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-20 w-auto'
            src='/logo_1.jpg'
            alt='Your Company'
          />
          <h2 className='mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Welcome! Create your account.
          </h2>
        </div>

        {/* form starts here */}
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleFormSubmit}>
            {/* email starts here */}

            <Input
              lable={"Email"}
              id={"email"}
              name={"email"}
              type={"email"}
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
            />

            {/* fullname starts here */}
            <Input
              lable={"Full Name"}
              id={"fullname"}
              name={"fullname"}
              type={"text"}
              value={userData.fullname}
              onChange={(e) =>
                setUserData({ ...userData, fullname: e.target.value })
              }
              required
            />

            {/* username starts here */}
            <Input
              lable={"Username"}
              id='username'
              name='username'
              type='text'
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              required
            />

            {/* password starts here */}
            <Input
              lable={"Password"}
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
            />

            {/* avatar starts here */}
            <div className='flex items-center space-x-6'>
              <div className='shrink-0 flex justify-center items-center border rounded-full h-28 w-28'>
                <img
                  id='preview_img'
                  className='h-28 w-28 object-cover rounded-full'
                  src={
                    userData.avatar !== null
                      ? URL.createObjectURL(userData.avatar)
                      : "/demo_avatar.avif"
                  }
                  alt='Current profile photo'
                />
              </div>
              <label className='block'>
                <span className='sr-only'>Choose profile photo</span>
                <input
                  type='file'
                  name='avatar'
                  id='avatar'
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      avatar: e.target.files[0],
                    });
                  }}
                  className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
                />
              </label>
            </div>

            <div>
              <button
                type='submit'
                disabled={loading}
                className='flex w-full justify-center rounded-md bg-form-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-form-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-form-secondary'
              >
                {loading ? (
                  <p className='animate-pulse'>Registering...</p>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an account?
            <Link
              to={!loading && "/login"}
              className='font-semibold leading-6 text-form-primary hover:text-form-secondary'
            >
              {" "}
              Sign In instead!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
