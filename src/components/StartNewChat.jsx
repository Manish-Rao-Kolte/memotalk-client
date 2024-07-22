import { userSelector } from "@/redux/reducers/userReducer";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import StartNewChatCard from "./StartNewChatCard";

const StartNewChat = ({
  showStartNewChat,
  setShowStartNewChat,
  setSelectedContact,
}) => {
  const { chatUsers } = useSelector(userSelector);
  const user = JSON.parse(localStorage.getItem("user"));
  const [clicked, setClicked] = useState(false);
  const userFriends =
    user?.friends?.filter(
      (availableUser) =>
        !chatUsers.some((friend) => friend?._id === availableUser?._id)
    ) || [];

  return (
    <div
      className={`h-full w-0 overflow-hidden absolute top-0 left-0 z-20 backdrop-blur-md ${
        showStartNewChat
          ? "animate-drawer-right"
          : clicked && "animate-drawer-right-close"
      }`}
    >
      <div></div>
      {userFriends.length === 0 ? (
        <div className='w-full h-full flex justify-center items-center'>
          <IoCloseOutline
            className='absolute top-4 right-5 h-7 w-7 hover:cursor-pointer hover:bg-icon hover:bg-opacity-30 rounded-full p-1'
            onClick={() => {
              setShowStartNewChat(false);
              setClicked(true);
            }}
          />{" "}
          No friends available...
        </div>
      ) : (
        <div className='w-full h-full flex flex-col px-5 py-12 relative items-center'>
          <IoCloseOutline
            className='absolute top-4 right-5 h-7 w-7 hover:cursor-pointer hover:bg-icon hover:bg-opacity-30 rounded-full p-1'
            onClick={() => {
              setShowStartNewChat(false);
            }}
          />
          <div className='max-h-[70%] overflow-y-scroll w-full pt-6'>
            {userFriends?.map((cardUser, index) => {
              if (cardUser._id === user._id) return;
              return (
                <StartNewChatCard
                  key={index}
                  cardUser={cardUser}
                  setSelectedContact={setSelectedContact}
                  setShowStartNewChat={setShowStartNewChat}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StartNewChat;
