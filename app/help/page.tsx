"use client";

import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardSkeleton } from "../components/SkeletonLoader";

function HelpContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const helpCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: "🚀",
      articles: [
        {
          id: "account-setup",
          title: "Account Setup",
          content:
            "Learn how to create and configure your Smart Invest GH account.",
        },
        {
          id: "first-investment",
          title: "Making Your First Investment",
          content:
            "Step-by-step guide to making your first investment on our platform.",
        },
        {
          id: "verification",
          title: "Account Verification",
          content: "Complete the verification process to unlock all features.",
        },
      ],
    },
    {
      id: "investing",
      title: "Investing",
      icon: "💰",
      articles: [
        {
          id: "investment-types",
          title: "Types of Investments",
          content:
            "Explore different investment options available on Smart Invest GH.",
        },
        {
          id: "risk-management",
          title: "Risk Management",
          content: "Understanding and managing investment risks.",
        },
        {
          id: "portfolio",
          title: "Managing Your Portfolio",
          content: "Track and manage your investment portfolio effectively.",
        },
      ],
    },
    {
      id: "account",
      title: "Account Management",
      icon: "⚙️",
      articles: [
        {
          id: "profile-settings",
          title: "Profile Settings",
          content: "Customize your profile and personal information.",
        },
        {
          id: "security",
          title: "Security Features",
          content: "Keep your account secure with our security features.",
        },
        {
          id: "notifications",
          title: "Notification Preferences",
          content: "Manage how and when you receive notifications.",
        },
      ],
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: "🔧",
      articles: [
        {
          id: "troubleshooting",
          title: "Common Issues",
          content: "Solutions to common technical problems.",
        },
        {
          id: "mobile-app",
          title: "Mobile App Issues",
          content: "Troubleshoot problems with the mobile application.",
        },
        {
          id: "browser-compatibility",
          title: "Browser Compatibility",
          content: "Ensure the best experience with supported browsers.",
        },
      ],
    },
  ];

  const filteredCategories = helpCategories
    .map((category) => ({
      ...category,
      articles: category.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.articles.length > 0);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
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
            Help Center
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
            <svg
              className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="flex items-center justify-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <span className="text-xl">💬</span>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              Live Chat
            </span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <span className="text-xl">📧</span>
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              Email Support
            </span>
          </button>
        </div>

        {/* Help Categories */}
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{category.icon}</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {category.title}
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transform transition-transform ${
                    expandedCategory === category.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expandedCategory === category.id && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  {category.articles.map((article) => (
                    <button
                      key={article.id}
                      className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <h4 className="text-gray-900 dark:text-white font-medium mb-1">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {article.content}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Still need help?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Our support team is available 24/7 to assist you.
          </p>
          <button
            onClick={() => router.push("/contact")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Help() {
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

  return <HelpContent />;
}
