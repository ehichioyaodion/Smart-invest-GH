"use client";

import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CardSkeleton } from "../components/SkeletonLoader";

function CapitalContent() {
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
            Capital Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your investment capital
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Capital
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              GH₵25,000
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Available for investment
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                Invested
              </h4>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                GH₵18,500
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-1">
                Returns
              </h4>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                GH₵2,340
              </p>
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg cursor-pointer">
            Add Capital
          </button>
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

export default function Capital() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      console.log(
        "Capital page: User not authenticated, redirecting to landing",
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

  return <CapitalContent />;
}
