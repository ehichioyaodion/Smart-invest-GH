"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { useAuth } from "./AuthProvider";
import {
  subscribeToNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
  getInitialNotifications,
} from "../services/notificationService";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  removeNotification: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to real-time notifications when user is authenticated
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Get custom UID from user document or use email as fallback
    const getCustomUserId = async () => {
      try {
        // Try to get the custom UID from user document
        const { doc, getDoc } = await import("firebase/firestore");
        const { db } = await import("../Firebase/Config");
        const userDoc = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          return (
            userData.accountId ||
            userData.uid ||
            user.email?.toLowerCase() ||
            user.uid
          );
        }

        // Fallback to email or Firebase UID
        return user.email?.toLowerCase() || user.uid;
      } catch (error) {
        console.error("Error getting custom user ID:", error);
        return user.email?.toLowerCase() || user.uid;
      }
    };

    // Get initial notifications
    const loadInitialNotifications = async () => {
      try {
        const customUserId = await getCustomUserId();
        console.log("Loading notifications for custom user ID:", customUserId);
        const initialNotifications =
          await getInitialNotifications(customUserId);
        setNotifications(initialNotifications);
      } catch (error) {
        console.error("Error loading initial notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialNotifications();

    // Subscribe to real-time updates
    const subscribeToRealTimeNotifications = async () => {
      try {
        const customUserId = await getCustomUserId();
        console.log(
          "Subscribing to notifications for custom user ID:",
          customUserId,
        );

        const unsubscribe = subscribeToNotifications(
          customUserId,
          (updatedNotifications) => {
            setNotifications(updatedNotifications);
          },
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error setting up real-time notifications:", error);
        return () => {};
      }
    };

    let unsubscribe: (() => void) | undefined;

    subscribeToRealTimeNotifications().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await markNotificationAsRead(id);
      // The real-time listener will update the state
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    try {
      // Get custom UID from user document or use email as fallback
      const { doc, getDoc } = await import("firebase/firestore");
      const { db } = await import("../Firebase/Config");
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      let customUserId = user.email?.toLowerCase() || user.uid;
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        customUserId = userData.accountId || userData.uid || customUserId;
      }

      await markAllNotificationsAsRead(customUserId);
      // The real-time listener will update the state
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  }, [user]);

  const removeNotification = useCallback(async (id: string) => {
    try {
      await deleteNotification(id);
      // The real-time listener will update the state
    } catch (error) {
      console.error("Error removing notification:", error);
    }
  }, []);

  const clearAll = useCallback(async () => {
    if (!user) return;

    try {
      // Get custom UID from user document or use email as fallback
      const { doc, getDoc } = await import("firebase/firestore");
      const { db } = await import("../Firebase/Config");
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      let customUserId = user.email?.toLowerCase() || user.uid;
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        customUserId = userData.accountId || userData.uid || customUserId;
      }

      await clearAllNotifications(customUserId);
      // The real-time listener will update the state
    } catch (error) {
      console.error("Error clearing all notifications:", error);
    }
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}

// Helper function to get notification icon and colors
export function getNotificationStyles(type: NotificationType) {
  switch (type) {
    case "success":
      return {
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-800",
        iconBg: "bg-green-600",
        icon: (
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ),
      };
    case "error":
      return {
        bg: "bg-red-50 dark:bg-red-900/20",
        border: "border-red-200 dark:border-red-800",
        iconBg: "bg-red-600",
        icon: (
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        ),
      };
    case "warning":
      return {
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        border: "border-yellow-200 dark:border-yellow-800",
        iconBg: "bg-yellow-600",
        icon: (
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clipRule="evenodd"
            />
          </svg>
        ),
      };
    default: // info
      return {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-800",
        iconBg: "bg-blue-600",
        icon: (
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        ),
      };
  }
}
