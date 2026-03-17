"use client";

import { useAuth } from "./components/AuthProvider";
import { useNotifications } from "./components/NotificationContext";
import {
  NotificationButton,
  NotificationPanel,
} from "./components/Notifications";
import { useNotificationCreator } from "./hooks/useNotificationCreator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DashboardSkeleton } from "./components/SkeletonLoader";

export default function RootPage() {
  const { user, loading } = useAuth();
  const { loading: notificationsLoading } = useNotifications();
  const { paymentSuccess, withdrawalRequested, smartWelcome } =
    useNotificationCreator();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWithdrawalInfo, setShowWithdrawalInfo] = useState(false);

  const handleDeposit = async () => {
    try {
      // Create real notification in database
      await paymentSuccess("500");
      // TODO: Navigate to deposit page or open deposit modal
    } catch (error) {
      console.error("Error creating deposit notification:", error);
    }
  };

  const handleWithdraw = async () => {
    try {
      // Create real notification in database
      await withdrawalRequested("200");
      // TODO: Navigate to withdrawal page or open withdrawal modal
    } catch (error) {
      console.error("Error creating withdrawal notification:", error);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Create smart welcome notification based on user status and login patterns
        // We need to get the custom user ID first
        const createWelcomeNotification = async () => {
          try {
            // Get custom UID from user document or use email as fallback
            const { doc, getDoc } = await import("firebase/firestore");
            const { db } = await import("./Firebase/Config");
            const userDoc = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userDoc);

            let customUserId = user.email?.toLowerCase() || user.uid;
            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              customUserId = userData.accountId || userData.uid || customUserId;
            }

            console.log(
              "Creating welcome notification for custom user ID:",
              customUserId,
            );
            await smartWelcome();
          } catch (error: any) {
            console.error("Error creating smart welcome notification:", error);
          }
        };

        createWelcomeNotification();
      } else {
        // User is not authenticated, redirect to landing
        console.log("User not authenticated, redirecting to landing");
        router.replace("/landing");
      }
    }
  }, [user, loading, router, smartWelcome]);

  // Prevent body scroll when notifications are open
  useEffect(() => {
    if (showNotifications) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showNotifications]);

  if (loading || notificationsLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return null; // Will redirect
  }

  // Show dashboard for authenticated users
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 min-h-screen">
      {/* Top Blue Section */}
      <div className="px-2 pt-3 pb-8 rounded-b-3xl">
        {/* Logo and Notification */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <Image
              src="/icon.png"
              alt="Smart Invest GH"
              width={50}
              height={50}
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Smart Invest GH
            </span>
          </div>
          <NotificationButton
            onClick={() => setShowNotifications(!showNotifications)}
          />
        </div>

        {/* Account Balance */}
        <div className="bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white rounded-2xl p-6 mb-4 shadow-lg">
          <div className="mb-4">
            <p className="text-gray-900 dark:text-white text-sm mb-1">
              Account balance (GH₵)
            </p>
            <p className="text-2xl font-bold">123,456.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm mb-1">Withdrawable Amount (GH₵)</p>
            <button
              onClick={() => setShowWithdrawalInfo(!showWithdrawalInfo)}
              className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <p className="text-2xl font-semibold">5,000.00</p>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-5">
            <button
              onClick={handleDeposit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Deposit
            </button>
            <button
              onClick={handleWithdraw}
              className="flex-1 bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] border border-blue-200 cursor-pointer"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Middle Content */}
      <div className="p-2 space-y-6">
        {/* Highly Recommended Section */}
        <div>
          <div className="flex items-center mb-4">
            <svg
              className="w-5 h-5 text-yellow-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h3 className="font-semibold text-lg">Highly Recommended</h3>
          </div>

          {/* Yellow Telegram Section */}
          <div className="bg-yellow-400 rounded-2xl p-6 mb-4">
            <p className="text-gray-900 font-medium mb-2">
              Join Our Telegram Channel.
            </p>
            <p className="text-gray-700 mb-4">Click Here:</p>
            <Link
              href="https://t.me/smartinvestgh"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-block"
            >
              JOIN!
            </Link>
          </div>

          {/* White Note Box */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-gray-700 text-sm leading-relaxed">
              <span className="font-semibold">Note:</span> To place an order of
              investment, you first need to deposit the amount enough for the
              investment plan you choose, then proceed to placing an investment
              order.
            </p>
          </div>
        </div>

        {/* Platform Bonus Section */}
        <div>
          <div className="flex items-center mb-4">
            <svg
              className="w-5 h-5 text-blue-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <h3 className="dark:text-white text-gray-900 font-semibold text-lg">
              Platform Bonus
            </h3>
          </div>

          {/* Tabs */}
          <div className="flex mb-4">
            <button className="flex-1 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-700 font-medium py-3 px-4 rounded-l-xl border border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              Withdrawal Voucher
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-r-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              Cash Bonus
            </button>
          </div>

          {/* Bonus Entry */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">053****090</p>
                <p className="text-gray-500 text-xs">2023-09-17 09:40:08</p>
                <p className="text-gray-700 text-sm mt-1">
                  Received GH₵160 cash bonus with free code
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Info Popup */}
      {showWithdrawalInfo && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowWithdrawalInfo(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-80 max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Withdrawal Limits
                </h3>
                <button
                  onClick={() => setShowWithdrawalInfo(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">
                    Minimum Withdrawal
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    GH₵ 20
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    Maximum Withdrawal
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    GH₵ 5,000
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Withdrawal requests are processed within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}
