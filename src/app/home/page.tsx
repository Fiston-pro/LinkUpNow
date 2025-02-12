import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import homeQrCode from '../../../images/homeQrCode.svg'
 
const HomePage: React.FC = () => {
  // Example list of existing communities (can be fetched from an API)
  const existingCommunities = [
    { id: 1, name: 'Bydgoszcz', members: 120 },
    { id: 2, name: 'Wyższa Szkoła Gospodarki w Bydgoszczy', members: 85 },
    { id: 3, name: 'Gossip Central Station Hostel', members: 200 },
  ];
 
  return (
<div className="min-h-screen bg-gradient-to-br from-mainBg to-secondary flex flex-col">
      {/* Hero Section */}      
<div className="bg-secondary text-white py-16 text-center">
<h1 className="text-4xl font-bold mb-4">Welcome to LinkUpNow</h1>
<p className="text-lg">Where neighbors become friends, and friends become family. 🏡✨</p>
</div>
 
      {/* QR Code Section */}
<div className="container mx-auto px-4 py-12">
<div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
<h2 className=" text-mainBg text-2xl font-bold mb-4">Join Your Community</h2>
<p className="text-gray-600 mb-6">
            Scan the QR code at your premise to join your co-living community. It's like magic, but with Wi-Fi! 🪄
</p>
<div className="flex justify-center mb-6">
    <Image src={homeQrCode} alt="QR Code" width={192} height={192}               
    className="w-48 h-48 border-4 border-mainBg rounded-lg animate-bounce"
    />
</div>
<p className="text-sm text-gray-500 mb-6">
            Don't have a QR code? No worries! Be the hero your community needs and create one below. 🦸‍♂️
</p>
<Link href="/create-community">
<button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-mainBg transition-colors">
            Create Your Community
</button>
</Link>
</div>
</div>
 
      {/* Existing Communities Section */}
<div className="container mx-auto px-4 py-12">
<h2 className="text-2xl font-bold text-center mb-8">Or Join an Existing Community</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {existingCommunities.map((community) => (
<div
              key={community.id}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
>
<h3 className="text-mainBg text-xl font-bold mb-2">{community.name}</h3>
<p className="text-gray-600 mb-4">{community.members} members</p>
    <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-mainBg transition-colors">
                    Join {community.name}
    </button>
</div>
          ))}
</div>
</div>
 
      {/* Footer */}
<div className="mt-auto py-6 text-center">
<p className="text-sm text-gray-600">
          Made with ❤️ by LinkUpNow | Because life’s better together! 🎉
</p>
</div>
</div>
  );
};
 
export default HomePage;