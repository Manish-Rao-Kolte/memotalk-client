import socket from "@/lib/socket";
import { formatDate } from "@/lib/utils";
import { getChatFriendsAndUsersAsync } from "@/redux/reducers/userReducer";
import React, { useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { useDispatch } from "react-redux";

const ContactCard = ({
  src,
  alt,
  name,
  setSelectedContact,
  selectedContact,
  friend,
  unreadCount,
  currentUser,
}) => {
  const dispatch = useDispatch();

  const handleContactCardClickToViewMessages = () => {
    dispatch(getChatFriendsAndUsersAsync({ userId: currentUser._id })).then(
      () => {
        setSelectedContact(friend);
      }
    );
  };

  useEffect(() => {
    socket.on("userConnected", (userID) => {
      dispatch(getChatFriendsAndUsersAsync({ userId: currentUser._id }));
    });
    socket.on("userDisconnected", (userID) => {
      dispatch(getChatFriendsAndUsersAsync({ userId: currentUser._id }));
    });

    return () => {
      socket.off("userConnected");
      socket.off("userDisconnected");
    };
  }, []);

  return (
    <div
      className={`${
        selectedContact?._id === friend?._id && "bg-card_hover"
      } contactcard flex h-fit justify-between items-center hover:bg-card_hover hover:cursor-pointer pl-2 overflow-hidden lg:gap-x-2`}
      onClick={handleContactCardClickToViewMessages}
    >
      <div className='box-border h-12 w-12 lg:h-14 lg:w-14 flex justify-center items-center rounded-full relative'>
        <img
          src={src}
          alt={alt}
          className='object-cover rounded-full h-full w-full'
        />
        {friend?.active && (
          <div className='h-3 w-3 rounded-full bg-green-400 absolute right-0 bottom-0' />
        )}
      </div>
      {/* card data starts from here */}
      <div className='h-14 lg:h-20 w-[75%] lg:w-[85%] border-card_hover border-t border-b py-0.5 pr-1 lg:pr-3 flex flex-col justify-center'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-sm lg:text-base font-semibold xl:text-lg w-[70%] overflow-hidden'>
            {" "}
            {name}{" "}
          </p>
          <p className='text-xs lg:text-sm'>
            {" "}
            {friend?.messages[friend?.messages?.length - 1].createdAt &&
              formatDate(
                friend?.messages[friend?.messages?.length - 1].createdAt
              ).split(",")[0]}{" "}
          </p>
        </div>
        <div className='text-xs lg:text-sm flex items-center justify-between overflow-hidden break-all p-3 pl-0'>
          <p className='overflow-hidden h-5'>
            {" "}
            {friend?.messages[friend?.messages?.length - 1].message || ""}{" "}
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
