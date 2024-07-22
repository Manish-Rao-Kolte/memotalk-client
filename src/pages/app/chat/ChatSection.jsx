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
import { IoSendSharp } from "react-icons/io5";
import socket from "@/lib/socket";
import { useDispatch, useSelector } from "react-redux";
import {
  chatSelector,
  createChatMessageAsync,
} from "@/redux/reducers/chatReducer";
import { getChatFriendsAndUsersAsync } from "@/redux/reducers/userReducer";
import { formatDate, formatDateForChats } from "@/lib/utils";
import { IoCloseOutline } from "react-icons/io5";

const initialMessage = {
  content: "",
  file: null,
};
const ChatSection = ({ user, friend }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(chatSelector);
  const [message, setMessage] = useState(initialMessage);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chatsToShow, setChatsToShow] = useState(friend?.messages || []);
  const bottomRef = useRef(null);

  //handle send message function
  const handleSendMessage = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      const formData = new FormData();
      formData.append("message", message.content);
      formData.append("file", message.file);
      formData.append("sender", user._id);
      formData.append("recipient", friend._id);
      setMessage(initialMessage);
      dispatch(createChatMessageAsync(formData))
        .then((result) => {
          socket.emit("sendMessage", {
            message: result?.payload?.data,
            recipientID: friend?._id,
          });
          dispatch(getChatFriendsAndUsersAsync({ userId: user._id }));
          setShowEmojiPicker(false);
        })
        .finally(() => {
          setMessage(initialMessage);
        });
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessage((prev) => {
      return {
        content: prev.content + emojiObject.emoji,
        file: prev.file,
      };
    });
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

  // Group messages by date
  let groupedChats = {};
  if (chatsToShow?.length > 0) {
    groupedChats = chatsToShow?.reduce((acc, chat) => {
      const date = formatDateForChats(chat.createdAt);
      if (!acc[date]) acc[date] = [];
      acc[date].push(chat);
      return acc;
    }, {});
  }

  // if (loading) {
  //   return (
  //     <div className='h-full w-[54.7vw] min-w-[37rem] flex flex-col items-center justify-center gap-y-3'>
  //       <div className='flex justify-start items-center gap-x-2'>
  //         <div className='h-10 w-10 flex justify-center items-center overflow-hidden rounded-full'>
  //           <img
  //             src='/new_logo.png'
  //             alt='logo'
  //             className='h-full w-full object-fill'
  //           />
  //         </div>
  //         <span className='text-green-600 text-base font-semibold'>
  //           Loading all the chats...
  //         </span>
  //       </div>
  //       <Progress value={50} className='w-[40%] h-1 bg-green-300' />
  //     </div>
  //   );
  // }

  return (
    <div className='h-full w-[65.65vw] lg:w-[58.65vw] min-w-[29rem] lg:min-w-[37rem] flex flex-col items-center overflow-hidden relative'>
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
            to={"/"}
            iconComponent={<GrSearch className='w-[55%] h-[50%] text-icon' />}
            side={"bottom"}
          />
          <CustomeTooltip
            active={false}
            hoverData={"Menu"}
            to={"/"}
            iconComponent={
              <CiMenuKebab className='w-[55%] h-[50%] text-icon' />
            }
            side={"bottom"}
          />
        </div>
      </div>

      {/* body starts here */}
      <div className='w-full h-[86%] bg-chat-bakground px-4 lg:px-8 xl:px-12 xxl:px-14 overflow-y-scroll relative'>
        {Object.entries(groupedChats).map(([date, chats]) => (
          <div key={date} className='date-section'>
            <div className='sticky w-fit rounded mx-auto top-2 px-6 py-1 bg-slate-300 bg-opacity-20 z-10 text-center text-sm backdrop-blur-md shadow shadow-slate-400'>
              {date}
            </div>
            {chats.map((chat) => (
              <ChatMessage
                key={chat._id}
                message={chat}
                user={user}
                friend={friend}
              />
            ))}
          </div>
        ))}
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
        <div
          className={`w-7 h-7 text-icon hover:text-gray-700 overflow-hidden flex justify-center items-center relative`}
        >
          <input
            type='file'
            name='attachment'
            id='attachment'
            aria-label='Upload attachment'
            className={`inset-0 opacity-0 hover:cursor-pointer w-6 h-6 `}
            title='Attach'
            accept='image/*'
            onChange={(e) => {
              setMessage({ ...message, file: e.target.files[0] });
            }}
          />
          <FaPlus
            className={`w-6 h-6 text-icon hover:text-gray-700 absolute -z-10 hover:cursor-pointer font-thin`}
          />
        </div>
        <Input
          type={"text"}
          placeholder='Type a message'
          value={message.content}
          className='w-[86%] h-[65%] input-reset-ring border-none text-base rounded px-5'
          onChange={(e) => {
            setMessage({ ...message, content: e.target.value });
          }}
          onKeyDown={handleSendMessage}
        />
        {message?.content?.length > 0 ? (
          <IoSendSharp
            disabled={loading}
            className='w-7 h-7 text-icon hover:cursor-pointer hover:text-gray-700 ml-1'
            onClick={handleSendMessage}
          />
        ) : (
          <FaMicrophone className='w-7 h-7 text-icon hover:cursor-pointer hover:text-gray-700 ml-1' />
        )}
      </div>

      {/* attachemnt preview aection starts from here */}
      <div
        className={`w-full bg-attachment-preview-bg px-4 lg:px-8 xl:px-12 xxl:px-14 z-20 bottom-0 ${
          message.file
            ? "animate-attachemnt-preview-up absolute"
            : "animate-attachemnt-preview-down hidden"
        }`}
      >
        <div className='flex w-full h-16 items-center justify-start'>
          <IoCloseOutline
            className='w-7 h-7 text-icon font-semibold hover:cursor-pointer'
            onClick={() => {
              setMessage(initialMessage);
              setShowEmojiPicker(false);
            }}
          />
        </div>
        <div className='h-[60%] w-[50%] overflow-hidden mx-auto mt-8'>
          <img
            id='preview_attachemnt'
            className='object-cover'
            src={message.file && URL.createObjectURL(message.file)}
            alt='data'
          />
        </div>
        <div className='relative w-[60%] h-[8%] mx-auto mt-4 flex items-center'>
          <Input
            type={"text"}
            className='mt-5 w-[90%] h-[70%] text-base pl-6 input-reset-ring border-none inline'
            placeholder={"Add a caption"}
            value={message.content}
            onChange={(e) => {
              setMessage({ ...message, content: e.target.value });
            }}
            onKeyDown={handleSendMessage}
            disabled={loading}
          />
          <MdOutlineEmojiEmotions
            className='text-icon absolute top-[45%] right-[12.5%] w-6 h-6  hover:cursor-pointer'
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          <div
            className={`picker-wrapper ${showEmojiPicker ? "open" : ""}`}
            style={{ left: "auto", right: "50px" }}
          >
            <Picker width={300} height={400} onEmojiClick={onEmojiClick} />
          </div>
        </div>
        <div className='flex w-full h-16 items-center justify-end mt-8'>
          <div className='w-16 h-16 rounded-full bg-header flex justify-center items-center hover:cursor-pointer'>
            <IoSendSharp
              className={`text-white h-7 w-7 ${loading && "animate-pulse"}`}
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
