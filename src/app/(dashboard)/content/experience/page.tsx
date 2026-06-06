import type { Metadata } from "next";

import { ExperienceContentPage } from "@/features/experience/components/experience-content-page";

export const metadata: Metadata = {
	title: "Experience",
	description: "Manage portfolio experience timeline content."
};

export default function ExperienceRoutePage() {
	return <ExperienceContentPage />;
}
