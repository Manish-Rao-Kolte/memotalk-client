import React, { useState } from "react";
import { addFriendsAsync, userSelector } from "@/redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import AddFriendCard from "./AddFriendCard";

const AddFriends = ({ showAddFriends, setShowAddFreinds }) => {
  const dispatch = useDispatch();
  const { allUsers, loading } = useSelector(userSelector);
  const user = JSON.parse(localStorage.getItem("user"));
  const [clicked, setClicked] = useState(false);
  const [addToFriendList, setAddToFriendList] = useState([]);

  const nonFriendsAvaialableUsersList = allUsers.filter(
    (availableUser) =>
      !user.friends.some((friend) => friend._id === availableUser._id) &&
      availableUser._id !== user._id
  );

  const handleAddFriends = () => {
    dispatch(addFriendsAsync({ friends: addToFriendList, user })).then(() => {
      setAddToFriendList([]);
      setShowAddFreinds(false);
    });
  };

  return (
    <div
      className={`h-full w-0 overflow-hidden absolute top-0 left-0 z-20 backdrop-blur-md ${
        showAddFriends
          ? "animate-drawer-right"
          : clicked && "animate-drawer-right-close"
      }`}
    >
      {nonFriendsAvaialableUsersList.length === 0 ? (
        <div className='w-full h-full flex justify-center items-center'>
          <IoCloseOutline
            className='absolute top-4 right-5 h-7 w-7 hover:cursor-pointer hover:bg-icon hover:bg-opacity-30 rounded-full p-1'
            onClick={() => {
              setShowAddFreinds(false);
            }}
          />{" "}
          No user available...
        </div>
      ) : (
        <div className='w-full h-full flex flex-col px-5 py-12 relative items-center'>
          <IoCloseOutline
            className='absolute top-4 right-5 h-7 w-7 hover:cursor-pointer hover:bg-icon hover:bg-opacity-30 rounded-full p-1'
            onClick={() => {
              setShowAddFreinds(false);
              setClicked(true);
            }}
          />
          <div className='max-h-[70%] overflow-y-scroll w-full'>
            {nonFriendsAvaialableUsersList?.map((cardUser, index) => {
              if (cardUser._id === user._id) return;
              return (
                <AddFriendCard
                  key={index}
                  user={user}
                  cardUser={cardUser}
                  addToFriendList={addToFriendList}
                  setAddToFriendList={setAddToFriendList}
                />
              );
            })}
          </div>
          <Button
            type='submit'
            className='mt-4 w-[50%]'
            onClick={handleAddFriends}
          >
            {loading ? "Adding..." : "Add friends"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddFriends;
