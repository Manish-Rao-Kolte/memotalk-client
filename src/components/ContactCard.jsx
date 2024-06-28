import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

const ContactCard = ({ src, alt, name, time, message }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      className={`${
        isClicked && "bg-card_hover"
      } contactcard flex h-fit justify-between items-center hover:bg-card_hover hover:cursor-pointer pl-2 overflow-hidden`}
      onClick={() => {
        setIsClicked(!isClicked);
      }}
    >
      <div className='box-border h-14 w-14 flex justify-center items-center rounded-full overflow-hidden'>
        <img src={src} alt={alt} className='object-cover' />
      </div>
      {/* card data starts from here */}
      <div className='h-20 w-[85%] border-card_hover border-t border-b py-0.5 pr-2 flex flex-col justify-center'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-xl'> {name} </p>
          <p className='text-sm'> {time} </p>
        </div>
        <div className='text-sm flex items-center justify-between'>
          <p> {message} </p>
          <div className='p-3'>
            <SlArrowDown className='slArrowDown translate-x-9' />
          </div>
        </div>
      </div>
      {/* card data ends here */}
    </div>
  );
};

export default ContactCard;
