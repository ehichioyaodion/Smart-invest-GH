"use client";

import { useAuth } from "../components/AuthProvider";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AboutSkeleton } from "../components/SkeletonLoader";

function AboutContent() {
  const { user } = useAuth();
  const router = useRouter();

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
            About Smart Invest GH
          </h1>
        </div>

        {/* App Logo and Info */}
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Image
              src="/icon.png"
              alt="Smart Invest GH Logo"
              width={100}
              height={100}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Smart Invest GH
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">Version 1.0.0</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 Smart Invest Ghana. All rights reserved.
          </p>
        </div>

        {/* About Content */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Smart Invest GH is dedicated to making investment opportunities
              accessible to everyone in Ghana. We provide a user-friendly
              platform that helps both beginners and experienced investors make
              informed financial decisions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Key Features
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-600 dark:text-gray-400">
                  Real-time market data and analytics
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-600 dark:text-gray-400">
                  Personalized investment recommendations
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-600 dark:text-gray-400">
                  Secure portfolio management
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-600 dark:text-gray-400">
                  Educational resources and insights
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📧</span>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    support@smartinvestgh.com
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📱</span>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    +233 30 123 4567
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Office
                  </p>
                  <p className="text-gray-900 dark:text-white">Accra, Ghana</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Legal
            </h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="text-gray-900 dark:text-white">
                  Terms of Service
                </span>
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
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="text-gray-900 dark:text-white">
                  Privacy Policy
                </span>
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
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="text-gray-900 dark:text-white">Licenses</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/landing");
    }
  }, [user, loading, router]);

  if (loading) {
    return <AboutSkeleton />;
  }

  if (!user) {
    return null;
  }

  return <AboutContent />;
}
