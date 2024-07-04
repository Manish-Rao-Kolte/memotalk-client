import React, { useRef, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GrSearch } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import CustomeTooltip from "@/components/Tooltip";
import AddFriends from "./AddFriends";
import StartNewChat from "./StartNewChat";

const CenterSectionHeaderAndBody = ({
  setSelectedContact,
  showAll,
  showGroups,
  showUnread,
  setShowAll,
  setShowGroups,
  setShowUnread,
}) => {
  const searchInputRef = useRef(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const [showAddFriends, setShowAddFreinds] = useState(false);
  const [showStartNewChat, setShowStartNewChat] = useState(false);
  return (
    <>
      {/* center header starts here */}
      <div className='w-full h-10 flex justify-between items-center px-2 leading-6'>
        <div className='text-2xl font-bold'>Chats</div>
        <div>
          <AddFriends
            setShowAddFreinds={setShowAddFreinds}
            showAddFriends={showAddFriends}
          />
          <CustomeTooltip
            active={false}
            hoverData={"Add friends"}
            to={"/"}
            iconComponent={
              <AiOutlineUsergroupAdd
                className='w-[55%] h-[55%] text-icon'
                onClick={() => {
                  setShowAddFreinds(true);
                }}
              />
            }
            side={"bottom"}
          />
          <StartNewChat
            showStartNewChat={showStartNewChat}
            setShowStartNewChat={setShowStartNewChat}
            setSelectedContact={setSelectedContact}
          />
          <CustomeTooltip
            active={false}
            hoverData={"New chat"}
            to={"/"}
            iconComponent={
              <BiCommentAdd
                className='w-[55%] h-[55%] text-icon'
                onClick={() => {
                  setShowStartNewChat(true);
                }}
              />
            }
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
      {/* center-header ends here */}
      {/* ... */}
      {/* ... */}
      {/* center-body starts here */}
      <div className='flex flex-col h-24 w-full px-2 mt-4 leading-6 gap-1 justify-center'>
        <div className='w-full h-10 flex gap-x-3 bg-bg_secondary items-center rounded-sm'>
          {!searchClicked && (
            <label
              htmlFor='search'
              className='pl-5'
              onClick={() => {
                setSearchClicked(!searchClicked);
                searchInputRef.current.focus();
              }}
            >
              <GrSearch
                className={`text-xl text-icon ${
                  !searchClicked && "animate-rotate-left"
                }`}
              />
            </label>
          )}
          {searchClicked && (
            <label
              htmlFor='search'
              className='pl-5'
              onClick={() => {
                setSearchClicked(!searchClicked);
              }}
            >
              <FaArrowDown
                className={`text-xl text-header ${
                  searchClicked && "animate-rotate-right"
                }`}
              />
            </label>
          )}

          <Input
            id='search'
            className='bg-bg_secondary border-none h-10 text-lg input-reset-ring'
            placeholder='Search'
            ref={searchInputRef}
          />
        </div>
        <div className='w-full h-10 flex justify-start items-center gap-x-2'>
          <span
            className={`${
              showAll
                ? "bg-badge_bg text-badge_text"
                : "bg-bg_secondary text-icon"
            } inline-flex items-center rounded-md text-base px-3 py-1 font-medium hover:cursor-pointer`}
            onClick={() => {
              setShowAll(true);
              setShowGroups(false);
              setShowUnread(false);
            }}
          >
            All
          </span>
          <span
            className={`${
              showUnread
                ? "bg-badge_bg text-badge_text"
                : "bg-bg_secondary text-icon"
            } inline-flex items-center rounded-md text-base px-3 py-1 font-medium hover:cursor-pointer`}
            onClick={() => {
              setShowAll(false);
              setShowGroups(false);
              setShowUnread(true);
            }}
          >
            Unread
          </span>
          <span
            className={`${
              showGroups
                ? "bg-badge_bg text-badge_text"
                : "bg-bg_secondary text-icon"
            } inline-flex items-center rounded-md text-base px-3 py-1 font-medium hover:cursor-pointer`}
            onClick={() => {
              setShowAll(false);
              setShowGroups(true);
              setShowUnread(false);
            }}
          >
            Groups
          </span>
        </div>
      </div>
      {/* center-body ends here */}
    </>
  );
};

export default CenterSectionHeaderAndBody;
