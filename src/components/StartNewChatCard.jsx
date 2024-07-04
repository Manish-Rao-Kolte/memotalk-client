import { appendToChatUser, userSelector } from "@/redux/reducers/userReducer";
import React from "react";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const StartNewChatCard = ({
  cardUser,
  setSelectedContact,
  setShowStartNewChat,
}) => {
  const dispatch = useDispatch();
  const { chatUsers } = useSelector(userSelector);
  const handleNewChatClick = () => {
    dispatch(appendToChatUser(cardUser));
    setSelectedContact(cardUser);
    setShowStartNewChat(false);
  };
  return (
    <div className='h-16 w-full flex justify-between items-center'>
      <div className='flex items-center gap-x-6 pl-1'>
        <div className='h-14 w-14 overflow-hidden rounded-full flex items-center justify-center'>
          <img
            src={cardUser?.avatar?.url || "/demo_avatar.avif"}
            alt='avatar'
            className='object-cover'
          />
        </div>
        <span>{cardUser?.fullname}</span>
      </div>
      <div className='flex w-8 h-8 items-center justify-center hover:cursor-pointer hover:bg-icon hover:bg-opacity-30 rounded-full'>
        <BiSolidMessageSquareAdd
          className='text-green-700 h-6 w-6'
          onClick={handleNewChatClick}
        />
      </div>
    </div>
  );
};

export default StartNewChatCard;
