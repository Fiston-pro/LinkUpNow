'use client';
import { useState } from 'react';
import MissionItem from './MissionItem';
import { missions } from '../../../../lib/missons'; // Assuming your mission data is in this file

export default function MissionsPage() {
  const [selectedTab, setSelectedTab] = useState('daily');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-highlight">Missions</h1>
      {/* Tabs for Daily and Weekly Missions */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-t-lg transition duration-200 ${
            selectedTab === 'daily' ? 'bg-highlight text-mainBg' : 'bg-cardBg text-textSecondary'
          }`}
          onClick={() => handleTabChange('daily')}
        >
          Daily Missions
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ml-2 transition duration-200 ${
            selectedTab === 'weekly' ? 'bg-highlight text-mainBg' : 'bg-cardBg text-textSecondary'
          }`}
          onClick={() => handleTabChange('weekly')}
        >
          Weekly Missions
        </button>
      </div>

      {/* Mission Items */}
      <div className="shadow-md rounded-lg p-4 ">
        {selectedTab === 'daily' &&
          missions.missions.dailyMissions.items.map((mission) => (
            <MissionItem key={mission.missionId} mission={mission} />
          ))}

        {selectedTab === 'weekly' &&
          missions.missions.weeklyMissions.items.map((mission) => (
            <MissionItem key={mission.missionId} mission={mission} />
          ))}
      </div>
    </div>
  );
}
