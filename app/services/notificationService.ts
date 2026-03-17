import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  getDocs,
  writeBatch,
  limit,
  getDoc,
} from "firebase/firestore";
import { db } from "../Firebase/Config";
import {
  Notification,
  NotificationType,
} from "../components/NotificationContext";

const NOTIFICATIONS_COLLECTION = "notifications";

export interface DatabaseNotification extends Omit<Notification, "timestamp"> {
  timestamp: Timestamp;
  userId: string;
}

// Convert database notification to app notification
const convertToAppNotification = (doc: any): Notification => {
  const data = doc.data() as DatabaseNotification;
  return {
    id: doc.id,
    type: data.type,
    title: data.title,
    message: data.message,
    timestamp: data.timestamp.toDate(),
    read: data.read,
    actionUrl: data.actionUrl,
    actionText: data.actionText,
  };
};

// Create a new notification for a user
export const createNotification = async (
  userId: string,
  notification: Omit<Notification, "id" | "timestamp" | "read">,
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, NOTIFICATIONS_COLLECTION), {
      ...notification,
      userId,
      timestamp: Timestamp.now(),
      read: false,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

// Check if user is new (first time login)
export const isNewUser = async (userId: string): Promise<boolean> => {
  try {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where("userId", "==", userId.toLowerCase()),
      where("type", "==", "info"),
      where("title", "==", "Welcome to Smart Invest GH! 🎉"),
      limit(1),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // If empty, user is new
  } catch (error) {
    console.error("Error checking if user is new:", error);
    return false; // Assume returning user on error
  }
};

// Get last login time from user document
export const getLastLoginTime = async (
  userId: string,
): Promise<Date | null> => {
  try {
    const userDoc = doc(db, "users", userId.toLowerCase());
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const data = userSnapshot.data();
      return data.lastLogin?.toDate() || null;
    }
    return null;
  } catch (error) {
    console.error("Error getting last login time:", error);
    return null;
  }
};

