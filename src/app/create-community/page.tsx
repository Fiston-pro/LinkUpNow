'use client';

import React, { useState } from 'react';
// import QRCode from 'qrcode.react'; // For generating QR codes

import { useAuth } from '@/components/AuthContext';
 
const CreateCommunityPage: React.FC = () => {
  const [communityName, setCommunityName] = useState('');
  const [communityCreated, setCommunityCreated] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState('');
  
  const { createCommunity } = useAuth();
 
  const handleCreateCommunity = async () => {
    if (communityName.trim() === '') {
      alert('Community name cannot be empty!');
      return;
    }

    const newCommunity = await createCommunity(communityName);

    if (!newCommunity) {
        console.log('Failed to create community. Please try again!');
        console.log(newCommunity);
      alert('Failed to create community. Please try again!');
        return;
    }

    console.log('Community created successfully:', newCommunity);
 
    // Simulate community creation (replace with API call)
    const qrValue = `https://linkupnow.com/hostels/${newCommunity}`; // URL for QR code
    setQrCodeValue(qrValue);
    setCommunityCreated(true);
  };
 
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `${communityName}-QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  return (
<div className="min-h-screen bg-gradient-to-br from-secondary to-mainBg flex flex-col items-center py-12">
      {/* Page Header */}
<div className="text-center mb-12">
<h1 className="text-4xl font-bold text-white mb-4">Create Your Community</h1>
<p className="text-lg text-gray-400">
          Be the hero your co-living space deserves! 🦸‍♂️
</p>
</div>
 
      {/* Rules Section */}
<div className="bg-white rounded-lg shadow-lg p-8 mb-12 max-w-2xl w-full">
<h2 className="text-2xl font-bold text-secondary mb-6">Community Creation Rules</h2>
<ul className="list-disc list-inside text-gray-600 space-y-3">
<li>🚀 Your community name must be unique and awesome.</li>
<li>👥 You must have at least 5 members to start a community.</li>
<li>📜 Respect the rules of your co-living space (no chaos, please!).</li>
<li>🎉 Keep it fun, inclusive, and welcoming for everyone.</li>
<li>🔗 Share the QR code with your neighbors to grow your community.</li>
</ul>
</div>
 
      {/* Community Creation Form */}
      {!communityCreated ? (
<div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
<h2 className="text-2xl font-bold text-secondary mb-6">Let's Get Started</h2>
<div className="space-y-6">
<div>
<label htmlFor="communityName" className="block text-gray-600 mb-2">
                Community Name
</label>
<input
                type="text"
                id="communityName"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="e.g., Sunset Residences"
                className="w-full px-4 py-2 border text-mainBg border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
</div>
<button
              onClick={handleCreateCommunity}
              className="w-full bg-secondary text-white px-6 py-2 rounded-lg hover:bg-mainBg transition-colors"
>
              Create Community
</button>
</div>
</div>
      ) : (
        /* QR Code Section */
<div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full text-center">
<h2 className="text-2xl font-bold text-secondary mb-6">🎉 Community Created! 🎉</h2>
<p className="text-gray-600 mb-6">
            Share the Link below with your neighbors to grow your community!
</p>
<div className="flex justify-center mb-6">

    <code className="text-gray-600 mb-6">
            {qrCodeValue}
    </code>

{/* <QRCode
              id="qr-code"
              value='https://www.npmjs.com/package/qrcode.react'
              size={200}
              level="H"
              includeMargin={true}
              className="border-4 border-purple-200 rounded-lg"
            /> */}
</div>
{/* <button
            onClick={downloadQRCode}
            className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-mainBg transition-colors"
>
            Download QR Code
</button> */}
</div>
      )}
 
      {/* Footer */}
<div className="mt-auto py-6 text-center w-full">
<p className="text-sm text-gray-600">
          Made with ❤️ by LinkUpNow | Because life’s better together! 🎉
</p>
</div>
</div>
  );
};
 
export default CreateCommunityPage;