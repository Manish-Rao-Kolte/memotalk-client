import React, { useRef, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { GrSearch } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import CustomeTooltip from "@/components/Tooltip";

const CenterSectionHeaderAndBody = () => {
  const searchInputRef = useRef(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showUnread, setShowUnread] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  return (
    <>
      {/* center header starts here */}
      <div className='w-full h-10 flex justify-between items-center px-2 leading-6'>
        <div className='text-2xl font-bold'>Chats</div>
        <div>
          <CustomeTooltip
            active={false}
            hoverData={"New chat"}
            to={"/api"}
            iconComponent={
              <BiCommentAdd className='w-[55%] h-[55%] text-icon' />
            }
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
      {/* center-heade ends here */}
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
