// CategoryDropdown.tsx
import { Reward } from '@/models/Rewards';
import RewardCard from './RewardCard';
import { useState } from 'react';

interface CategoryDropdownProps {
    title: string;
    items: Reward[];
}

export default function CategoryDropdown({ title, items }: CategoryDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-8 border border-gray-600 rounded-lg overflow-hidden shadow-md bg-cardBg">
            <h2
                className="flex justify-between items-center bg-secondary text-lg font-semibold p-4 cursor-pointer transition-colors duration-300 hover:bg-highlight"
                onClick={() => setIsOpen(!isOpen)}
                role="button"
                aria-expanded={isOpen}
                tabIndex={0} // Makes it focusable
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        setIsOpen(!isOpen);
                    }
                }}
            >
                <span className="text-textPrimary">{title}</span>
                <span className={`transform transition-transform duration-300 text-textPrimary ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                </span>
            </h2>

            {isOpen && (
                <div className="p-4 space-y-4 bg-cardBgLight">
                    {items.map((reward) => (
                        <RewardCard key={reward.rewardId} reward={reward} />
                    ))}
                </div>
            )}
        </div>
    );
}
