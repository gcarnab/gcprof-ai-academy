import { AuthUser } from "@/features/auth/context/AuthContext";

import { publicNavigation } from "./publicNavigation";
import { studentNavigation } from "./studentNavigation";
import { adminNavigation } from "./adminNavigation";

export function getNavigationForUser(user: AuthUser | null) {
  if (!user) {
    return publicNavigation;
  }

  if (user.role === "admin") {
    return adminNavigation;
  }

  if (user.status === "pending") {
    return studentNavigation.filter(
      (item) => item.href !== "/my-courses"
    );
  }

  return studentNavigation;
}

export {
  publicNavigation,
  studentNavigation,
  adminNavigation,
};