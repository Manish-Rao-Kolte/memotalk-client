import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink } from "react-router-dom";

const CustomeTooltip = ({ iconComponent, to, hoverData, active, side }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <NavLink
            to={to}
            className={`${
              active && "bg-active"
            } w-11 h-11 rounded-full flex justify-center items-center`}
          >
            {iconComponent}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p className='text-white'>{hoverData}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomeTooltip;
