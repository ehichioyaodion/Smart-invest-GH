"use client";

import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CardSkeleton } from "../components/SkeletonLoader";

function MembersContent() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/landing");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Team Members
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your investment team
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Active Members
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              12
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              3 pending Activation
            </p>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg cursor-pointer">
            Invite Member
          </button>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    John Doe
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Admin
                  </p>
                </div>
              </div>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  SA
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Sarah Adams
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Member
                  </p>
                </div>
              </div>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                  MJ
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Mike Johnson
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Member
                  </p>
                </div>
              </div>
              <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full">
                Pending
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Account
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Members() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      console.log(
        "Members page: User not authenticated, redirecting to landing",
      );
      router.replace("/landing");
    }
  }, [user, loading, router]);

  if (loading) {
    return <CardSkeleton />;
  }

  if (!user) {
    return null;
  }

  return <MembersContent />;
}
