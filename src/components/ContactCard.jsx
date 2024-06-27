import React, { useState } from "react";

const ContactCard = ({ src, alt, name, time, message }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <contactcard
      className={`${
        isClicked && "bg-card_hover"
      } flex h-fit justify-between items-center hover:bg-card_hover pl-2`}
      onClick={() => {
        setIsClicked(!isClicked);
      }}
    >
      <avatar className='box-border h-14 w-14 rounded-full overflow-hidden'>
        <img src={src} alt={alt} className='object-cover' />
      </avatar>
      <carddata className='h-20 w-[85%] border-card_hover border-t border-b py-0.5 pr-2 flex flex-col justify-center'>
        <div className='w-full flex justify-between items-center'>
          <name className='text-xl'> {name} </name>
          <time className='text-sm'> {time} </time>
        </div>
        <div className='text-sm flex items-center'>
          <message> {message} </message>
          <arrowandmessagecount></arrowandmessagecount>
        </div>
      </carddata>
    </contactcard>
  );
};

export default ContactCard;
