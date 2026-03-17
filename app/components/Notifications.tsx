"use client";

import {
  useNotifications,
  getNotificationStyles,
  Notification,
} from "./NotificationContext";
import { formatDistanceToNow } from "date-fns";

export function NotificationButton({ onClick }: { onClick: () => void }) {
  const { notifications, unreadCount } = useNotifications();

  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md cursor-pointer"
    >
      <svg
        className="w-6 h-6 text-gray-900 dark:text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}

export function NotificationPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { notifications, markAsRead, markAllAsRead, removeNotification } =
    useNotifications();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-end pt-20 pr-6"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-80 max-h-96 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
            </h3>
            <div className="flex items-center space-x-2">
              {notifications.some((n) => !n.read) && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">
                No notifications yet
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={() => markAsRead(notification.id)}
                onRemove={() => removeNotification(notification.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationItem({
  notification,
  onMarkRead,
  onRemove,
}: {
  notification: Notification;
  onMarkRead: () => Promise<void>;
  onRemove: () => Promise<void>;
}) {
  const styles = getNotificationStyles(notification.type);
  const timeAgo = formatDistanceToNow(notification.timestamp, {
    addSuffix: true,
  });

  return (
    <div
      className={`${styles.bg} rounded-lg p-4 border ${styles.border} ${
        !notification.read ? "border-l-4 border-l-blue-500" : ""
      } transition-all duration-200`}
    >
      <div className="flex items-start space-x-3">
        <div
          className={`w-8 h-8 ${styles.iconBg} rounded-full flex items-center justify-center shrink-0`}
        >
          {styles.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {notification.title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                {timeAgo}
              </p>
              {notification.actionUrl && (
                <button
                  onClick={() => {
                    // Handle navigation to action URL
                    if (notification.actionUrl) {
                      window.location.href = notification.actionUrl;
                    }
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium mt-2"
                >
                  {notification.actionText || "View Details"}
                </button>
              )}
            </div>
            <div className="flex items-center space-x-1 ml-2">
              {!notification.read && (
                <button
                  onClick={onMarkRead}
                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  title="Mark as read"
                >
                  <svg
                    className="w-3 h-3 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={onRemove}
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Remove notification"
              >
                <svg
                  className="w-3 h-3 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
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
