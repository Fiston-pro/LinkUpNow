'use client';
import Image from "next/image";
import {
  MdLocationOn,
  MdEmojiEmotions,
  MdPeople,
  MdAttachMoney,
  MdCategory,
  MdPerson,
  MdCalendarToday,
  MdAccessTime,
} from "react-icons/md";
import Modal from "@/components/common/Modal";
import Members from "@/components/common/Members";
import { Plan } from "@/models/Plan";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // RootState import for typing
import { joinPlan, leavePlan } from '@/redux/plansSlice'; // Importing thunks from Redux slice

import GroupChat from "./Chat";

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan;
}

const PlanModal: React.FC<PlanModalProps> = ({ isOpen, onClose, plan }) => {
  const [isGroupChatOpen, setGroupChatOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.loggedInUser); // Access logged-in user

  const isUserJoined = user.plansJoined.includes(plan.plan_id);

  const handleJoinPlan = () => {
    console.log("Joining plan:", plan.plan_id);
    dispatch(joinPlan({ planId: plan.plan_id, userId: user.id }));
    console.log("user", user);
  };

  const handleLeavePlan = () => {
    dispatch(leavePlan({ planId: plan.plan_id, userId: user.id }));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="relative flex flex-col h-full">
          {/* Plan Image */}
          <Image
            src={plan.image}
            alt={plan.name}
            className="w-full h-80 object-cover"
          />

          {/* Modal Content */}
          <div className="p-6 flex-1 overflow-y-auto bg-mainBg text-textPrimary">
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
              <div className="grid grid-cols-2 gap-4">
                {/* Date */}
                <div className="flex items-center space-x-2">
                  <MdCalendarToday className="text-pink-400 text-2xl" />
                  <div>
                    <h5 className="text-lg font-semibold">Date</h5>
                    <p className="text-textSecondary">{plan.date}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center space-x-2">
                  <MdAccessTime className="text-blue-400 text-2xl" />
                  <div>
                    <h5 className="text-lg font-semibold">Time</h5>
                    <p className="text-textSecondary">{plan.time}</p>
                  </div>
                </div>

                {/* Created by */}
                <div className="flex items-center space-x-2">
                  <MdPerson className="text-orange-400 text-2xl" />
                  <div>
                    <h5 className="text-lg font-semibold">Created by</h5>
                    <p className="text-textSecondary">{plan.created_by}</p>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-center space-x-2">
                  <MdCategory className="text-purple-400 text-2xl" />
                  <div>
                    <h5 className="text-lg font-semibold">Category</h5>
                    <p className="text-textSecondary">{plan.category}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2">
                  <MdLocationOn className="text-highlight text-2xl" />
                  <div>
                    <h5 className="text-lg font-semibold">Location</h5>
                    <p className="text-textSecondary">{plan.location}</p>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-center space-x-2">
                  <MdPeople className="text-highlight text-2xl" />
                  <div>
                    <h5 className="text-lg font-semibold">Participants</h5>
                    <p className="text-textSecondary">
                      {plan.participants}/{plan.max_participants}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <MdAttachMoney
                    className={plan.is_free ? "text-success text-2xl" : "text-warning text-2xl"}
                  />
                  <h5 className="text-lg font-semibold">
                    {plan.is_free ? "Free Event" : plan.price}
                  </h5>
                </div>
              </div>
            </section>

            {/* Smiles Given */}
            <section className="mb-6">
              <div className="flex items-center space-x-2">
                <MdEmojiEmotions
                  className={plan.is_free ? "text-highlight text-2xl" : "text-green-500 text-2xl"}
                />
                <h5 className="text-lg font-semibold">
                  {plan.is_free ? `You Need ` : 'You reseive'} {plan.smiles} smiles
                </h5>
              </div>
            </section>
          </div>

          {/* Join/Leave Buttons */}
          <div className="bg-cardBg p-4 sticky bottom-0 flex justify-center">
            {isUserJoined ? (
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
            ) : (
              <button
                className="bg-highlight text-white px-4 py-2 rounded-lg hover:bg-[#FF5500] transition-all duration-200"
                onClick={handleJoinPlan}
              >
                Join Plan
              </button>
            )}
          </div>
        </div>

      </Modal>

      {isGroupChatOpen && (
        <GroupChat
          isOpen={isGroupChatOpen}
          onClose={() => setGroupChatOpen(false)}
          plan={plan}
        />
      )}
    </>
  );
};

export default PlanModal;
