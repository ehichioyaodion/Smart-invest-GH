"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { auth } from "@/app/Firebase/Config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "@/app/Firebase/Config";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    referralCode: "guest",
    accountId: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Real function to check if account ID is already taken in Firebase
  const isAccountIdTaken = async (accountId: string): Promise<boolean> => {
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("accountId", "==", accountId.toLowerCase()),
      );
      const querySnapshot = await getDocs(q);

      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking account ID availability:", error);
      // If there's an error, we'll assume it's not taken to allow registration
      return false;
    }
  };

  const validateForm = async () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.accountId.trim()) {
      newErrors.accountId = "Account ID is required";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.accountId)) {
      newErrors.accountId =
        "Only letters, numbers, and underscores without spaces are allowed";
    } else if (formData.accountId.length < 3) {
      newErrors.accountId = "Account ID must be at least 3 characters";
    } else {
      // Check if account ID is already taken
      const isTaken = await isAccountIdTaken(formData.accountId);
      if (isTaken) {
        newErrors.accountId = "This Account ID is already taken";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    setIsLoading(true);
    setErrors({});

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // Save user data to Firestore
      const userDocRef = doc(db, "users", formData.accountId.toLowerCase());
      await setDoc(userDocRef, {
        uid: formData.accountId.toLowerCase(),
        firebaseUid: userCredential.user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        accountId: formData.accountId.toLowerCase(),
        referralCode: formData.referralCode || "guest",
        createdAt: new Date().toISOString(),
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      router.push("/");
    } catch (error: any) {
      let errorMessage = "An error occurred during registration";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error! Check connection & try again";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }

      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "referralCode" && value === ""
            ? "guest"
            : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center">
          <Image
            src="/icon.png"
            alt="Smart Invest GH Logo"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create Account
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Join Smart Invest GH and start your financial journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            {errors.general}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="john.doe@example.com"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                errors.firstName
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="John"
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                errors.lastName
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              placeholder="Doe"
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="accountId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Account ID
          </label>
          <input
            type="text"
            id="accountId"
            name="accountId"
            value={formData.accountId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
              errors.accountId
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Enter account ID"
            disabled={isLoading}
          />
          {errors.accountId && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.accountId}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Create a unique ID for your account (e.g., john_doe_123)
          </p>
        </div>

        <div>
          <label
            htmlFor="referralCode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Referral Code (Optional)
          </label>
          <input
            type="text"
            id="referralCode"
            name="referralCode"
            value={
              formData.referralCode === "guest" ? "" : formData.referralCode
            }
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
              errors.referralCode
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Enter referral code (optional)"
            disabled={isLoading}
          />
          {errors.referralCode && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.referralCode}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
              errors.password
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.password}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Must contain uppercase, lowercase, and number (min. 8 characters)
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
              errors.confirmPassword
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-start">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className={`mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 ${
                errors.agreeToTerms ? "border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-2 text-sm text-gray-600 dark:text-gray-400"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="w-5 h-5 bg-white/30 rounded-sm animate-pulse mr-3"></div>
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
