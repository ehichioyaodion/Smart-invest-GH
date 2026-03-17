"use client";

import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardSkeleton } from "../../components/SkeletonLoader";

function NotificationsContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    securityAlerts: true,
    accountUpdates: true,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log("Saving notification preferences:", notifications);
    alert("Notification preferences saved successfully!");
  };

  return (
    <div className="w-full max-w-md mx-auto flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full">
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
            Notifications
          </h1>
        </div>

        {/* Notification Settings */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Communication Preferences
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Email Notifications
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates via email
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("emailNotifications")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.emailNotifications
                      ? "bg-blue-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.emailNotifications
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Push Notifications
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive push notifications on your device
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("pushNotifications")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.pushNotifications
                      ? "bg-blue-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.pushNotifications
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    SMS Notifications
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive text messages
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("smsNotifications")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.smsNotifications
                      ? "bg-blue-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.smsNotifications
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Notification Types
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Security Alerts
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Important security notifications
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("securityAlerts")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.securityAlerts
                      ? "bg-blue-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.securityAlerts
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Account Updates
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Updates about your account activity
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("accountUpdates")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.accountUpdates
                      ? "bg-blue-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.accountUpdates
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Marketing Emails
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Promotional content and offers
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("marketingEmails")}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.marketingEmails
                      ? "bg-blue-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.marketingEmails
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Notifications() {
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

  return <NotificationsContent />;
}
