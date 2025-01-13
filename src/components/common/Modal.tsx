import { ReactNode, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { createPortal } from "react-dom";
import classNames from "classnames";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, children, className }: ModalProps) {
  // Close modal when clicking outside the modal content
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle ESC key to close the modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ease-in-out"
      onClick={handleOverlayClick}
    >
      <div
        className={classNames(
          "bg-[#1E212D] w-full max-w-4xl h-full max-h-[100vh] rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ease-in-out",
          className,
          { "translate-y-0": isOpen, "translate-y-full": !isOpen }
        )}
      >
        <div className="relative h-full">
          <button
            className="absolute top-14 right-4 z-20 bg-secondary p-2 rounded-full hover:bg-error transition-all duration-200"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <MdClose size={28} className="text-textPrimary" />
          </button>
          <div className="h-full flex flex-col text-textPrimary">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
