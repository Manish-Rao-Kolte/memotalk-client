import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import CustomeTooltip from "@/components/Tooltip";
import Picker from "emoji-picker-react";
import { CiMenuKebab } from "react-icons/ci";
import { GrSearch } from "react-icons/gr";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import socket from "@/lib/socket";
import { useDispatch, useSelector } from "react-redux";
import {
  chatSelector,
  createChatMessageAsync,
} from "@/redux/reducers/chatReducer";
import { getChatFriendsAndUsersAsync } from "@/redux/reducers/userReducer";
import { formatDate } from "@/lib/utils";

const ChatSection = ({ user, friend }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(chatSelector);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chatsToShow, setChatsToShow] = useState(friend?.messages || []);
  const bottomRef = useRef(null);

  const handleSendMessage = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      dispatch(
        createChatMessageAsync({
          message,
          sender: user._id,
          recipient: friend._id,
        })
      )
        .then((result) => {
          socket.emit("sendMessage", {
            message: result?.payload?.data,
            recipientID: friend?._id,
          });
          dispatch(getChatFriendsAndUsersAsync({ userId: user._id }));
          setShowEmojiPicker(false);
        })
        .finally(() => {
          setMessage("");
        });
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const scrollToBottom = (behavior) => {
    bottomRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    setChatsToShow(friend?.messages);
  }, [friend?.messages]);

  useEffect(() => {
    scrollToBottom("auto");
  }, [chatsToShow]);

  if (loading) {
    return (
      <div className='h-full w-[54.7vw] min-w-[37rem] flex flex-col items-center justify-center gap-y-3'>
        <div className='flex justify-start items-center gap-x-2'>
          <div className='h-10 w-10 flex justify-center items-center overflow-hidden rounded-full'>
            <img
              src='/new_logo.png'
              alt='logo'
              className='h-full w-full object-fill'
            />
          </div>
          <span className='text-green-600 text-base font-semibold'>
            Loading all the chats...
          </span>
        </div>
        <Progress value={50} className='w-[40%] h-1 bg-green-300' />
      </div>
    );
  }

  return (
    <div className='h-full w-[65.65vw] lg:w-[58.65vw] min-w-[29rem] lg:min-w-[37rem] flex flex-col items-center overflow-hidden'>
      {/* header starts here */}
      <div className='w-full h-[7%] flex justify-between items-center px-4'>
        <div className='flex justify-start items-center gap-x-4'>
          <div className='box-border h-12 w-12 flex justify-center items-center rounded-full overflow-hidden hover:cursor-pointer'>
            <img
              src={friend?.avatar?.url || "/demo_avatar.avif"}
              alt={friend?.username}
              className='object-cover'
            />
          </div>
          <div className='flex flex-col justify-center'>
            <p className='text-base hover:cursor-pointer'>{friend?.username}</p>
            <span className='mt-0.5 lg:mt-1 text-xs'>
              {friend?.active ? (
                <div className='flex gap-x-0.5 lg:gap-x-1 items-center'>
                  <div className='h-2 w-2 rounded-full bg-green-400' />
                  <span className='text-xs'>Online</span>
                </div>
              ) : (
                friend?.lastSeen && `Last seen ${formatDate(friend?.lastSeen)}`
              )}
            </span>
          </div>
        </div>
        <div className='flex justify-end gap-x-3'>
          <CustomeTooltip
            active={false}
            hoverData={"Search"}
            to={"/api"}
            iconComponent={<GrSearch className='w-[55%] h-[50%] text-icon' />}
            side={"bottom"}
          />
          <CustomeTooltip
            active={false}
            hoverData={"Menu"}
            to={"/api"}
            iconComponent={
              <CiMenuKebab className='w-[55%] h-[50%] text-icon' />
            }
            side={"bottom"}
          />
        </div>
      </div>

      {/* body starts here */}
      <div className='w-full h-[86%] bg-chat-bakground px-4 lg:px-8 xl:px-12 xxl:px-14 overflow-y-scroll relative'>
        {chatsToShow?.map((chat, index) => {
          return (
            <ChatMessage
              key={index}
              message={chat}
              user={user}
              friend={friend}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* footer starts here */}
      <div className='w-full h-[7%] flex items-center px-4 gap-x-3 overflow-y-visible'>
        <div className='w-7 h-7 relative'>
          <MdOutlineEmojiEmotions
            className='w-7 h-7 text-icon hover:cursor-pointer hover:text-gray-700'
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          <div className={`picker-wrapper ${showEmojiPicker ? "open" : ""}`}>
            <Picker width={300} height={400} onEmojiClick={onEmojiClick} />
          </div>
        </div>
        <CustomeTooltip
          active={false}
          hoverData={"Attach"}
          className='w-7 h-7'
          to={"/api"}
          iconComponent={
            <FaPlus className=' w-7 h-7 text-icon hover:text-gray-700' />
          }
          side={"bottom"}
        />
        <Input
          placeholder='Type a message'
          value={message}
          className='w-[86%] h-[65%] input-reset-ring border-none text-base rounded px-5'
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleSendMessage}
        />
        {message?.length > 0 ? (
          <PiPaperPlaneRightFill
            disabled={loading}
            className='w-7 h-7 text-icon hover:cursor-pointer hover:text-gray-700 ml-1'
            onClick={handleSendMessage}
          />
        ) : (
          <FaMicrophone className='w-7 h-7 text-icon hover:cursor-pointer hover:text-gray-700 ml-1' />
        )}
      </div>
    </div>
  );
};

export default ChatSection;
