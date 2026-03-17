"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
import { CardSkeleton } from "../../components/SkeletonLoader";

export default function Manage_Profile() {
  const { user } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    bio: "",
    location: "",
    website: "",
    birthDate: "",
    gender: "",
    interests: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          profilePicture: "Image size must be less than 5MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = "Please enter a valid website URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Saving profile data:", formData);
      setHasChanges(false);

      // Show success message (you could replace this with a toast)
      alert("Profile updated successfully!");

      // Navigate back to profile page
      router.push("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (
        confirm("You have unsaved changes. Are you sure you want to leave?")
      ) {
        router.push("/profile");
      }
    } else {
      router.push("/profile");
    }
  };

  const handleInterestToggle = (interest: string) => {
    const currentInterests = formData.interests;
    if (currentInterests.includes(interest)) {
      handleInputChange(
        "interests",
        currentInterests.filter((i) => i !== interest),
      );
    } else {
      handleInputChange("interests", [...currentInterests, interest]);
    }
  };

  const interests = [
    "Technology",
    "Finance",
    "Investing",
    "Business",
    "Marketing",
    "Design",
    "Development",
    "Analytics",
    "Strategy",
    "Innovation",
  ];

  if (!user) {
    return <CardSkeleton />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCancel}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition-all duration-200"
              disabled={isLoading}
            >
              <svg
                className="w-6 h-6"
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
            <h1 className="text-2xl font-bold">Edit Profile</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={!hasChanges || isLoading}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              hasChanges && !isLoading
                ? "bg-white text-blue-600 hover:bg-blue-50"
                : "bg-white/20 text-white/50 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white/30 rounded-sm animate-pulse"></div>
                <span>Saving...</span>
              </span>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-xl">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl text-white font-bold">
                  {formData.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-all duration-200 shadow-lg group-hover:scale-110"
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
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click to change profile picture
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              JPG, PNG or GIF (Max 5MB)
            </p>
          </div>
          {errors.profilePicture && (
            <p className="text-red-500 text-sm">{errors.profilePicture}</p>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                  errors.website ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://yourwebsite.com"
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">{errors.website}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Birth Date
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {formData.bio.length}/500 characters
            </p>
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Interests
          </h2>

          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  formData.interests.includes(interest)
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
