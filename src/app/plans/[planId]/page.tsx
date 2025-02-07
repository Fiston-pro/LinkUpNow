"use client";

import { useEffect, useState } from "react";

import { usePathname } from 'next/navigation'
import { useAuth, PlanType } from '@/components/AuthContext';

import { RxCross2 } from "react-icons/rx";
import { GoReport } from "react-icons/go";

import Members from "@/components/common/Members";
import { MdAccessTime, MdCalendarToday, MdLocationOn, MdPerson } from "react-icons/md";

import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

// import router
import { useRouter } from 'next/navigation';

export default function PlanPage() {

  const pathname = usePathname();

  const { user, getPlanData, removeUserFromPlan, addUserToPlan } = useAuth();

  const [planData, setPlanData] = useState<PlanType>();
  const [isUserJoined, setIsUserJoined] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const parts = pathname.split('/');
    const planId = parts[2]; // This will give you '1737397179478'
    console.log(planId); // Output: 1737397179478
    getPlanData(planId).then((data:PlanType) => {
      setPlanData(data);
      console.log('plan data here:', data);
      setIsUserJoined(user?.plansJoined?.includes(data.id) || user?.plansCreated?.includes(data.id));
    });
  }, [pathname])

  // Function to join the plan
  const handleJoinPlan = async () => {
    console.log('Joining plan');
    await addUserToPlan(planData?.id);
    setIsUserJoined(true);
  };

  // Function to leave the plan, also I want after leaving the plan to refresh the page and show the join button
  const handleLeavePlan = async () => {
    console.log('Leaving plan');
    await removeUserFromPlan(planData?.id);
    setIsUserJoined(false);
  };

  // Function to format the date
  const formatDate = (eventTime: Timestamp) => {
    const date = eventTime?.toDate();
    if (!date) return '';
    return format(date, 'PP'); // 'PP' is the format string for full date in date-fns
  };

  // Function to format the time
  const formatTime = (eventTime: Timestamp) => {
    const date = eventTime?.toDate();
    if (!date) return '';
    return format(date, 'p'); // 'p' is the format string for time in date-fns
  };

  return (
    <>
        <div className="relative flex flex-col h-full">
          {/* Modal Content */}
            <div className="fixed w-full top-0 left-0 p-4 flex justify-between ">
                <button onClick={()=> router.back() } className="bg-secondary text-white text-2xl rounded-full p-2">
                    <RxCross2/>
                </button>

                <button className="bg-secondary text-white text-2xl rounded-full p-2">
                    <GoReport/>
                </button>

            </div>

          <div className="p-4 mt-10 flex-1 overflow-y-auto bg-mainBg text-textPrimary">
            <h3 className="text-2xl font-bold mb-4">{planData?.name}</h3>

            {/* Plan Description */}
            <section className="mb-6">
              <p className="text-textSecondary">{planData?.description}</p>
            </section>

            {/* Participants */}
            <section className="mb-6">
              <Members participants={5} />
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
                    <p className="text-textSecondary">{formatDate(planData?.eventTime)}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center space-x-2">
                <div className="bg-secondary rounded-full text-white p-3">
                    <MdAccessTime className="text-blue-400 text-2xl" />
                </div>
                  <div>
                    <h5 className="text-lg font-semibold">Time</h5>
                    <p className="text-textSecondary">{formatTime(planData?.eventTime)}</p>
                  </div>
                </div>

                {/* Created by */}
                <div className="flex items-center space-x-2">
                <div className="bg-secondary rounded-full text-white p-3">
                    <MdPerson className="text-orange-400 text-2xl" />
                </div>
                  <div>
                    <h5 className="text-lg font-semibold">Created by</h5>
                    <p className="text-textSecondary">{planData?.createdBy}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2">
                <div className="bg-secondary rounded-full text-white p-3">
                    <MdLocationOn className="text-highlight text-2xl" />
                </div>
                  <div>
                    <h5 className="text-lg font-semibold">Location</h5>
                    <p className="text-textSecondary">Here</p>
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
                  onClick={() => router.push(`/plans/${planData?.id}/chat`)}
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
            ) : ( 
              <button
                className="bg-highlight text-white px-4 py-2 rounded-lg hover:bg-[#FF5500] transition-all duration-200"
                onClick={handleJoinPlan}
              >
                Join Plan
              </button>
            )} */}

            {/* Floating Button */}


            <nav className="flex justify-center items-center text-white shadow-lg font-sans bg-secondary z-30 fixed bottom-0 w-full px-4 py-3 rounded-t-3xl border-t-2 border-[#6e34a7]">
                {

                  isUserJoined ? (
                    <>
                      <button
                        className="bg-highlight text-white px-4 py-2 rounded-lg hover:bg-[#FF5500] transition-all duration-200"
                        onClick={() => router.push(`/chats/${planData?.id}`)}
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
                  ) : ( 
                    <button
                      className="bg-highlight text-white px-4 py-2 rounded-lg hover:bg-[#FF5500] transition-all duration-200"
                      onClick={handleJoinPlan}
                    >
                      Join Plan
                    </button>
                  )
                }
            </nav>

        </div>
    </>
  );
}