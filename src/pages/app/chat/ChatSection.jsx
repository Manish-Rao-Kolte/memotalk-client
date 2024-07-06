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
  addMessageToChats,
  chatSelector,
  createChatMessageAsync,
  getChatsAsync,
  setInitialChats,
} from "@/redux/reducers/chatReducer";
import { getChatFriendsAndUsers } from "@/redux/reducers/userReducer";

const ChatSection = ({ user, friend, incomingMessage, setIncomingMessage }) => {
  const dispatch = useDispatch();
  const { chats, loading } = useSelector(chatSelector);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chatsToShow, setChatsToShow] = useState(chats);
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
          setChatsToShow((prev) => [...prev, result?.payload?.data]);
          dispatch(getChatFriendsAndUsers({ userId: user._id }));
        })
        .finally(() => {
          setMessage("");
          scrollToBottom("auto");
        });
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const scrollToBottom = (behavior) => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior });
    }
  };
  scrollToBottom("auto");

  useEffect(() => {
    dispatch(getChatFriendsAndUsers({ userId: user._id }));
    if (friend._id === incomingMessage?.sender) {
      dispatch(addMessageToChats(incomingMessage));
      setChatsToShow((prev) => [...prev, incomingMessage]);
      scrollToBottom("auto");
    }
  }, [incomingMessage?._id]);

  useEffect(() => {
    dispatch(getChatsAsync({ user: user._id, friend: friend._id })).then(
      (result) => {
        setChatsToShow(result?.payload?.data);
        dispatch(setInitialChats(result?.payload?.data));
        dispatch(getChatFriendsAndUsers({ userId: user._id }));
      }
    );
  }, [friend]);

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
    <div className='h-full lg:w-[54.7vw] min-w-[35rem] flex flex-col items-center overflow-hidden'>
      {/* header starts here */}
      <div className='w-full h-[7%] flex justify-between items-center px-4'>
        <div className='flex justify-start items-center gap-x-4'>
          <div className='box-border h-10 w-10 flex justify-center items-center rounded-full overflow-hidden hover:cursor-pointer'>
            <img
              src={friend?.avatar?.url || "/demo_avatar.avif"}
              alt={friend?.username}
              className='object-cover'
            />
          </div>
          <p className='text-base hover:cursor-pointer'>{friend?.username}</p>
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
      <div className='w-full h-[86%] bg-chat-bakground px-16 overflow-y-scroll'>
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
      <div className='w-full h-[7%] flex items-center px-4 gap-x-3'>
        <div className='w-[4%] h-[45%] relative'>
          <MdOutlineEmojiEmotions
            className='w-[100%] h-[100%] text-icon hover:cursor-pointer hover:text-gray-700'
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && (
            <Picker
              onEmojiClick={onEmojiClick}
              className='absolute top-0 left-[50%] -translate-x-[50%] -translate-y-[110%]'
            />
          )}
        </div>
        <CustomeTooltip
          active={false}
          hoverData={"Attach"}
          className='w-[4%] h-[50%]'
          to={"/api"}
          iconComponent={
            <FaPlus className=' w-6 h-6 text-icon hover:text-gray-700' />
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
            className='w-[4%] h-[45%] text-icon hover:cursor-pointer hover:text-gray-700 ml-1'
            onClick={handleSendMessage}
          />
        ) : (
          <FaMicrophone className='w-[4%] h-[45%] text-icon hover:cursor-pointer hover:text-gray-700 ml-1' />
        )}
      </div>
    </div>
  );
};

export default ChatSection;
