"use client";

import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardSkeleton } from "../../components/SkeletonLoader";

function ThemeContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedAccent, setSelectedAccent] = useState("blue");

  const themes = [
    {
      id: "light",
      name: "Light",
      description: "Clean and bright interface",
      preview: "bg-white border-gray-200",
    },
    {
      id: "dark",
      name: "Dark",
      description: "Easy on the eyes in low light",
      preview: "bg-gray-900 border-gray-700",
    },
    {
      id: "auto",
      name: "Auto",
      description: "Follows system settings",
      preview: "bg-gradient-to-r from-white to-gray-900 border-gray-400",
    },
  ];

  const accentColors = [
    { id: "blue", name: "Blue", color: "bg-blue-600" },
    { id: "green", name: "Green", color: "bg-green-600" },
    { id: "purple", name: "Purple", color: "bg-purple-600" },
    { id: "red", name: "Red", color: "bg-red-600" },
    { id: "orange", name: "Orange", color: "bg-orange-600" },
    { id: "pink", name: "Pink", color: "bg-pink-600" },
  ];

  const handleSave = () => {
    console.log("Saving theme preferences:", { selectedTheme, selectedAccent });
    alert("Theme preferences saved successfully!");
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex items-center justify-center p-4">
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
            Theme & Appearance
          </h1>
        </div>

        {/* Theme Selection */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Theme
            </h3>
            <div className="space-y-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`w-full p-4 rounded-lg border transition-all duration-200 ${
                    selectedTheme === theme.id
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-lg border-2 ${theme.preview}`}
                    ></div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white font-medium">
                          {theme.name}
                        </span>
                        {selectedTheme === theme.id && (
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {theme.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Accent Color
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {accentColors.map((accent) => (
                <button
                  key={accent.id}
                  onClick={() => setSelectedAccent(accent.id)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    selectedAccent === accent.id
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className={`w-8 h-8 rounded-full ${accent.color}`}
                    ></div>
                    <span className="text-sm text-gray-900 dark:text-white font-medium">
                      {accent.name}
                    </span>
                    {selectedAccent === accent.id && (
                      <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-2 h-2 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Display Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Reduce motion
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Minimize animations and transitions
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    High contrast
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Increase contrast for better visibility
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Compact view
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Show more content with less spacing
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
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

export default function Theme() {
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

  return <ThemeContent />;
}
