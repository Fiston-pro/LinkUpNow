'use client';
import { RewardsData } from '@/models/Rewards';
import CategoryDropdown from './CategoryDropdown';
import { rewards } from '../../../../lib/rewards';
import { FaGift, FaSmile } from 'react-icons/fa'; // Importing icons from react-icons

export default function Rewards() {
  const rewardsData: RewardsData = rewards;

  return (
    <div className="container mx-auto p-6 text-textPrimary">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Rewards Hub <FaGift className="inline-block ml-2 text-highlight" />
        </h1>
        <p className="text-textSecondary mt-2">
          Discover amazing rewards you can claim with your smiles <FaSmile className="inline-block ml-1 text-highlight" />        </p>
      </div>

      {/* Reward Sections */}
      <div className="space-y-8 pb-8">
        {Object.entries(rewardsData.rewards).map(([key, rewardSection]) => (
          <CategoryDropdown
            key={key}
            title={rewardSection.title}
            items={rewardSection.items}
          />
        ))}
      </div>
    </div>
    
  );
}
