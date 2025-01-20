import React, { useState } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (name: string, location: string) => void;
}

const Modal = ({ title, onClose, onSubmit }: ModalProps ) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (name.trim() && location.trim()) {
      onSubmit(name, location);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Hostel Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter hostel name"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter location"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onClose}
            className="py-2 px-4 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Hostel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
