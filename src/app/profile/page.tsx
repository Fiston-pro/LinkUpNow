"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '@/components/AuthContext';
import DummyImage from '../../../images/Users/dummyImageUser.jpg';
import { FiEdit, FiSend } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, logOut, changeUserName } = useAuth();
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(user?.photoURL || DummyImage);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
 
  const handleLogOut = async () => {
    await logOut();
    router.push('/signin');
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    console.log('Saving changes...');
    await changeUserName(name);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 pt-14 backdrop-blur-md bg-[rgba(26,16,52,0.7)] text-white rounded-3xl shadow-2xl overflow-hidden">
      <header className="flex flex-col items-center mb-6 border-b border-secondary pb-4 relative">
        <Image
          src={user?.photoURL || DummyImage}
          alt={name}
          width={100}
          height={100}
          className="object-cover border-2 border-cardBgLight rounded-full h-24 w-24"
        />

        {isEditing ? (
          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              value={name}
              placeholder={user?.name}
              onChange={(e) => setName(e.target.value)}
              className={`text-center text-white bg-transparent border-b text-2xl border-secondary focus:outline-none focus:border-primary mt-4 ${isEditing ? 'block' : 'hidden'}`}
            />
            <button onClick={handleSaveChanges} className=" p-2 bg-highlight text-white rounded-full hover:bg-orange-600 transition duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/50 focus:outline-none focus:ring-4 focus:ring-orange-600">
              <FiSend size={20}/>
            </button>
          </div>
        
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide mt-4">{user?.name}</h2>  
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-0 right-0 mt-4 mr-4 p-2 bg-highlight text-white rounded-full hover:bg-orange-600 transition duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/50 focus:outline-none focus:ring-4 focus:ring-orange-600"
            >
              <FiEdit size={20} />
            </button>
          </div>
        )}

        <p className="text-sm text-textSecondary mt-1">{user?.email}</p>
        <button
          onClick={handleLogOut}
          className="mt-4 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/50 focus:outline-none focus:ring-4 focus:ring-red-600"
        >
          Logout
        </button>
      </header>

      <section className="flex-1 w-full md:w-1/2 lg:w-1/3 p-4 space-y-6 custom-scrollbar">
        <div className="bg-gradient-to-br from-[#242830] to-[#2b2f33] p-4 rounded-2xl shadow-xl text-textPrimary flex justify-between items-center">
          <h3 className="text-xl font-bold">Plans Joined</h3>
          <p className="text-2xl font-bold">{user?.plansJoined?.length || '0'}</p>
        </div>
        <div className="bg-gradient-to-br from-[#242830] to-[#2b2f33] p-4 rounded-2xl shadow-xl text-textPrimary flex justify-between items-center">
          <h3 className="text-xl font-bold">Plans Created</h3>
          <p className="text-2xl font-bold">{user?.plansCreated?.length || "0"}</p>
        </div>
      </section>
    </div>
  );
}