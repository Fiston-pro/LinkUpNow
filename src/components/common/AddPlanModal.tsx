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
  const [isShowError, setIsShowError] = useState(false);

  // make a function make sure that name is mandatory and eventTime is mandatory, then run the onSave function
  const handleSave = () => {
    if (!name || !eventTime) {
      setIsShowError(true);
      return;
    }
    onSave(name, description, new Date(eventTime));
    //clear the input fields
    setName('');
    setDescription('');
    setEventTime('');
    setIsShowError(false);

    onClose();
  }

  const handleClose = () => {
    setName('');
    setDescription('');
    setEventTime('');
    setIsShowError(false);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-secondary p-6 rounded shadow-lg text-white">
        <h2 className="text-lg font-semibold mb-4">Add New Plan</h2>
        <input
          type="text"
          placeholder="Plan Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md text-secondary"
        />
        <textarea
          placeholder="Plan Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full rounded-md text-secondary"
        />
        <input
          type="datetime-local"
          placeholder="Event to happen at"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          className="border p-2 mb-4 w-full rounded-md text-secondary"
        />
        { isShowError && (
          <>          
            {!name && <p className="text-red-500 text-sm">Name is required</p>}
            {!eventTime && <p className="text-red-500 text-sm">Event Time is required</p>}       
          </>
        )}
        <div className="flex justify-end">
          <button onClick={handleClose} className="bg-gray-500 hover:bg-gray-600 hover:scale-105 text-white font-medium py-2 px-4 rounded mr-2">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-highlight hover:hover:bg-highlight-dark hover:scale-105 text-white font-medium py-2 px-4 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlanModal;