import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAsync, userSelector } from "@/redux/reducers/userReducer";

const initialUserData = {
  email: "",
  username: "",
  fullname: "",
  password: "",
  avatar: null,
};

const RegisterUser = () => {
  const { loading } = useSelector(userSelector);
  const [userData, setUserData] = useState(initialUserData);
  const [usernameSuggestion, setUsernameSuggestion] = useState([]);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //currently using third party api but can make our own on server side
  const handleSuggestions = async () => {
    if (!suggestionClicked) {
      const words = userData.fullname.split(" ");
      const response = await axios.get(
        `https://api.datamuse.com/sug?s=${words[0]}`
      );
      setUsernameSuggestion([...response?.data]);
    }
  };

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
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-form-primary sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            {/* fullname starts here */}
            <div>
              <label
                htmlFor='fullname'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Full Name
              </label>
              <div className='mt-2'>
                <input
                  id='fullname'
                  name='emafullnameil'
                  type='text'
                  value={userData.fullname}
                  onChange={(e) =>
                    setUserData({ ...userData, fullname: e.target.value })
                  }
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-form-primary sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            {/* username starts here */}
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Username
                </label>
                <div className='text-sm'>
                  {!suggestionClicked && (
                    <p
                      className='font-semibold text-indigo-600 hover:text-indigo-500'
                      onClick={() => {
                        setSuggestionClicked(true);
                        handleSuggestions();
                      }}
                    >
                      Get suggestions
                    </p>
                  )}
                  {suggestionClicked && (
                    <p
                      className='font-semibold text-indigo-600 hover:text-indigo-500'
                      onClick={() => {
                        setSuggestionClicked(false);
                        handleSuggestions();
                      }}
                    >
                      Create your own
                    </p>
                  )}
                </div>
              </div>
              <div className='mt-2'>
                {!suggestionClicked && (
                  <input
                    id='username'
                    name='username'
                    type='text'
                    value={userData.username}
                    onChange={(e) =>
                      setUserData({ ...userData, username: e.target.value })
                    }
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-form-primary sm:text-sm sm:leading-6'
                  />
                )}
                {suggestionClicked && (
                  <select
                    name='username'
                    id='username'
                    onChange={(e) =>
                      setUserData({ ...userData, username: e.target.value })
                    }
                    className={`${
                      suggestionClicked ? "block" : "hidden"
                    } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-form-primary sm:text-sm sm:leading-6`}
                  >
                    {usernameSuggestion.map((username, index) => {
                      return (
                        <option value={username?.word} key={index}>
                          {username?.word}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
            </div>

            {/* password starts here */}
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-form-secondary sm:text-sm sm:leading-6'
                />
              </div>
            </div>

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
