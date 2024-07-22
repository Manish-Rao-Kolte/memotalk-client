import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { HiInboxArrowDown } from "react-icons/hi2";
import ContactCard from "@/components/ContactCard";
import Aside from "@/components/Aside";
import CenterSectionHeaderAndBody from "@/components/CenterSectionHeaderAndBody";
import {
  getAllUsersAsync,
  getChatFriendsAndUsersAsync,
  signOutUserAsync,
  userSelector,
} from "@/redux/reducers/userReducer";
import socket from "@/lib/socket";
import ChatSection from "../chat/ChatSection";
import { Progress } from "@/components/ui/progress";
import { markChatAsDeliveredAsync } from "@/redux/reducers/chatReducer";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { homeLoading, chatUsers, user } = useSelector(userSelector);
  const currentUser = user || JSON.parse(localStorage.getItem("user"));
  const avatarPath = currentUser?.avatar?.url || "/demo_avatar.avif";
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [showUnread, setShowUnread] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [incomingMessage, setIncomingMessage] = useState(null);

  socket.on("privateMessage", ({ senderID, message }) => {
    setIncomingMessage(message);
  });

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
      .finally(() => {
        socket.disconnect();
      });
  };

  //connect to the socket on component mount and get all available user to show in add friends section.
  useEffect(() => {
    socket.auth = { userID: currentUser?._id };
    socket.connect();
    socket.emit("userConnect", { userId: currentUser._id });
    dispatch(getChatFriendsAndUsersAsync({ userId: currentUser._id }));
    dispatch(getAllUsersAsync()).then(() => {
      return () => {
        socket.disconnect();
      };
    });
  }, []);

  //as soon as there is a message fetch all data to update users position
  useEffect(() => {
    if (incomingMessage) {
      dispatch(
        markChatAsDeliveredAsync({ messageId: incomingMessage?._id })
      ).then(() => {
        socket.emit("messageDelivered", {
          messageId: incomingMessage?._id,
          senderId: incomingMessage?.sender,
        });
        dispatch(getChatFriendsAndUsersAsync({ userId: currentUser?._id }));
      });
    }
  }, [incomingMessage?._id]);

  //as soon as there is change in data update currennt selected contact to show updated data
  useEffect(() => {
    const data = chatUsers?.filter(
      (user) => user?._id === selectedContact?._id
    );
    if (data?.length > 0) {
      setSelectedContact({ ...data[0] });
    }
  }, [chatUsers]);

  if (homeLoading) {
    return (
      <div className='h-screen w-screen flex flex-col items-center justify-center'>
        <div className='w-[40%] flex flex-col justify-center items-center gap-y-3'>
          <div className='flex justify-start items-center gap-x-2'>
            <div className='h-10 w-10 flex justify-center items-center overflow-hidden rounded-full'>
              <img
                src='/new_logo.png'
                alt='logo'
                className='h-full w-full object-fill animate-pulse'
              />
            </div>
            <span className='text-green-600 text-base font-semibold'>
              Loading data...
            </span>
          </div>
          <Progress value={50} className='w-[50%] h-1 bg-green-300' />
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen relative bg-gradient-to-b from-chat-bakground from-3% to-bg_primary to-60%'>
      <div
        className='w-full h-32 bg-header relative'
        onClick={() => setSelectedContact(null)}
      ></div>
      <div className='absolute w-full h-full top-0 xl:w-[90%] xl:h-[96%] min-w-[35rem] bg-bg_secondary z-10 xl:top-[2%] xl:left-[5%] flex shadow-sm shadow-slate-400'>
        <Aside user={currentUser} avatarPath={avatarPath} />
        {/* center section starts from here */}
        <div className='relative'>
          <div className='h-full w-[15rem] lg:w-[30vw] lg:min-w-[23rem] bg-white pt-4 flex flex-col'>
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
            <div className='max-h-full custom-scrollbar overflow-y-auto mt-3 relative'>
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
                  if (showUnread) {
                    if (chatUser.unreadMessagesCount > 0) {
                      return (
                        <ContactCard
                          src={chatUser.avatar.url || "/demo_avatar.avif"}
                          alt={chatUser.username}
                          unreadCount={chatUser.unreadMessagesCount}
                          name={chatUser.fullname}
                          key={chatUser._id}
                          friend={chatUser}
                          currentUser={currentUser}
                          selectedContact={selectedContact}
                          setSelectedContact={setSelectedContact}
                        />
                      );
                    }
                    return;
                  }
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
          <ChatSection
            user={currentUser}
            friend={selectedContact}
            incomingMessage={incomingMessage}
          />
        ) : (
          <div>
            <div className='h-full lg:[54vw] xl:w-[55vw] 2xl:w-[55.5vw] lg:max-w-[65vw] min-w-[29rem] lg:min-w-[37rem] xl:h-[100%] xl-w-[100%] flex justify-center items-center'>
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
