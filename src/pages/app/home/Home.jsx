import React, { useState } from "react";

import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { PiCirclesThreePlusDuotone } from "react-icons/pi";
import { RiWechatChannelsFill } from "react-icons/ri";
import { MdGroups2 } from "react-icons/md";
import { GrSettingsOption } from "react-icons/gr";
import { BiCommentAdd } from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { GrSearch } from "react-icons/gr";
import { FaArrowDown } from "react-icons/fa6";
import CustomeTooltip from "@/components/Tooltip";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [searchClicked, setSearchClicked] = useState(false);

  return (
    <div className='w-full h-screen bg-bg_primary relative'>
      <div className='w-full h-32 bg-header relative'></div>
      <div className='absolute w-[88%] h-[96%] bg-bg_secondary z-10 top-[2%] left-[6%] flex'>
        <aside className='h-full w-16 z-10 px-1 py-2 flex flex-col justify-between relative'>
          <div className='flex flex-col items-center gap-1'>
            <CustomeTooltip
              to={"/api"}
              hoverData={"Chats"}
              iconComponent={
                <MdOutlineMarkUnreadChatAlt className='w-[55%] h-[55%] text-icon' />
              }
              active={true}
              side={"right"}
            />
            <CustomeTooltip
              to={"/api"}
              hoverData={"Status"}
              iconComponent={
                <PiCirclesThreePlusDuotone className='w-[55%] h-[55%] text-icon' />
              }
              active={false}
              side={"right"}
            />
            <CustomeTooltip
              to={"/api"}
              hoverData={"Channels"}
              iconComponent={
                <RiWechatChannelsFill className='w-[55%] h-[55%] text-icon' />
              }
              active={false}
              side={"right"}
            />
            <CustomeTooltip
              to={"/api"}
              hoverData={"Communities"}
              iconComponent={
                <MdGroups2 className='w-[55%] h-[55%] text-icon' />
              }
              active={false}
              side={"right"}
            />
          </div>
          <div className='flex flex-col items-center gap-1'>
            <CustomeTooltip
              active={false}
              hoverData={"Settings"}
              to={"/api"}
              iconComponent={
                <GrSettingsOption className='w-[55%] h-[55%] text-icon' />
              }
              side={"right"}
            />
            <CustomeTooltip
              active={false}
              hoverData={"Profile"}
              to={"/api"}
              iconComponent={
                <img src='/avatar.jpg' className='w-full h-full rounded-full' />
              }
              side={"right"}
            />
          </div>
        </aside>
        <div className='h-full w-[32rem] bg-white px-2.5 py-4 flex flex-col'>
          <div className='w-full h-10 flex justify-between items-center px-1 leading-6'>
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
          <div className='flex flex-col h-36 w-full px-1 mt-4 leading-6'>
            <div className='w-full h-10 flex gap-x-3 bg-bg_secondary items-center rounded-sm'>
              {!searchClicked && (
                <label htmlFor='search' className='pl-5'>
                  <GrSearch
                    className={`text-xl text-icon ${
                      !searchClicked && "animate-rotate-left"
                    }`}
                    onClick={() => {
                      setSearchClicked(!searchClicked);
                    }}
                  />
                </label>
              )}
              {searchClicked && (
                <label htmlFor='search' className='pl-5'>
                  <FaArrowDown
                    className={`text-xl text-header ${
                      searchClicked && "animate-rotate-right"
                    }`}
                    onClick={() => {
                      setSearchClicked(!searchClicked);
                    }}
                  />
                </label>
              )}

              <Input
                id='search'
                className='bg-bg_secondary border-none h-10 text-lg'
                placeHolder='Search'
              />
            </div>
            <div className='w-full h-10'>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