// Update last login time
export const updateLastLogin = async (userId: string): Promise<void> => {
  try {
    const userDoc = doc(db, "users", userId.toLowerCase());
    await updateDoc(userDoc, {
      lastLogin: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating last login:", error);
  }
};

// Create welcome notification based on user status
export const createWelcomeNotification = async (
  userId: string,
): Promise<string> => {
  try {
    const isNew = await isNewUser(userId);

    if (isNew) {
      // First time user - comprehensive welcome
      const notificationId = await createNotification(userId.toLowerCase(), {
        type: "info",
        title: "Welcome to Smart Invest GH! 🎉",
        message:
          "Congratulations on joining! Start your investment journey by exploring our investment plans or making your first deposit.",
        actionUrl: "/invest",
        actionText: "Explore Plans",
      });

      // Follow-up tutorial notifications (delayed)
      setTimeout(async () => {
        try {
          await createNotification(userId.toLowerCase(), {
            type: "info",
            title: "Complete Your Profile",
            message:
              "Add your personal details to secure your account and unlock all features.",
            actionUrl: "/profile",
            actionText: "Update Profile",
          });
        } catch (error) {
          console.error("Error creating profile notification:", error);
        }
      }, 30000); // 30 seconds later

      setTimeout(async () => {
        try {
          await createNotification(userId.toLowerCase(), {
            type: "info",
            title: "Make Your First Deposit",
            message:
              "Ready to start investing? Make your first deposit to begin earning returns on our investment plans.",
            actionUrl: "/deposit",
            actionText: "Deposit Now",
          });
        } catch (error) {
          console.error("Error creating deposit notification:", error);
        }
      }, 60000); // 1 minute later

      return notificationId;
    } else {
      // Returning user - simple welcome back
      return await createNotification(userId.toLowerCase(), {
        type: "info",
        title: "Welcome Back! 👋",
        message:
          "Good to see you again. Check your portfolio for the latest updates on your investments.",
        actionUrl: "/portfolio",
        actionText: "View Portfolio",
      });
    }
  } catch (error) {
    console.error("Error creating welcome notification:", error);
    throw error;
  }
};

// Create smart welcome notification based on login patterns
export const createSmartWelcomeNotification = async (
  userId: string,
): Promise<string> => {
  try {
    const lastLogin = await getLastLoginTime(userId);
    const now = new Date();

    // Update current login time
    await updateLastLogin(userId);

    if (!lastLogin) {
      // First time login
      return await createWelcomeNotification(userId);
    } else {
      const hoursSinceLastLogin =
        (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLastLogin > 24) {
        // More than a day since last login
        const days = Math.floor(hoursSinceLastLogin / 24);
        const notificationId = await createNotification(userId.toLowerCase(), {
          type: "info",
          title: `Welcome Back! It's been ${days} day${days > 1 ? "s" : ""} 🌟`,
          message:
            "Great to have you back! Check out what's new and review your investment portfolio.",
          actionUrl: "/portfolio",
          actionText: "View Portfolio",
        });

        // If it's been more than 3 days, show what's new
        if (days >= 3) {
          setTimeout(async () => {
            try {
              await createNotification(userId.toLowerCase(), {
                type: "info",
                title: "What's New While You Were Away",
                message:
                  "New investment plans and features have been added. Explore the latest opportunities!",
                actionUrl: "/invest",
                actionText: "See What's New",
              });
            } catch (error) {
              console.error("Error creating what's new notification:", error);
            }
          }, 5000);
        }

        return notificationId;
      } else if (hoursSinceLastLogin > 1) {
        // More than an hour but less than a day
        return await createNotification(userId.toLowerCase(), {
          type: "info",
          title: "Welcome Back! 👋",
          message:
            "Good to see you again. Your investments are performing well.",
          actionUrl: "/portfolio",
          actionText: "View Portfolio",
        });
      }
      // Less than an hour - don't show notification (too frequent)
      return "";
    }
  } catch (error) {
    console.error("Error creating smart welcome notification:", error);
    throw error;
  }
};

// Mark notification as read
export const markNotificationAsRead = async (
  notificationId: string,
): Promise<void> => {
  try {
    await updateDoc(doc(db, NOTIFICATIONS_COLLECTION, notificationId), {
      read: true,
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

// Mark all notifications as read for a user
export const markAllNotificationsAsRead = async (
  userId: string,
): Promise<void> => {
  try {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where("userId", "==", userId),
      where("read", "==", false),
    );
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { read: true });
    });

    await batch.commit();
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};

// Delete a notification
export const deleteNotification = async (
  notificationId: string,
): Promise<void> => {
  try {
    await deleteDoc(doc(db, NOTIFICATIONS_COLLECTION, notificationId));
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

// Clear all notifications for a user
export const clearAllNotifications = async (userId: string): Promise<void> => {
  try {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where("userId", "==", userId),
    );
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error("Error clearing all notifications:", error);
    throw error;
  }
};

// Subscribe to real-time notifications for a user
export const subscribeToNotifications = (
  userId: string,
  callback: (notifications: Notification[]) => void,
) => {
  const q = query(
    collection(db, NOTIFICATIONS_COLLECTION),
    where("userId", "==", userId),
    orderBy("timestamp", "desc"),
  );

  return onSnapshot(
    q,
    (querySnapshot) => {
      const notifications = querySnapshot.docs.map(convertToAppNotification);
      callback(notifications);
    },
    (error) => {
      console.error("Error subscribing to notifications:", error);
    },
  );
};

// Get initial notifications for a user
export const getInitialNotifications = async (
  userId: string,
): Promise<Notification[]> => {
  try {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where("userId", "==", userId),
      orderBy("timestamp", "desc"),
      limit(50), // Limit to 50 most recent notifications
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(convertToAppNotification);
  } catch (error) {
    console.error("Error getting initial notifications:", error);
    return [];
  }
};

// System notification creators
export const systemNotifications = {
  paymentSuccess: async (
    userId: string,
    amount: string,
    currency: string = "GH₵",
  ) => {
    return createNotification(userId, {
      type: "success",
      title: "Payment Successful",
      message: `Your deposit of ${currency}${amount} has been processed successfully`,
      actionUrl: "/transactions",
      actionText: "View Transaction",
    });
  },

  paymentFailed: async (userId: string, error: string) => {
    return createNotification(userId, {
      type: "error",
      title: "Payment Failed",
      message: `Your payment could not be processed: ${error}`,
    });
  },

  withdrawalRequested: async (
    userId: string,
    amount: string,
    currency: string = "GH₵",
  ) => {
    return createNotification(userId, {
      type: "info",
      title: "Withdrawal Requested",
      message: `Your withdrawal of ${currency}${amount} is being processed`,
      actionUrl: "/transactions",
      actionText: "Track Status",
    });
  },

  withdrawalSuccess: async (
    userId: string,
    amount: string,
    currency: string = "GH₵",
  ) => {
    return createNotification(userId, {
      type: "success",
      title: "Withdrawal Successful",
      message: `${currency}${amount} has been sent to your account`,
      actionUrl: "/transactions",
      actionText: "View Details",
    });
  },

  investmentReceived: async (
    userId: string,
    planName: string,
    amount: string,
    currency: string = "GH₵",
  ) => {
    return createNotification(userId, {
      type: "success",
      title: "Investment Confirmed",
      message: `Your ${currency}${amount} investment in ${planName} is now active`,
      actionUrl: "/portfolio",
      actionText: "View Portfolio",
    });
  },

  investmentMatured: async (
    userId: string,
    planName: string,
    returns: string,
    currency: string = "GH₵",
  ) => {
    return createNotification(userId, {
      type: "success",
      title: "Investment Matured",
      message: `Your ${planName} investment has matured with ${currency}${returns} returns`,
      actionUrl: "/portfolio",
      actionText: "View Returns",
    });
  },

  bonusReceived: async (
    userId: string,
    amount: string,
    currency: string = "GH₵",
  ) => {
    return createNotification(userId, {
      type: "success",
      title: "Bonus Received",
      message: `You've received a cash bonus of ${currency}${amount}`,
      actionUrl: "/bonuses",
      actionText: "View Bonuses",
    });
  },

  newInvestmentOpportunity: async (
    userId: string,
    planName: string,
    returns: string,
  ) => {
    return createNotification(userId, {
      type: "info",
      title: "New Investment Opportunity",
      message: `Check out ${planName} with up to ${returns} returns`,
      actionUrl: "/invest",
      actionText: "Invest Now",
    });
  },

  accountUpdated: async (userId: string, field: string) => {
    return createNotification(userId, {
      type: "success",
      title: "Account Updated",
      message: `Your ${field} has been successfully updated`,
    });
  },

  securityAlert: async (userId: string, activity: string) => {
    return createNotification(userId, {
      type: "warning",
      title: "Security Alert",
      message: `New ${activity} detected on your account`,
      actionUrl: "/security",
      actionText: "Review Activity",
    });
  },

  welcome: async (userId: string) => {
    return createNotification(userId, {
      type: "info",
      title: "Welcome to Smart Invest GH",
      message: "Start your investment journey with us today!",
      actionUrl: "/invest",
      actionText: "Explore Plans",
    });
  },

  smartWelcome: async (userId: string) => {
    return createSmartWelcomeNotification(userId);
  },

  welcomeNewUser: async (userId: string) => {
    return createWelcomeNotification(userId);
  },
};
