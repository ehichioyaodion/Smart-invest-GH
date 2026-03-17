import { NotificationType } from "../components/NotificationContext";

export const notificationTemplates = {
  paymentSuccess: (amount: string, currency: string = "GH₵") => ({
    type: "success" as NotificationType,
    title: "Payment Successful",
    message: `Your deposit of ${currency}${amount} has been processed successfully`,
    actionUrl: "/transactions",
    actionText: "View Transaction"
  }),

  paymentFailed: (error: string) => ({
    type: "error" as NotificationType,
    title: "Payment Failed",
    message: `Your payment could not be processed: ${error}`
  }),

  withdrawalRequested: (amount: string, currency: string = "GH₵") => ({
    type: "info" as NotificationType,
    title: "Withdrawal Requested",
    message: `Your withdrawal of ${currency}${amount} is being processed`,
    actionUrl: "/transactions",
    actionText: "Track Status"
  }),

  withdrawalSuccess: (amount: string, currency: string = "GH₵") => ({
    type: "success" as NotificationType,
    title: "Withdrawal Successful",
    message: `${currency}${amount} has been sent to your account`,
    actionUrl: "/transactions",
    actionText: "View Details"
  }),

  investmentReceived: (planName: string, amount: string, currency: string = "GH₵") => ({
    type: "success" as NotificationType,
    title: "Investment Confirmed",
    message: `Your ${currency}${amount} investment in ${planName} is now active`,
    actionUrl: "/portfolio",
    actionText: "View Portfolio"
  }),

  investmentMatured: (planName: string, returns: string, currency: string = "GH₵") => ({
    type: "success" as NotificationType,
    title: "Investment Matured",
    message: `Your ${planName} investment has matured with ${currency}${returns} returns`,
    actionUrl: "/portfolio",
    actionText: "View Returns"
  }),

  bonusReceived: (amount: string, currency: string = "GH₵") => ({
    type: "success" as NotificationType,
    title: "Bonus Received",
    message: `You've received a cash bonus of ${currency}${amount}`,
    actionUrl: "/bonuses",
    actionText: "View Bonuses"
  }),

  newInvestmentOpportunity: (planName: string, returns: string) => ({
    type: "info" as NotificationType,
    title: "New Investment Opportunity",
    message: `Check out ${planName} with up to ${returns} returns`,
    actionUrl: "/invest",
    actionText: "Invest Now"
  }),

  accountUpdated: (field: string) => ({
    type: "success" as NotificationType,
    title: "Account Updated",
    message: `Your ${field} has been successfully updated`
  }),

  securityAlert: (activity: string) => ({
    type: "warning" as NotificationType,
    title: "Security Alert",
    message: `New ${activity} detected on your account`,
    actionUrl: "/security",
    actionText: "Review Activity"
  }),

  welcome: () => ({
    type: "info" as NotificationType,
    title: "Welcome to Smart Invest GH",
    message: "Start your investment journey with us today!",
    actionUrl: "/invest",
    actionText: "Explore Plans"
  })
};
