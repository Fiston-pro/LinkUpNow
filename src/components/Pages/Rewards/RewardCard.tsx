import { useState } from "react";
import { Reward } from "@/models/Rewards";
import { MdEmojiEmotions, MdEvent } from "react-icons/md";
import RewardModal from "./RewardModal";

interface RewardItemProps {
    reward: Reward;
}

export default function RewardItem({ reward }: RewardItemProps) {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <>
            <div
                className="p-4 rounded-lg shadow-lg border-2 border-highlight h-full flex flex-col justify-between transition-transform duration-200 hover:scale-105 cursor-pointer"
                onClick={openModal}
            >
                <div className="flex flex-col space-y-1 h-full">
                    <h3 className="text-lg font-bold text-textPrimary">{reward.name}</h3>
                    <div className="flex items-center space-x-2">
                        <MdEvent className="text-blue-400" />
                        <p className="text-sm">{reward.validity}</p>
                    </div>
                    <div className="mt-auto bg-cardBgLight p-2 rounded-full flex items-center justify-center">
                        <MdEmojiEmotions className="text-lg text-green-500" />
                        <span className="text-sm font-bold text-textPrimary ml-1">{reward.smilesCost}</span>
                    </div>
                </div>
            </div>
            <RewardModal isOpen={isModalOpen} onClose={closeModal} reward={reward} />
        </>
    );
}
