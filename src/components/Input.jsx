import React from "react";

const Input = ({ lable, id, value, ...props }) => {
  // , id, name, type, value, onChange

  return (
    <div className='relative'>
      <label
        htmlFor={id}
        className={`form-lable absolute left-[5%] z-10 top-[25%] backdrop-blur-sm bg-white bg-opacity-70 text-sm font-medium leading-6 px-1.5 py-0 rounded-md text-icon ${
          value
            ? "animate-transition-lable-up"
            : value === "" && "animate-transition-lable-down"
        }`}
      >
        {lable}*
      </label>
      <div className='mt-2'>
        <input
          value={value ? value : ""}
          id={id}
          {...props}
          className='form-input flex items-center w-full py-3 px-4 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-form-primary sm:text-sm sm:leading-6 bg-white'
        />
      </div>
    </div>
  );
};

export default Input;
