"use client";

import React, { useContext, useState, useEffect } from "react";
import { HostelType, useAuth } from '@/components/AuthContext';
import Modal from "@/components/common/AddHostelModal";
import { useRouter } from 'next/navigation';
import { auth } from "@/lib/firebase/initFirebase";
import AddPlanModal from "@/components/common/AddPlanModal";

const ADMIN_UID = "xKW62ulTdGcWB85GXOjerBK6pyR2"; // Replace with your UID


export default function AdminDashboard() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddPlanModalOpen, setAddPlanModalOpen] = useState(false);
  const [hostelId, setHostelId] = useState('');

  const [hostels, setHostels] = useState<HostelType[]>([]);
  

  const {
    user,
    refreshHostels, // Array of hostels fetched from Firestore
    addHostel, // Function to add a new hostel
    addPlan, // Function to add a new plan to a hostel
    fetchPlansForHostel, // Function to fetch plans for a specific hostel
    deleteHostel, // Function to delete a hostel
    addNewPlan, // Function to add a new plan
  } = useAuth(); // Using the context to access the state and functions

  const router = useRouter();

  useEffect(() => {
    handleRefreshHostels();
  }, []);
  
  const handleAddHostel =  async ( name: string, location: string) => {
    console.log('add hostel')
    setHostels( await addHostel(name, location))
    setModalOpen(false); // Close modal after adding hostel
  };

  const handleSavePlan = (  name: string, description: string, eventTime: Date ) => {
    // Add logic to save the plan
    addNewPlan(name, description, eventTime, hostelId);
    setAddPlanModalOpen(false); // Close modal after adding plan
    
  };

  const handleRefreshHostels = async () => {
    setHostels(await refreshHostels());
  }

  const HandleDeleteHostel = async (hostelId: string) => {
    console.log('delete hostel')
    // delete the hostel from the firebase database
    setHostels(await deleteHostel(hostelId));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => handleRefreshHostels()}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
          >
            Refresh
          </button>
          <button
            onClick= {()=> setModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            + Add New Hostel
          </button>
        </header>

        {/* List of Hostels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels && hostels?.map((hostel:HostelType) => (
            <div
              key={hostel.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              {/* Hostel Details */}
              <h2 className="text-lg font-semibold text-gray-700">
                {hostel.name}
              </h2>
              <p className="text-gray-600 text-sm">{hostel.location}</p>

              {/* View Plans Button */}
              <button
                onClick={() => fetchPlansForHostel(hostel.id)}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded mt-4"
              >
                View Plans
              </button>
              <button
                onClick={() => HandleDeleteHostel(hostel.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded mt-4"
              >
                Delete Hostel
              </button>

              {/* Add New Plan Section */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    setAddPlanModalOpen(true)
                    setHostelId(hostel.id)}}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-3 rounded"
                >
                  + Add New Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Hostels Placeholder */}
        {hostels && hostels.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No hostels added yet. Click "+ Add New Hostel" to get started.
          </p>
        )}
      </div>
      {isModalOpen && (
        <Modal
          title="Add New Hostel"
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddHostel}
        />
      )}
      {isAddPlanModalOpen && (
      <AddPlanModal
        isOpen={isAddPlanModalOpen}
        onClose={() => setAddPlanModalOpen(false)}
        onSave={handleSavePlan}
      />
    )}
    </div>
  );
}