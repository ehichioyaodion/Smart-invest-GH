"use client";

import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ConfirmModal } from "../components/ConfirmModal";
import { ProfileSkeleton } from "../components/SkeletonLoader";

function ProfileContent() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "User",
    email: user?.email || "",
    phone: "+233 24 123 4567",
    bio: "Digital creator and designer",
  });

  const handleManageProfile = () => {
    router.push("/profile/manage-profile");
  };

  const handlePasswordSecurity = () => {
    router.push("/profile/security");
  };

  const handleNotifications = () => {
    router.push("/profile/notifications");
  };

  const handleLanguage = () => {
    router.push("/profile/language");
  };

  const handleAboutUs = () => {
    router.push("/about");
  };

  const handleTheme = () => {
    router.push("/profile/theme");
  };

  const handleHelpCenter = () => {
    router.push("/help");
  };

  const handleContactUs = () => {
    router.push("/contact");
  };

  const menuCategories = [
    {
      title: "Account",
      items: [
        {
          icon: "👤",
          label: "Manage Profile",
          action: handleManageProfile,
        },
        {
          icon: "🔒",
          label: "Password & Security",
          action: handlePasswordSecurity,
        },
        {
          icon: "🔔",
          label: "Notifications",
          action: handleNotifications,
        },
        {
          icon: "🌐",
          label: "Language",
          value: "English",
          action: handleLanguage,
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: "ℹ️",
          label: "About Us",
          action: handleAboutUs,
        },
        {
          icon: "🎨",
          label: "Theme",
          value: "Light",
          action: handleTheme,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: "❓",
          label: "Help Center",
          action: handleHelpCenter,
        },
        {
          icon: "📞",
          label: "Contact Us",
          action: handleContactUs,
        },
      ],
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/landing");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    handleLogout();
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 w-full">
        <div className="flex items-center mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-2 shadow-lg">
          <div className="mr-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.displayName
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() ||
                user?.email?.[0]?.toUpperCase() ||
                "U"}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {user?.displayName || "User"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center justify-between py-1 border-t mb-6 border-gray-200 dark:border-gray-700">
          <span className="text-gray-600 text-sm dark:text-gray-400">
            Member Since
          </span>
          <span className="font-semibold text-sm text-gray-900 dark:text-white">
            {user?.metadata?.creationTime
              ? new Date(user.metadata.creationTime)
                  .toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/,/g, "")
              : "Recent"}
          </span>
        </div>

        <div className="space-y-6">
          {/* Menu Categories */}
          <div className="space-y-6">
            {menuCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {category.title}
                </h3>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.value && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {item.value}
                          </span>
                        )}
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
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] border border-red-200 dark:border-red-800 shadow-sm hover:shadow-md cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Sign Out"
        message="Are you sure you want to sign out of your Smart Invest GH account?"
        confirmText="Sign Out"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      console.log(
        "Profile page: User not authenticated, redirecting to landing",
      );
      router.replace("/landing");
    }
  }, [user, loading, router]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return null;
  }

  return <ProfileContent />;
}
