import React, { useState } from "react";
import { IoPersonAdd, IoPersonRemove } from "react-icons/io5";

const AddFriendCard = ({ cardUser, addToFriendList, setAddToFriendList }) => {
  const [addedInList, setAddedInList] = useState(false);

  const handleAddUserToFriendList = () => {
    setAddToFriendList([...addToFriendList, cardUser._id]);
  };

  const handleRemoveUserFromFriendList = () => {
    const newList = [...addToFriendList];
    const filteredList = newList.filter((friend) => friend !== cardUser._id);
    setAddToFriendList([...filteredList]);
  };

  return (
    <div className='h-16 w-full flex justify-between items-center'>
      <div className='flex items-center gap-x-6 pl-1'>
        <div className='h-14 w-14 overflow-hidden rounded-full flex items-center justify-center'>
          <img
            src={cardUser?.avatar?.url || "/demo_avatar.avif"}
            alt='avatar'
            className='object-cover'
          />
        </div>
        <span>{cardUser?.fullname}</span>
      </div>
      <div className='flex w-8 h-8 items-center justify-center hover:cursor-pointer hover:bg-icon hover:bg-opacity-30 rounded-full'>
        {addedInList ? (
          <IoPersonRemove
            className='text-red-800 h-6 w-6'
            onClick={() => {
              setAddedInList(false);
              handleRemoveUserFromFriendList();
            }}
          />
        ) : (
          <IoPersonAdd
            className='text-green-900 h-6 w-6'
            onClick={() => {
              setAddedInList(true);
              handleAddUserToFriendList();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AddFriendCard;
