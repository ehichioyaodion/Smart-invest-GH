"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className = "", children }: SkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 dark:bg-gray-700 rounded h-full w-full">
        {children}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 min-h-screen">
      {/* Top Blue Section Skeleton */}
      <div className="px-2 pt-3 pb-8 rounded-b-3xl">
        <div className="flex flex-col items-center mb-2 relative">
          <Skeleton className="w-10 h-10 rounded-full absolute top-0 right-0" />
          <Skeleton className="w-32 h-32 rounded-2xl mb-4" />
        </div>
        
        {/* Account Balance Skeleton */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-4 shadow-lg space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-8 w-1/2" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="w-5 h-5 rounded" />
          </div>
          <Skeleton className="h-7 w-2/5" />
          <div className="flex space-x-2">
            <Skeleton className="flex-1 h-12 rounded-xl" />
            <Skeleton className="flex-1 h-12 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Middle Content Skeleton */}
      <div className="p-2 space-y-6">
        {/* Highly Recommended Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-5 w-40" />
          </div>
          
          {/* Yellow Telegram Section */}
          <Skeleton className="bg-yellow-400 rounded-2xl p-6 h-32" />
          
          {/* White Note Box */}
          <Skeleton className="bg-white rounded-xl p-4 h-20 border border-gray-200" />
        </div>

        {/* Platform Bonus Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-5 w-32" />
          </div>
          
          {/* Tabs */}
          <div className="flex">
            <Skeleton className="flex-1 h-10 rounded-l-lg border border-gray-200" />
            <Skeleton className="flex-1 h-10 rounded-r-lg" />
          </div>
          
          {/* Bonus Entry */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-start space-x-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 w-full space-y-6">
        {/* Profile Header */}
        <div className="flex items-center mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-2 shadow-lg">
          <Skeleton className="w-20 h-20 rounded-full mr-4" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        {/* Member Since */}
        <div className="flex items-center justify-between py-1 border-t border-gray-200 dark:border-gray-700">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {[...Array(3)].map((_, categoryIndex) => (
            <div key={categoryIndex} className="space-y-3">
              <Skeleton className="h-5 w-32" />
              {[...Array(3)].map((_, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-6 h-6 rounded" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Sign Out Button */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Skeleton className="w-full h-8 rounded" />
        </div>
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full space-y-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Skeleton className="w-8 h-8 rounded-full mr-3" />
          <Skeleton className="h-6 w-48" />
        </div>

        {/* App Logo and Info */}
        <div className="text-center mb-8 space-y-3">
          <Skeleton className="w-20 h-20 rounded-2xl mx-auto" />
          <Skeleton className="h-8 w-40 mx-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-3 w-48 mx-auto" />
        </div>

        {/* About Content */}
        <div className="space-y-6">
          {/* Mission */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-28" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Skeleton className="w-4 h-4 rounded mt-1" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-36" />
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Skeleton className="w-6 h-6 rounded" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-16" />
            <div className="space-y-2">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="w-5 h-5 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ListSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {[...Array(items)].map((_, index) => (
        <div key={index} className="flex items-center space-x-3 p-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
