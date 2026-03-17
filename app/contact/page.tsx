"use client";

import { useAuth } from "../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardSkeleton } from "../components/SkeletonLoader";
import Link from "next/link";

function ContactContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "account", label: "Account Issues" },
    { value: "investment", label: "Investment Help" },
    { value: "feedback", label: "Feedback" },
    { value: "complaint", label: "Complaint" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Contact form submission:", formData);
      alert(
        "Your message has been sent successfully! We'll respond within 24 hours.",
      );

      // Reset form
      setFormData({
        name: user?.displayName || "",
        email: user?.email || "",
        subject: "",
        message: "",
        category: "general",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            Contact Us
          </h1>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
            Get in Touch
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📧</span>
              <span className="text-sm text-blue-800 dark:text-blue-200">
                support@smartinvestgh.com
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl">📱</span>
              <span className="text-sm text-blue-800 dark:text-blue-200">
                +233 30 123 4567
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl">📍</span>
              <span className="text-sm text-blue-800 dark:text-blue-200">
                Accra, Ghana
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              required
              placeholder="Brief description of your inquiry"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
              rows={4}
              placeholder="Please provide detailed information about your inquiry..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Alternative Contact Methods */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">
            Other Ways to Reach Us
          </h3>
          <div className="space-y-3">
            <Link
              href="https://tawk.to/chat/698ed0bdf896941c36b62461/1jhatupnh"
              target="_blank"
              className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">💬</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  Live Chat
                </span>
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">
                Online
              </span>
            </Link>

            <button className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📱</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  WhatsApp
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                +233 24 123 4567
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
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

  return <ContactContent />;
}
