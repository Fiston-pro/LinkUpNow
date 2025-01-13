import Modal from "@/components/common/Modal";
import { userData } from "../../../lib/user";
import { BiEdit } from "react-icons/bi";
import Image from "next/image";
import PlanCard from "../Pages/Plans/PlanCard";
import { userPlans } from "../../../lib/plans";

export default function Profile({ isOpen, onClose, user }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="container">
        <div className="min-h-screen bg-mainBg text-textPrimary flex flex-col items-center">
          {/* Profile Header */}
          <div className="w-full bg-secondary p-6 flex flex-col items-center rounded-b-3xl">
            <Image
              src={userData.profilePic}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-highlight"
            />
            <div className="flex">
              <h1 className="text-2xl font-semibold mt-4 text-textPrimary">{userData.name}</h1>
              {/* edit icon */}
              <BiEdit className="text-highlight text-2xl ml-2 mt-6" />
            </div>
            <p className="text-sm text-textSecondary">{userData.bio}</p>
            <div className="mt-4 flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-highlight font-semibold text-xl">{userData.smiles}</span>
                <span className="text-textSecondary text-sm">Smiles</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-highlight font-semibold text-xl">4</span>
                <span className="text-textSecondary text-sm">Badges</span>
              </div>
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-cardBg w-11/12 p-4 mt-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-textPrimary">Community Stats</h2>
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <span className="text-2xl text-highlight font-semibold">{user.friends}</span>
                <span className="text-sm text-textSecondary">Friends</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl text-highlight font-semibold">{user.plansJoined.length}</span>
                <span className="text-sm text-textSecondary">Plans Joined</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl text-highlight font-semibold">{user.plansCreated.length}</span>
                <span className="text-sm text-textSecondary">Plans Created</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-cardBg w-11/12 p-4 mt-6 rounded-lg">
            <h2 className="text-xl font-bold text-textPrimary mb-4">Recent Activities</h2>
            <ul className="space-y-4">
              {user.recentActivities.map((activity, index) => (
                <li className="flex justify-between items-center text-textSecondary" key={index}>
                  <span>
                    {activity.activity}
                  </span>
                  <span className="text-highlight">{activity.time}</span>
                </li>))}
            </ul>
          </div>
          {/* Settings Button */}
          <button className="mt-6 mb-6 py-2 px-6 bg-highlight text-mainBg font-bold rounded-full">
            Settings
          </button>
        </div>
      </div>
    </Modal>
  );
}
