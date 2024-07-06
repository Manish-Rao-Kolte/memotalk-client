import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

const ContactCard = ({
  src,
  alt,
  name,
  time,
  message,
  setSelectedContact,
  selectedContact,
  friend,
  unreadCount,
  currentUser,
}) => {
  const formatTo12Hour = (timestamp) => {
    const date = new Date(timestamp);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

    const strTime = hours + ":" + minutesFormatted + " " + ampm;
    return strTime;
  };

  const handleContactCardClickToViewMessages = () => {
    setSelectedContact(friend);
  };

  return (
    <div
      className={`${
        selectedContact?._id === friend?._id && "bg-card_hover"
      } contactcard flex h-fit justify-between items-center hover:bg-card_hover hover:cursor-pointer pl-2 overflow-hidden gap-x-2`}
      onClick={handleContactCardClickToViewMessages}
    >
      <div className='box-border h-14 w-14 flex justify-center items-center rounded-full overflow-hidden'>
        <img src={src} alt={alt} className='object-cover' />
      </div>
      {/* card data starts from here */}
      <div className='h-18 w-[85%] border-card_hover border-t border-b py-0.5 pr-2 flex flex-col justify-center'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-xl'> {name} </p>
          <p className='text-sm'> {formatTo12Hour(time)} </p>
        </div>
        <div className='text-sm flex items-center justify-between overflow-hidden break-all p-3 pl-0'>
          <p className='overflow-hidden h-5'>
            {" "}
            {friend.lastMessageContent || message}{" "}
          </p>
          <div className='flex gap-x-1'>
            {unreadCount >= 1 && (
              <div className='h-5 w-5 rounded-full flex justify-center items-center overflow-hidden bg-green_legend p-1'>
                <span className='text-white text-xs font-semibold text-center'>
                  {unreadCount}
                </span>
              </div>
            )}
            <SlArrowDown className='slArrowDown translate-x-9' />
          </div>
        </div>
      </div>
      {/* card data ends here */}
    </div>
  );
};

export default ContactCard;
