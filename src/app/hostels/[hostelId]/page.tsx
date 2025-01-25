import MyProfile from "@/components/common/MyProfile";
import { useEffect } from "react";
import Image from "next/image";

import ImageProfile from '../../../../images/Users/pushkar.jpg'

import {  FaChevronRight } from "react-icons/fa";

import {  MdCalendarToday,  MdLocationOn } from "react-icons/md";


interface PageProps {
  params: {
    id: string; // Dynamic `id` from the URL
  };
}

export default function HostelPage({ params }: PageProps) {
  const { id } = params;

  // Dummy data for the hostel
  const data = {
    name: "Sample Hostel",
    description: "This is a sample description of the hostel.",
    location: "Sample Location",
    plans: [
      { id: 'fasdfsdfsd',name: "Plan A",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$100", features: ["Feature 1", "Feature 2"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
      { id: 'fasdfdfsd',name: "Plan B",date: "20/09/25",location: "Adama bochenka", description: 'PlanPlanPlan PlanPlanPlanPlan', price: "$200", features: ["Feature 3", "Feature 4"] },
    ],
  };

  return (
    <>
    <div className="relative w-auto">
      <div className="relative h-full overflow-hidden rounded-lg">
        <div className="flex items-center justify-center border-b-2 border-highlight py-2 m-4 rounded-md shadow-md">

          <h1 className="text-4xl font-bold tracking-wider uppercase bg-gradient-to-r from-warning via-blue-500 to-purple-600 text-transparent bg-clip-text">
            {data.name}
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
        {data.plans.map((plan, index) => (
            <div
                key={plan.id}
                className="m-4 bg-secondary text-white rounded-lg bg-opacity-60 border-2 border-[#6e34a7]"
            >
                <div className="p-4 bg-mainBg rounded-t-lg bg-opacity-60">
                    <h2 className="text-lg font-bold">{plan.name}</h2>
                    <div className="flex flex-row items-center space-x-1 text-xs">
                      <MdCalendarToday /> 
                      <span>{plan.date}</span>
                    </div>
                    <div className="flex flex-row items-center space-x-1 text-xs">
                      <MdLocationOn /> 
                      <span>{plan.location}</span>
                    </div>

                </div>
                <div className="p-4">
                  <div className="flex justify-end mb-2">
                    <span className="text-xs">Damian (Host)</span>                        
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="text-lg font-bold">{plan.description}</h3>
                    <button className="bg-mainBg rounded-full text-white p-2">
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
