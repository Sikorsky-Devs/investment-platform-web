import { type Metadata } from "next";

import ProfilePage from "@/features/profile/profile.page";

export const metadata: Metadata = {
  title: "Profile",
};

const Profile = () => {
  return <ProfilePage />;
};

export default Profile;
