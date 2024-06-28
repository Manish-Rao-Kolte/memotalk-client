import React, { useEffect, useState } from "react";
import { HiInboxArrowDown } from "react-icons/hi2";

import ContactCard from "@/components/ContactCard";
import Aside from "@/components/Aside";
import CenterSectionHeaderAndBody from "@/components/CenterSectionHeaderAndBody";
import axios from "axios";
import { useSelector } from "react-redux";
import { authSelector } from "@/redux/reducers/authReducer";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { user } = useSelector(authSelector);

  const handleUserLogout = () => {
    try {
      axios
        .get(`${import.meta.env.VITE_SERVER_URL}/api/users/logout`, {
          withCredentials: true,
        })
        .then((response) => {
          navigate("/login");
        });
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/users/`, {
        withCredentials: true,
      })
      .then((response) => {
        setUsers([...response?.data?.data]);
      })
      .catch((err) => {
        navigate("/login");
      })
      .finally(() => {
        return;
      });
  }, []);

  return (
    <div className='w-full min-h-screen bg-bg_primary relative'>
      <div className='w-full h-32 bg-header relative'></div>
      <div className='absolute w-full h-full top-0 lg:w-[88%] lg:h-[96%] bg-bg_secondary z-10 lg:top-[2%] lg:left-[6%] flex'>
        <Aside user={user} />
        {/* center section starts from here */}
        <div>
          <div className='h-full w-[32rem] bg-white pt-4 flex flex-col'>
            <CenterSectionHeaderAndBody />
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
                {users?.map((user) => {
                  return (
                    <ContactCard
                      src={user.avatar}
                      alt={user.username}
                      message={"Heyyy buddy how are you doing?"}
                      name={user.fullname}
                      time={"11:35 PM"}
                      key={user._id}
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
        <div>
          <div className='h-full w-[69.6rem] flex justify-center items-center'>
            <div className='animate-pulse flex flex-col items-center gap-y-2'>
              <div className='w-44 h-44 rounded-full overflow-hidden'>
                <img
                  src={user?.avatar?.url}
                  alt='avatar'
                  className='object-cover'
                />
              </div>
              <p className='text-lg text-center leading-6'>
                {`Welcome ${user?.username || "user"}, Have a look around`}{" "}
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
        {/* right chat section ends here */}
      </div>
    </div>
  );
};

export default Home;
