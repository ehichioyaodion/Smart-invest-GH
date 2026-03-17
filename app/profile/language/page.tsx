"use client";

import { useAuth } from "../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardSkeleton } from "../../components/SkeletonLoader";

function LanguageContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedRegion, setSelectedRegion] = useState("US");

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  const regions = [
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "IN", name: "India" },
    { code: "NG", name: "Nigeria" },
    { code: "KE", name: "Kenya" },
    { code: "GH", name: "Ghana" },
  ];

  const handleSave = () => {
    console.log("Saving language preferences:", {
      selectedLanguage,
      selectedRegion,
    });
    alert("Language preferences saved successfully!");
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
            Language & Region
          </h1>
        </div>

        {/* Language Selection */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Language
            </h3>
            <div className="space-y-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => setSelectedLanguage(language.code)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                    selectedLanguage === language.code
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{language.flag}</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {language.name}
                    </span>
                  </div>
                  {selectedLanguage === language.code && (
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
                </button>
              ))}
            </div>
          </div>

          {/* Region Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Region
            </h3>
            <div className="space-y-2">
              {regions.map((region) => (
                <button
                  key={region.code}
                  onClick={() => setSelectedRegion(region.code)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                    selectedRegion === region.code
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-gray-900 dark:text-white font-medium">
                    {region.name}
                  </span>
                  {selectedRegion === region.code && (
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
                </button>
              ))}
            </div>
          </div>

          {/* Additional Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Additional Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Auto-detect language
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automatically detect browser language
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    Translate content
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Translate app content to selected language
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
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

export default function Language() {
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

  return <LanguageContent />;
}
