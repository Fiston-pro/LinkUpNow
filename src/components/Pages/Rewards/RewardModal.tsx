import { Reward } from "@/models/Rewards";
import Modal from "@/components/common/Modal";
import { MdEmojiEmotions, MdLocationOn, MdEvent } from "react-icons/md";
import { FaScissors } from "react-icons/fa6";
import Image from "next/image";

interface RewardModalProps {
    isOpen: boolean;
    onClose: () => void;
    reward: Reward;
}

export default function RewardModal({ isOpen, onClose, reward }: RewardModalProps) {
    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-md !w-4/5 !h-2/4 p-6 rounded-lg shadow-lg text-white relative"
        >
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden border-4 border-dashed border-[#FFF]">
                <Image
                    src={reward.imageUrl}
                    alt={reward.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-60"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
                    <h2 className="text-xl font-bold text-white drop-shadow-md">
                        {reward.name}
                    </h2>
                    <button className="mt-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg drop-shadow-md">
                        Redeem Now
                    </button>
                </div>
                <div className="absolute bottom-0 right-0 m-2">
                    <FaScissors className="text-2xl text-white opacity-80" />
                </div>
            </div>
            <div className="py-2 rounded-lg text-gray-200">
                <p className="text-sm mb-4">{reward.description}</p>
                <p className="text-sm font-semibold mb-2">
                    Provided by: <span className="font-bold">{reward.provider}</span>
                </p>
                <div className="flex justify-between text-gray-100 mb-4">
                    <div className="flex items-center space-x-1">
                        <MdLocationOn className="text-yellow-400" />
                        <p className="text-sm">{reward.location}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <MdEvent className="text-blue-400" />
                        <p className="text-sm">{reward.validity}</p>
                    </div>
                </div>
                <div className="flex items-center mt-4">
                    <MdEmojiEmotions className="text-lg text-green-500" />
                    <p className="ml-2 text-lg font-semibold">{reward.smilesCost} Smiles</p>
                </div>
            </div>
        </Modal>
    );
}
