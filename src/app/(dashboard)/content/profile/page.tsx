import type { Metadata } from "next";

import { ProfileContentPage } from "@/features/profile-content/components/profile-content-page";

export const metadata: Metadata = {
	title: "Profile Content",
	description: "Manage education, language, and hobby content."
};

export default function ProfileContentRoutePage() {
	return <ProfileContentPage />;
}
