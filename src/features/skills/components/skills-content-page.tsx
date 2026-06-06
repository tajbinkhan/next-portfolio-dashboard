"use client";

import { UserIcon } from "@hugeicons/core-free-icons";

import { ContentRecordPage } from "@/features/content-records/components/content-record-page";
import type { ContentRecordFeatureConfig } from "@/features/content-records/types/content-records.types";
import { apiRoute, route } from "@/routes/routes";

const skillsConfig: ContentRecordFeatureConfig = {
	title: "Skills",
	description: "Manage skills, categories, proficiency levels, and display style keys.",
	tableTitle: "Skill Records",
	tableDescription: "Create and order visible portfolio skills.",
	routePath: route.private.contentSkills,
	apiEndpoint: apiRoute.dashboardSkills,
	resourceLabel: "Skill",
	resourceLabelPlural: "Skills",
	breadcrumb: "Skills",
	icon: UserIcon,
	fields: [
		{ name: "skillName", label: "Skill name", type: "text" },
		{ name: "category", label: "Category", type: "text", placeholder: "Frontend" },
		{ name: "proficiencyLevel", label: "Proficiency level", type: "number" }
	]
};

export function SkillsContentPage() {
	return <ContentRecordPage config={skillsConfig} />;
}
