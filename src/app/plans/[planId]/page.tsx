"use client";

import { useEffect } from "react";
import { FaWindowClose, FaChevronRight } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { GoReport } from "react-icons/go";

import classNames from 'classnames';
import Members from "@/components/common/Members";
import { MdAccessTime, MdCalendarToday, MdLocationOn, MdPeople, MdPerson } from "react-icons/md";

interface PageProps {
  params: {
    id: string; // Dynamic `id` from the URL
  };
}

export default function PlanPage({ params }: PageProps) {
  const { id } = params;

  // Dummy data for the plan
  const plan = {
    name: "Sample Plan",
    description: "This is a sample description of the plan.",
    location: "Sample Location",
    participants: 5,
    date: "2021-09-25",
    createdBy: "John Doe",
  };

  return (
    <>
        <div className="relative flex flex-col h-full">
          {/* Modal Content */}
            <div className="fixed w-full top-0 left-0 p-4 flex justify-between ">
                <button className="bg-secondary text-white text-2xl rounded-full p-2">
                    <RxCross2/>
                </button>

                <button className="bg-secondary text-white text-2xl rounded-full p-2">
                    <GoReport/>
                </button>

            </div>

          <div className="p-4 mt-10 flex-1 overflow-y-auto bg-mainBg text-textPrimary">
            <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>

            {/* Plan Description */}
            <section className="mb-6">
              <p className="text-textSecondary">{plan.description}</p>
            </section>

            {/* Participants */}
            <section className="mb-6">
              <Members participants={plan.participants} />
            </section>

            {/* Plan Details */}
            <section className="mb-6">
              <div className=" space-y-2 ">
                {/* Date */}
                <div className="flex items-center space-x-2">
                    <div className="bg-secondary rounded-full text-white p-3">
                        <MdCalendarToday className="text-pink-400 text-2xl" />
                    </div>
                  <div>
                    <h5 className="text-lg font-semibold">Date</h5>
                    <p className="text-textSecondary">{plan.date}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center space-x-2">
                <div className="bg-secondary rounded-full text-white p-3">
                    <MdAccessTime className="text-blue-400 text-2xl" />
                </div>
                  <div>
                    <h5 className="text-lg font-semibold">Time</h5>
                    <p className="text-textSecondary">{plan.date}</p>
                  </div>
                </div>

                {/* Created by */}
                <div className="flex items-center space-x-2">
                <div className="bg-secondary rounded-full text-white p-3">
                    <MdPerson className="text-orange-400 text-2xl" />
                </div>
                  <div>
                    <h5 className="text-lg font-semibold">Created by</h5>
                    <p className="text-textSecondary">{plan.createdBy}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2">
                <div className="bg-secondary rounded-full text-white p-3">
                    <MdLocationOn className="text-highlight text-2xl" />
                </div>
                  <div>
                    <h5 className="text-lg font-semibold">Location</h5>
                    <p className="text-textSecondary">{plan.location}</p>
                  </div>
                </div>

                {/* Participants */}
                {/* <div className="flex items-center space-x-2">
                <div className="bg-secondary rounded-full text-white p-3">
                    <MdPeople className="text-highlight text-2xl" />
                </div>
                  <div>
                    <h5 className="text-lg font-semibold">Participants</h5>
                    <p className="text-textSecondary">
                      {plan.participants}
                    </p>
                  </div>
                </div> */}
              </div>
            </section>
          </div>

          {/* Join/Leave Buttons */}
            {/* {isUserJoined ? (
              <>
                <button
                  className="bg-highlight text-white px-4 py-2 rounded-lg hover:bg-[#FF5500] transition-all duration-200"
                  onClick={() => setGroupChatOpen(true)}
                >
                  View Group Chat
                </button>
                <button
                  className="bg-error text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 ml-4"
                  onClick={handleLeavePlan}
                >
                  Leave Plan
                </button>
              </>
            ) : ( */}

            {/* )} */}


            <nav className="flex justify-center items-center text-white shadow-lg font-sans bg-secondary z-30 fixed bottom-0 w-full px-4 py-3 rounded-t-3xl border-t-2 border-[#6e34a7]">
                <button
                className="bg-highlight text-white px-4 py-2 rounded-lg hover:bg-[#FF5500] transition-all duration-200"
              >
                Join Plan
              </button>
            </nav>

        </div>
    </>
  );
}