import socket from "@/lib/socket";
import { getTimeAndDate } from "@/lib/utils";
import { markChatAsReadAsync } from "@/redux/reducers/chatReducer";
import { getChatFriendsAndUsersAsync } from "@/redux/reducers/userReducer";
import React, { useEffect, useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { RiCheckFill } from "react-icons/ri";
import { RiCheckDoubleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";

const ChatMessage = ({ message, user, friend }) => {
  const dispatch = useDispatch();
  const [showEmoji, setShowEmoji] = useState(false);
  const [read, setRead] = useState(message.read);
  const [delivered, setDelivered] = useState(message.delivered);
  const { time } = getTimeAndDate(message.createdAt);

  // Listen for `messageRead` events from the server
  useEffect(() => {
    const handleRead = ({ messageId, senderId }) => {
      if (messageId === message._id && senderId === user._id) {
        setRead(true); // Update local state to mark the message as read
      }
    };
    const handleDelivered = ({ messageId, senderId }) => {
      if (messageId === message._id && senderId === user._id) {
        console.log("working from delivery");
        setDelivered(true); // Update local state to mark the message as read
      }
    };

    socket.on("messageRead", handleRead);
    socket.on("messageDelivered", handleDelivered);

    return () => {
      socket.off("messageRead", handleRead);
      socket.off("messageDelivered", handleDelivered);
    };
  }, [message._id, user._id]);

  useEffect(() => {
    if (!message.read && friend._id === message.sender) {
      dispatch(markChatAsReadAsync({ messageId: message._id })).then(() => {
        socket.emit("messageRead", {
          messageId: message._id,
          senderId: message.sender,
        });
        dispatch(getChatFriendsAndUsersAsync({ userId: user._id }));
      });
    }
  }, [message, friend._id, user._id, dispatch]);

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
        } ${
          message?.file && message?.file !== ""
            ? "min-w-[38%] max-w-[38%]"
            : "max-w-[70%]"
        }`}
      >
        {/* show diferent cards on the basis of media content */}
        {message?.file && message?.file !== "" ? (
          // ****with media****
          <div
            className={`${
              message?.sender === user?._id
                ? "bg-self-message-background"
                : "bg-white"
            } flex flex-col rounded justify-center p-0.5 text-sm gap-y-2 pb-2 w-[80%]`}
          >
            <div className='max-w-full overflow-hidden'>
              <img
                src={message?.file}
                alt='file'
                className='max-w-full object-cover rounded hover:cursor-pointer'
              />
            </div>
            <div
              className={`relative flex min-h-3 justify-between px-2 gap-x-3 w-full break-all text-sm font-medium `}
            >
              {message?.message}
              <div
                className={`flex justify-end text-xs items-center gap-x-1 text-icon min-w-fit right-2 bottom-0 absolute`}
              >
                {time}
                {message?.sender === user?._id &&
                  (!delivered && !read ? (
                    <RiCheckFill
                      className={`text-base lg:text-lg 2xl:text-xl text-icon`}
                    />
                  ) : (
                    <RiCheckDoubleFill
                      className={`text-base lg:text-lg 2xl:text-xl ${
                        read ? "text-green-600" : "text-icon"
                      }`}
                    />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          // ****without media****
          <div
            className={`${
              message?.sender === user?._id
                ? "bg-self-message-background"
                : "bg-white"
            } flex items-center justify-center rounded`}
            style={{ minWidth: "calc(100% - 2rem)" }}
          >
            <div
              className={`relative break-all whitespace-pre-wrap px-2.5 py-1 w-full text-sm `}
            >
              <span className={`${message?.sender === user?._id && "mr-2"}`}>
                {message?.message}
              </span>
              <span style={{ visibility: "hidden" }}>6:15 PM</span>
              <span
                className={`absolute right-2.5 bottom-1 text-xs text-icon w-fit h-fit flex items-center gap-x-0.5 lg:gap-x-1`}
              >
                {time}
                {message?.sender === user?._id &&
                  (!delivered && !read ? (
                    <RiCheckFill
                      className={`text-base lg:text-lg 2xl:text-xl text-icon`}
                    />
                  ) : (
                    <RiCheckDoubleFill
                      className={`text-base lg:text-lg 2xl:text-xl ${
                        read ? "text-green-600" : "text-icon"
                      }`}
                    />
                  ))}
              </span>
            </div>
          </div>
        )}
        {/* show emoji and share option depending on media content in message */}
        <div
          className={`flex gap-x-1 items-center ${
            message?.sender === user?._id ? "flex-row-reverse" : ""
          }`}
          style={{
            minWidth: message?.sender === user?._id ? "2.6rem" : "2rem",
          }}
        >
          {message?.file && message?.file !== "" && (
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
