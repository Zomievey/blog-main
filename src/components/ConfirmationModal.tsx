import React from "react";
import { FaSpinner } from "react-icons/fa";
import "../styles/buttons.css";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityType: string;
  isLoading: boolean; // New loading state
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  entityType,
  isLoading,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='fixed inset-0 bg-black opacity-50'></div>
      <div className='bg-white p-8 rounded shadow-md z-50 w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>
          Are you sure you want to delete this {entityType}?
        </h2>
        <div className='flex justify-end'>
          <button
            className='mr-2 px-4 py-2 bg-gray-500 text-white rounded btn-custom'
            onClick={onClose}
            disabled={isLoading} // Disable button when loading
          >
            Cancel
          </button>
          <button
            className='px-4 py-2 bg-red-500 text-white rounded btn-custom-cancel'
            onClick={onConfirm}
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <FaSpinner className='animate-spin' /> // Show spinner when loading
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
