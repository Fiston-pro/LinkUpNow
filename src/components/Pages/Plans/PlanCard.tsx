import { useState } from "react";
import Image from "next/image";
import { MdLocationOn, MdEmojiEmotions, MdPeople } from "react-icons/md";
import PlanModal from "./PlanModal";
import { Plan } from "@/models/Plan";

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div
        className="bg-cardBgLight p-4 rounded-lg shadow-md h-full flex flex-col justify-between transition-transform duration-200 hover:scale-105 cursor-pointer"
        onClick={openModal}
      >
        <div className="relative">
          <Image
            src={plan.image}
            alt={plan.name}
            className="w-full h-52 object-cover rounded-lg"
          />
          {plan.is_free ? (
            plan.smiles === 0 ? (
              <div className="absolute top-2 right-2 bg-[#FFF] p-2 rounded-full shadow-lg border-4 border-success">
                <div className="flex items-center space-x-1">
                  <p className="font-bold text-sm text-success">Free</p>
                </div>
              </div>
            ) : (
              <div className={`absolute flex top-2 right-2 bg-[#FFF] p-2 rounded-full shadow-lg border-4 border-highlight`}>
                <MdEmojiEmotions className='text-lg font-bold text-highlight' />
                <span className={'text-sm font-bold text-highlight'}>
                  {plan.smiles}
                </span>
              </div>
            )
          ) : (
            <div className="absolute top-2 right-2 bg-[#FFF] p-2 rounded-full shadow-lg border-4 border-green-500">
              <p className="font-bold text-sm text-green-500">{plan?.price}</p>
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold text-textPrimary">{plan.name}</h3>
        <div className="flex justify-between text-textSecondary">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="text-highlight" />
            <p className="text-sm">{plan.location}</p>
          </div>
          <div className="flex items-center space-x-1">
            <MdPeople className="text-highlight" />
            <p className="text-sm">
              {plan.participants}/{plan.max_participants}
            </p>
          </div>
        </div>
      </div>
      <PlanModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        plan={plan}
      />
    </>
  );
}
