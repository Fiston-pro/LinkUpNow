import React, { useState } from 'react';

interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string, eventTime: Date) => void;
}

const AddPlanModal: React.FC<AddPlanModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventTime, setEventTime] = useState('') as any;

  const handleSave = () => {
    onSave( name, description, eventTime );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-black">
        <h2 className="text-lg font-semibold mb-4">Add New Plan</h2>
        <input
          type="text"
          placeholder="Plan Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <textarea
          placeholder="Plan Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="datetime-local"
          placeholder="Event to happen at"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mr-2">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlanModal;