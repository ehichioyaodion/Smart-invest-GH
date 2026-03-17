"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "./AuthProvider";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Don't show bottom nav on auth pages or landing
  if (
    !user ||
    pathname === "/landing" ||
    pathname === "/login" ||
    pathname === "/sign-up"
  ) {
    return null;
  }

  const navItems: NavItem[] = [
    {
      name: "Home",
      href: "/",
      icon: (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "Capital",
      href: "/capital",
      icon: (
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "Members",
      href: "/members",
      icon: (
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      name: "Me",
      href: "/profile",
      icon: (
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-3xl mx-auto">
        <nav className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/profile"
                ? pathname.startsWith("/profile")
                : pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl transition-all duration-200 min-w-16 transform hover:scale-[1.05] active:scale-[0.95] cursor-pointer ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
