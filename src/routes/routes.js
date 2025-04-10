import { AuthLayout, PrivateLayout } from "../layout";

import {
  Login,
  Home,
  Profile,
  ProfileSettings,
  ForgotPassword,
  Orders,
  OrderProgress,
  CompletedOrders,
  CanceledOrders,
  Menu,
  Transactions,
  ResendOtp,
  ResetPassword,
  NotFound,
  RegisterVendor,
  VerifyAccount,
} from "../pages";

export const routes = [
  {
    title: "Login",
    path: "/",
    layout: AuthLayout,
    component: Login,
    protected: false,
  },
  {
    title: "Forgot Password",
    path: "/forgot-password",
    layout: AuthLayout,
    component: ForgotPassword,
    protected: false,
  },

  {
    title: "Resend OTP",
    path: "/resend-otp",
    layout: AuthLayout,
    component: ResendOtp,
    protected: false,
  },
  {
    title: "Resend OTP",
    path: "/reset-password",
    layout: AuthLayout,
    component: ResetPassword,
    protected: false,
  },
  {
    title: "Verify Account",
    path: "/verify",
    layout: AuthLayout,
    component: VerifyAccount,
    protected: false,
  },

  {
    title: "Home",
    path: "/home",
    layout: PrivateLayout,
    component: Home,
    protected: true,
  },

  {
    title: "Orders",
    path: "/orders/new",
    layout: PrivateLayout,
    component: Orders,
    protected: true,
  },
  {
    title: "Order in Progress",
    path: "/orders/in-progress",
    layout: PrivateLayout,
    component: OrderProgress,
    protected: true,
  },

  {
    title: "Completed Orders",
    path: "/orders/completed",
    layout: PrivateLayout,
    component: CompletedOrders,
    protected: true,
  },
  {
    title: "Canceled Orders",
    path: "/orders/canceled",
    layout: PrivateLayout,
    component: CanceledOrders,
    protected: true,
  },
  {
    title: "Menu",
    path: "/menu",
    layout: PrivateLayout,
    component: Menu,
    protected: true,
  },

  {
    title: "Transactions",
    path: "/transactions",
    layout: PrivateLayout,
    component: Transactions,
    protected: true,
  },

  {
    title: "Profile",
    path: "/profile",
    layout: PrivateLayout,
    component: Profile,
    protected: true,
  },
  {
    title: "Profile Settings",
    path: "/profile-settings",
    layout: PrivateLayout,
    component: ProfileSettings,
    protected: true,
  },

  {
    title: "Add Vendor",
    path: "/add-vendor",
    layout: PrivateLayout,
    component: RegisterVendor,
    protected: true,
  },

  {
    title: "Not Found",
    path: "*",
    layout: PrivateLayout,
    component: NotFound,
    protected: true,
  },
];
