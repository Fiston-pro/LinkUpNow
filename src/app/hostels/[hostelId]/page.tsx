'use client';

import { useAuth } from '@/components/AuthContext';
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation'

import ImageProfile from '../../../../images/Users/pushkar.jpg'

import {  FaChevronRight } from "react-icons/fa";

import {  MdCalendarToday,  MdLocationOn } from "react-icons/md";

export interface HostelType {
  id: string; // Firestore-generated ID
  name: string;
  location: string; // e.g., "Bali, Indonesia"
  plans: string[]; // Array of `planId`s
  createdBy: string; // userId of the creator (e.g., admin/owner)
};

export interface PlanType { 
  id: string; // Firestore-generated ID
  name: string; // Name of the plan (e.g., "Beach Cleanup")
  description: string; // Plan description
  eventTime: string; // When the plan happens
  hostelId: string; // Reference to the associated hostel (hostelId)
  createdBy: string; // userId of the creator
  participants: string[]; // Array of userIds
  maxParticipants?: number; // Optional maximum number of participants
  createdAt: string; // Timestamp of creation
};

export default function HostelPage() {

  const router = useRouter();
  const pathname = usePathname()

  const { getHostelData, getPlanData } = useAuth();

  const [hostelData, setHostelData] = useState<HostelType>();
  const [plans, setPlans] = useState<PlanType[]>();

   
  useEffect(() => {
    const parts = pathname.split('/');
    const hostelId = parts[2]; // This will give you '1737397179478'
    console.log(hostelId); // Output: 1737397179478
    getHostelData(hostelId).then((data:HostelType) => {
      setHostelData(data);
      console.log('hotel data here:', data);
    });
  }, [pathname])

  //check if in the hosteldata if there is plans array and retrieve plans from authcontext function
  useEffect(() => {
    if (hostelData && hostelData.plans) {
      const plansData = hostelData.plans.map((planId) => {
        return getPlanData(planId);
      });
      Promise.all(plansData).then((plans) => {
        setPlans(plans);
        console.log('plans data here:', plans);
      });
    }
  }, [hostelData]);
  
  // return loading or smothing if data is not fetched
  if (!hostelData) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="relative w-auto">
      <div className="relative h-full overflow-hidden rounded-lg">
        <div className="flex items-center justify-center border-b-2 border-highlight py-2 m-4 rounded-md shadow-md">

          <h1 className="text-4xl font-bold tracking-wider uppercase bg-gradient-to-r from-warning via-blue-500 to-purple-600 text-transparent bg-clip-text">
            {hostelData.name}
          </h1>

          <div className="container flex items-center justify-end text-textPrimary">
              <div className="relative flex items-center flex-col">
                <div className="relative">
                  <div
                    className="absolute -top-1 -left-1 w-20 h-20 rounded-full z-0 bg-highlight shadow-lg"></div>
                  <Image
                    src= {ImageProfile}
                    alt=' My profile picture'
                    className="rounded-full w-20 h-20 relative z-10"
                  />
                </div>
              </div>
            </div>
        </div>
        {plans?.map((plan, index) => (
            <div
                key={plan.id}
                className="m-4 bg-secondary text-white rounded-lg bg-opacity-60 border-2 border-[#6e34a7]"
            >
                <div className="p-4 bg-mainBg rounded-t-lg bg-opacity-60">
                    <h2 className="text-lg font-bold">{plan.name}</h2>
                    <div className="flex flex-row items-center space-x-1 text-xs">
                      <MdCalendarToday /> 
                      <span>{plan.eventTime}</span>
                    </div>
                    <div className="flex flex-row items-center space-x-1 text-xs">
                      <MdLocationOn /> 
                      <span>{hostelData.location}</span>
                    </div>

                </div>
                <div className="p-4">
                  <div className="flex justify-end mb-2">
                    <span className="text-xs">Damian (Host)</span>                        
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="text-lg font-bold">{plan.description}</h3>
                    <button 
                    onClick={() => {
                      console.log('click');
                      router.push(`/plans/${plan.id}`);
                    }}
                    className="bg-mainBg rounded-full text-white p-2">
                      <FaChevronRight />
                    </button>
                  </div>
                </div>                  
            </div>
        ))}
        </div>
    </div>
</>
  );
}
