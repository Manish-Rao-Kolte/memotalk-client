import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { HiInboxArrowDown } from "react-icons/hi2";
import ContactCard from "@/components/ContactCard";
import Aside from "@/components/Aside";
import CenterSectionHeaderAndBody from "@/components/CenterSectionHeaderAndBody";
import {
  getAllUsersAsync,
  getChatFriendsAndUsers,
  signOutUserAsync,
  userSelector,
} from "@/redux/reducers/userReducer";
import socket from "@/lib/socket";
import ChatSection from "../chat/ChatSection";
import { getChatsAsync } from "@/redux/reducers/chatReducer";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, chatUsers, user } = useSelector(userSelector);
  const currentUser = user || JSON.parse(localStorage.getItem("user"));
  const avatarPath = currentUser?.avatar?.url || "/demo_avatar.avif";
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [showUnread, setShowUnread] = useState(false);
  const [showGroups, setShowGroups] = useState(false);

  //handle when user clickes on logout.
  const handleUserLogout = () => {
    dispatch(signOutUserAsync())
      .then((result) => {
        if (result.error) return;
        navigate("/login");
      })
      .catch((err) => {
        navigate("/login");
        return;
      })
      .finally(() => {});
  };
  //on every private message fetch all friends and non friend users who have either received a message from current user or have sent message to current user to update the list according to latest conversation.
  socket.on("privateMessage", ({ senderID, message }) => {
    dispatch(getChatFriendsAndUsers({ userId: currentUser._id })).then(() => {
      dispatch(getChatsAsync({ user: user._id, friend: selectedContact._id }));
    });
  });

  //connect to the socket on component mount and get all available user to show in add friends section.
  useEffect(() => {
    socket.auth = { userID: currentUser?._id };
    socket.connect();
    dispatch(getChatFriendsAndUsers({ userId: currentUser._id }));
    dispatch(getAllUsersAsync()).then(() => {
      return () => {
        socket.disconnect();
      };
    });
  }, []);

  useEffect(() => {
    dispatch(
      markChatsAsReadAsync({ userId: user._id, senderId: selectedContact._id })
    ).then(() => {
      dispatch(getChatFriendsAndUsers({ userId: currentUser._id }));
    });
  }, [selectedContact]);

  //fetch all friends and non friend users who have either received a message from current user or have sent message to current user on component mount.

  return (
    <div className='w-full min-h-screen bg-bg_primary relative'>
      <div
        className='w-full h-32 bg-header relative'
        onClick={() => setSelectedContact(null)}
      ></div>
      <div className='absolute w-full h-full top-0 lg:w-[88%] lg:h-[96%] bg-bg_secondary z-10 lg:top-[2%] lg:left-[6%] flex'>
        <Aside user={currentUser} avatarPath={avatarPath} />
        {/* center section starts from here */}
        <div className='relative'>
          <div className='h-full w-[30vw] min-w-[20rem] bg-white pt-4 flex flex-col'>
            <CenterSectionHeaderAndBody
              setSelectedContact={setSelectedContact}
              showAll={showAll}
              showUnread={showUnread}
              showGroups={showGroups}
              setShowAll={setShowAll}
              setShowUnread={setShowUnread}
              setShowGroups={setShowGroups}
            />
            {/* center footer starts from here */}
            <div className='max-h-full custom-scrollbar overflow-y-auto mt-3'>
              <div className='flex flex-col '>
                <div className='flex h-14 items-center pl-2 hover:cursor-pointer'>
                  <div className='box-border h-12 w-14 flex justify-center items-center'>
                    <HiInboxArrowDown className='text-badge_text h-6 w-6' />
                  </div>
                  <div className='w-[85%] pl-5 flex items-center text-lg'>
                    Archived
                  </div>
                </div>
                {/* show all the friends and non friend users who has a coversation with current user */}
                {chatUsers?.map((chatUser) => {
                  if (chatUser._id === currentUser._id) return;
                  return (
                    <ContactCard
                      src={chatUser.avatar.url || "/demo_avatar.avif"}
                      alt={chatUser.username}
                      unreadCount={chatUser.unreadMessagesCount}
                      message={"Heyyy buddy how are you doing?"}
                      name={chatUser.fullname}
                      time={chatUser.lastMessageTime || ""}
                      key={chatUser._id}
                      friend={chatUser}
                      currentUser={currentUser}
                      selectedContact={selectedContact}
                      setSelectedContact={setSelectedContact}
                    />
                  );
                })}
              </div>
            </div>
            {/* center footer ends here */}
          </div>
        </div>
        {/* center section ends here */}
        {/* right chat section starts from here */}
        {selectedContact !== null ? (
          <ChatSection user={currentUser} friend={selectedContact} />
        ) : (
          <div>
            <div className='h-full w-[54.7vw] min-w-[37rem] flex justify-center items-center'>
              <div className='animate-pulse flex flex-col items-center gap-y-2'>
                <div className='w-44 h-44 rounded-full overflow-hidden'>
                  <img src={avatarPath} alt='avatar' className='object-cover' />
                </div>
                <p className='text-lg text-center leading-6'>
                  {`Welcome ${
                    currentUser?.username || "user"
                  }, Have a look around`}{" "}
                  <br />
                  and chit chat with friends.
                </p>
                <button
                  className='flex items-center px-5 py-2 border font-bold text-badge_text bg-badge_bg rounded-sm'
                  onClick={handleUserLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* right chat section ends here */}
      </div>
    </div>
  );
};

export default Home;
