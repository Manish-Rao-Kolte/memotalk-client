import socket from "@/lib/socket";
import { markChatAsReadAsync } from "@/redux/reducers/chatReducer";
import { getChatFriendsAndUsers } from "@/redux/reducers/userReducer";
import React, { useEffect, useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { RiCheckDoubleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";

const ChatMessage = ({ message, image, user, friend }) => {
  const dispatch = useDispatch();
  const [showEmoji, setShowEmoji] = useState(false);
  const [read, setRead] = useState(message.read);

  const getTimeAndDate = (timestamp) => {
    const date = new Date(timestamp);

    // Options for formatting the date
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    };
    // Options for formatting time
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    return {
      time: date
        .toLocaleTimeString("en-US", timeOptions)
        .replace("am", "AM")
        .replace("pm", "PM"),
      date: date.toLocaleDateString("en-US", dateOptions),
    };
  };

  const { time, date } = getTimeAndDate(message.createdAt);

  useEffect(() => {
    if (!message.read) {
      if (friend._id === message.sender) {
        dispatch(markChatAsReadAsync({ messageId: message._id })).then(() => {
          socket.emit("messageRead", message._id);
        });
        dispatch(getChatFriendsAndUsers({ userId: user._id }));
      }
    }
    // Listen for `messageRead` events from the server
    socket.on("messageRead", (readMessageId) => {
      if (readMessageId === message._id) {
        setRead(true); // Update local state to mark the message as read
      }
    });
    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("messageRead");
    };
  }, [message._id]);

  return (
    <div
      className={`w-full my-6 flex items-center justify-start ${
        message?.sender === user?._id ? "flex-row-reverse chatCardSection" : ""
      }`}
      onMouseEnter={() => setShowEmoji(true)}
      onMouseLeave={() => setShowEmoji(false)}
    >
      <div
        className={`flex gap-x-2 items-center ${
          message?.sender === user?._id ? "flex-row-reverse" : ""
        } ${image ? "max-w-[38%]" : "max-w-[70%]"}`}
      >
        {image ? (
          <div
            className={`${
              message?.sender === user?._id
                ? "bg-self-message-background"
                : "bg-white"
            } flex flex-col rounded justify-center p-0.5 text-sm gap-y-2 pb-2 w-[80%]`}
          >
            <div className='max-w-full overflow-hidden'>
              <img
                src='/avatar.jpg'
                alt='avatar'
                className='max-w-full object-cover rounded hover:cursor-pointer'
              />
            </div>
            <div
              className={`relative flex justify-between px-2 gap-x-3 w-full break-all text-sm font-medium`}
            >
              {message?.message}
              <div
                className={`flex flex-col justify-end text-xs text-icon min-w-fit right-2 bottom-0 absolute`}
              >
                {time}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${
              message?.sender === user?._id
                ? "bg-self-message-background"
                : "bg-white"
            } flex items-center justify-center rounded text-sm`}
            style={{ minWidth: "calc(100% - 2rem)" }}
          >
            <div
              className={`relative break-all whitespace-pre-wrap px-2.5 py-1 w-full`}
            >
              <span>{message?.message}</span>
              <span style={{ visibility: "hidden" }}>6:15 PM</span>
              <span
                className={`absolute right-2.5 bottom-1 text-xs text-icon w-fit h-fit flex items-center gap-x-0.5`}
              >
                {time}
                {message?.sender === user?._id && (
                  <RiCheckDoubleFill
                    className={`text-base ${
                      read ? "text-green-600" : "text-icon"
                    }`}
                  />
                )}
              </span>
            </div>
          </div>
        )}
        <div
          className={`flex gap-x-1 items-center ${
            message?.sender === user?._id ? "flex-row-reverse" : ""
          }`}
          style={{
            minWidth: message?.sender === user?._id ? "2.6rem" : "2rem",
          }}
        >
          {image && (
            <div className='h-6 w-6 bg-icon rounded-full flex justify-center items-center bg-opacity-35 hover:cursor-pointer'>
              <RiShareForwardFill className='text-white h-5 w-5' />
            </div>
          )}
          {showEmoji && (
            <div className='mdEmojiMessage'>
              <div className='h-6 w-6 bg-icon rounded-full flex justify-center items-center bg-opacity-35 hover:cursor-pointer'>
                <MdEmojiEmotions className='h-5 w-5 text-white' />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
