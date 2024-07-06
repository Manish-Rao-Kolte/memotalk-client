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
      } contactcard flex h-fit justify-between items-center hover:bg-card_hover hover:cursor-pointer pl-2 overflow-hidden lg:gap-x-2`}
      onClick={handleContactCardClickToViewMessages}
    >
      <div className='box-border h-12 w-12 lg:h-14 lg:w-14 flex justify-center items-center rounded-full overflow-hidden'>
        <img src={src} alt={alt} className='object-cover' />
      </div>
      {/* card data starts from here */}
      <div className='h-14 lg:h-20 w-[75%] lg:w-[85%] border-card_hover border-t border-b py-0.5 pr-1 lg:pr-3 flex flex-col justify-center'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-sm lg:text-base font-semibold xl:text-lg w-[70%] overflow-hidden'>
            {" "}
            {name}{" "}
          </p>
          <p className='text-xs lg:text-sm'> {formatTo12Hour(time)} </p>
        </div>
        <div className='text-xs lg:text-sm flex items-center justify-between overflow-hidden break-all p-3 pl-0'>
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
