import type { Metadata } from "next";

import { SkillsContentPage } from "@/features/skills/components/skills-content-page";

export const metadata: Metadata = {
	title: "Skills",
	description: "Manage portfolio skills content."
};

export default function SkillsRoutePage() {
	return <SkillsContentPage />;
}
