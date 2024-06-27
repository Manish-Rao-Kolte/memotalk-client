import React from "react";
import CustomeTooltip from "./Tooltip";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { PiCirclesThreePlusDuotone } from "react-icons/pi";
import { RiWechatChannelsFill } from "react-icons/ri";
import { MdGroups2 } from "react-icons/md";
import { GrSettingsOption } from "react-icons/gr";

const Aside = () => {
  return (
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
          iconComponent={<MdGroups2 className='w-[55%] h-[55%] text-icon' />}
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
  );
};

export default Aside;
