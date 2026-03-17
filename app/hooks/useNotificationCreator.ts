import { useCallback } from "react";
import { useAuth } from "../components/AuthProvider";
import { systemNotifications } from "../services/notificationService";

export function useNotificationCreator() {
  const { user } = useAuth();

  const createNotification = useCallback(
    async (notificationCreator: (userId: string) => Promise<string>) => {
      if (!user) {
        console.warn("Cannot create notification: User not authenticated");
        return;
      }

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

        console.log("Creating notification for custom user ID:", customUserId);
        await notificationCreator(customUserId);
      } catch (error) {
        console.error("Error creating notification:", error);
      }
    },
    [user],
  );

  return {
    paymentSuccess: useCallback(
      (amount: string, currency: string = "GH₵") =>
        createNotification((userId) =>
          systemNotifications.paymentSuccess(userId, amount, currency),
        ),
      [createNotification],
    ),
    paymentFailed: useCallback(
      (error: string) =>
        createNotification((userId) =>
          systemNotifications.paymentFailed(userId, error),
        ),
      [createNotification],
    ),
    withdrawalRequested: useCallback(
      (amount: string, currency: string = "GH₵") =>
        createNotification((userId) =>
          systemNotifications.withdrawalRequested(userId, amount, currency),
        ),
      [createNotification],
    ),
    withdrawalSuccess: useCallback(
      (amount: string, currency: string = "GH₵") =>
        createNotification((userId) =>
          systemNotifications.withdrawalSuccess(userId, amount, currency),
        ),
      [createNotification],
    ),
    investmentReceived: useCallback(
      (planName: string, amount: string, currency: string = "GH₵") =>
        createNotification((userId) =>
          systemNotifications.investmentReceived(
            userId,
            planName,
            amount,
            currency,
          ),
        ),
      [createNotification],
    ),
    investmentMatured: useCallback(
      (planName: string, returns: string, currency: string = "GH₵") =>
        createNotification((userId) =>
          systemNotifications.investmentMatured(
            userId,
            planName,
            returns,
            currency,
          ),
        ),
      [createNotification],
    ),
    bonusReceived: useCallback(
      (amount: string, currency: string = "GH₵") =>
        createNotification((userId) =>
          systemNotifications.bonusReceived(userId, amount, currency),
        ),
      [createNotification],
    ),
    newInvestmentOpportunity: useCallback(
      (planName: string, returns: string) =>
        createNotification((userId) =>
          systemNotifications.newInvestmentOpportunity(
            userId,
            planName,
            returns,
          ),
        ),
      [createNotification],
    ),
    accountUpdated: useCallback(
      (field: string) =>
        createNotification((userId) =>
          systemNotifications.accountUpdated(userId, field),
        ),
      [createNotification],
    ),
    securityAlert: useCallback(
      (activity: string) =>
        createNotification((userId) =>
          systemNotifications.securityAlert(userId, activity),
        ),
      [createNotification],
    ),
    welcome: useCallback(
      () => createNotification((userId) => systemNotifications.welcome(userId)),
      [createNotification],
    ),
    smartWelcome: useCallback(
      () =>
        createNotification((userId) =>
          systemNotifications.smartWelcome(userId),
        ),
      [createNotification],
    ),
    welcomeNewUser: useCallback(
      () =>
        createNotification((userId) =>
          systemNotifications.welcomeNewUser(userId),
        ),
      [createNotification],
    ),
  };
}
