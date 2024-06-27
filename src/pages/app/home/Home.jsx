import React, { useState } from "react";

import ContactCard from "@/components/ContactCard";
import Aside from "@/components/Aside";
import CenterSectionHeaderAndBody from "@/components/CenterSectionHeaderAndBody";

const Home = () => {
  return (
    <div className='w-full min-h-screen bg-bg_primary relative'>
      <div className='w-full h-32 bg-header relative'></div>
      <div className='absolute w-full h-full top-0 lg:w-[88%] lg:h-[96%] bg-bg_secondary z-10 lg:top-[2%] lg:left-[6%] flex'>
        <Aside />
        <centercontacts>
          <div className='h-full w-[32rem] bg-white py-4 flex flex-col'>
            <CenterSectionHeaderAndBody />
            <centerfooter>
              <div className='flex flex-col'>
                <ContactCard
                  src={"/avatar.jpg"}
                  alt={"avatar"}
                  name={"Manish"}
                  time={"11:35 PM"}
                  message={"Heyyy buddy how are you doing?"}
                />
                <ContactCard
                  src={"/avatar.jpg"}
                  alt={"avatar"}
                  name={"Manish"}
                  time={"11:35 PM"}
                  message={"Heyyy buddy how are you doing?"}
                />
                <ContactCard
                  src={"/avatar.jpg"}
                  alt={"avatar"}
                  name={"Manish"}
                  time={"11:35 PM"}
                  message={"Heyyy buddy how are you doing?"}
                />
                <ContactCard
                  src={"/avatar.jpg"}
                  alt={"avatar"}
                  name={"Manish"}
                  time={"11:35 PM"}
                  message={"Heyyy buddy how are you doing?"}
                />
              </div>
            </centerfooter>
          </div>
        </centercontacts>
      </div>
    </div>
  );
};

export default Home;
