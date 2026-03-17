import Link from "next/link";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="mb-5">
        <div className="flex justify-center">
          <Image
            src="/icon.png"
            alt="Smart Invest GH Logo"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Smart Invest GH
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Your trusted financial partner for smart investments
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Welcome to Your Financial Future
        </h2>

        <div className="space-y-4 text-left mb-8">
          <div className="flex items-start space-x-3">
            <div className="shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Track your investments in real-time
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Get personalized investment recommendations
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Secure and encrypted financial data
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/sign-up"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 text-center"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="block w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200 text-center"
          >
            Log in
          </Link>
        </div>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        By signing up, you agree to our{" "}
        <Link
          href="/terms"
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
