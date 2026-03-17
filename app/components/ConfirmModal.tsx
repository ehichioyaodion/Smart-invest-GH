"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ReactNode } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: ReactNode;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "info",
}: ConfirmModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: (
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 2.502-3.207V13a2 2 0 00-2-2h-1C9.667 11 9 12.167 9 13.5c0 .54.044 1.067.127 1.567.207V13a2 2 0 002 2h1c0 1.54.462 2.502 1.667 2.502 3.207z"
          />
        </svg>
      ),
      confirmButtonClass: "bg-red-600 hover:bg-red-700 text-white",
    },
    warning: {
      icon: (
        <svg
          className="w-6 h-6 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 2.502-3.207V13a2 2 0 00-2-2h-1C9.667 11 9 12.167 9 13.5c0 .54.044 1.067.127 1.567.207V13a2 2 0 002 2h1c0 1.54.462 2.502 1.667 2.502 3.207z"
          />
        </svg>
      ),
      confirmButtonClass: "bg-yellow-600 hover:bg-yellow-700 text-white",
    },
    info: {
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h1M4 12h8m-4 0h.01M5 8a2 2 0 11-4 0v8a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8z"
          />
        </svg>
      ),
      confirmButtonClass: "bg-blue-600 hover:bg-blue-700 text-white",
    },
  };

  const currentType = typeStyles[type];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center">
            <Image
              src="/icon.png"
              alt="Smart Invest GH"
              width={130}
              height={130}
              priority
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <div className="text-gray-600 dark:text-gray-400">{message}</div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`flex-1 font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg cursor-pointer ${currentType.confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
