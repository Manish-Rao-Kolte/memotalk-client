import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInUserAsync, userSelector } from "@/redux/reducers/userReducer";
import Input from "@/components/Input";

const initialUserLoginData = {
  email: null,
  password: null,
  confirmPassword: null,
};

const LoginUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { homeLoading } = useSelector(userSelector);
  const [userLoginData, setUserLoginData] = useState(initialUserLoginData);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUserAsync(userLoginData))
      .then((result) => {
        if (result.error) return;
        navigate("/");
        setUserLoginData(initialUserLoginData);
      })
      .catch((err) => {
        setUserLoginData(initialUserLoginData);
        return;
      });
  };
  return (
    <div className='h-screen w-screen'>
      <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        {/* header starts here */}
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-24 w-auto'
            src='/logo_1.jpg'
            alt='Your Company'
          />
          <h2 className='mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Welcome! Sign in to your account.
          </h2>
        </div>

        {/* form starts here */}
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleLoginFormSubmit}>
            {/* email starts here */}
            <Input
              lable={"Email"}
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              value={userLoginData.email}
              onChange={(e) =>
                setUserLoginData({
                  ...userLoginData,
                  email: e.target.value,
                })
              }
              required
            />
            {/* <div>
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
                  value={userLoginData.email}
                  onChange={(e) =>
                    setUserLoginData({
                      ...userLoginData,
                      email: e.target.value,
                    })
                  }
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-form-primary sm:text-sm sm:leading-6'
                />
              </div>
            </div> */}

            {/* password starts here */}
            <Input
              lable={"Password"}
              id='password'
              name='password'
              type='password'
              autoComplete='password'
              value={userLoginData.password}
              onChange={(e) =>
                setUserLoginData({
                  ...userLoginData,
                  password: e.target.value,
                })
              }
              required
            />

            {/* confirm password starts here */}
            <Input
              lable={"Confirm Password"}
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              autoComplete='confirmPassword'
              value={userLoginData.confirmPassword}
              onChange={(e) =>
                setUserLoginData({
                  ...userLoginData,
                  confirmPassword: e.target.value,
                })
              }
              required
            />

            <div>
              <button
                type='submit'
                disabled={homeLoading}
                className='flex w-full justify-center rounded-md bg-form-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-form-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-form-secondary'
              >
                {homeLoading ? (
                  <p className='animate-pulse'>Signing in...</p>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Not a member?
            <Link
              to={!homeLoading && "/register"}
              className='font-semibold leading-6 text-form-primary hover:text-form-secondary'
            >
              {" "}
              Register instead!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
