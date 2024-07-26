// ConfirmModal.tsx
import React from "react";
import "../styles/buttons.css";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityType: "post" | "comment";
  entityTitle?: string | null;
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  entityType,
  entityTitle,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const renderMessage = () => {
    if (entityTitle) {
      return {
        __html: `Are you sure you want to delete this ${entityType} titled "<strong>${entityTitle}</strong>"?`,
      };
    }
    return { __html: `Are you sure you want to delete this ${entityType}?` };
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <h2 className='text-lg font-bold mb-4'>Confirm Deletion</h2>
        <p dangerouslySetInnerHTML={renderMessage()}></p>
        <div className='flex justify-end mt-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-200 text-black rounded mr-2 btn-custom-cancel'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-500 text-white rounded btn-custom'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
