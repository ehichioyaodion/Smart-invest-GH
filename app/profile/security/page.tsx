"use client";

import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ConfirmModal } from "../../components/ConfirmModal";
import { CardSkeleton } from "../../components/SkeletonLoader";

function SecurityContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    // Password change logic here
    console.log("Changing password");
    setShowChangePasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    // Account deletion logic here
    console.log("Deleting account");
    setShowDeleteAccountModal(false);
    router.push("/landing");
  };

  return (
    <div className="w-full max-w-md flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-3 w-full">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors mr-3"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Password & Security
          </h1>
        </div>

        {/* Security Options */}
        <div className="space-y-4">
          <button
            onClick={() => setShowChangePasswordModal(true)}
            className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">🔒</span>
              <div className="text-left">
                <span className="text-gray-900 dark:text-white font-medium block">
                  Change Password
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Update your account password
                </span>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📱</span>
              <div className="text-left">
                <span className="text-gray-900 dark:text-white font-medium block">
                  Two-Factor Authentication
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security
                </span>
              </div>
            </div>
            <span className="text-sm bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
              Enabled
            </span>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <span className="text-xl">🔐</span>
              <div className="text-left">
                <span className="text-gray-900 dark:text-white font-medium block">
                  Login Activity
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  View recent login attempts
                </span>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button
            onClick={() => setShowDeleteAccountModal(true)}
            className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">🗑️</span>
              <div className="text-left">
                <span className="text-red-600 dark:text-red-400 font-medium block">
                  Delete Account
                </span>
                <span className="text-sm text-red-500 dark:text-red-400">
                  Permanently remove your account
                </span>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Change Password Modal */}
        <ConfirmModal
          isOpen={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
          onConfirm={handleChangePassword}
          title="Change Password"
          message={
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          }
          confirmText="Change Password"
          cancelText="Cancel"
          type="info"
        />

        {/* Delete Account Modal */}
        <ConfirmModal
          isOpen={showDeleteAccountModal}
          onClose={() => setShowDeleteAccountModal(false)}
          onConfirm={handleDeleteAccount}
          title="Delete Account"
          message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
          confirmText="Delete Account"
          cancelText="Cancel"
          type="danger"
        />
      </div>
    </div>
  );
}

export default function Security() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/landing");
    }
  }, [user, loading, router]);

  if (loading) {
    return <CardSkeleton />;
  }

  if (!user) {
    return null;
  }

  return <SecurityContent />;
}
