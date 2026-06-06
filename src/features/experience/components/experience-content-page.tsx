"use client";

import { UserGroupIcon } from "@hugeicons/core-free-icons";

import { ContentRecordPage } from "@/features/content-records/components/content-record-page";
import type { ContentRecordFeatureConfig } from "@/features/content-records/types/content-records.types";
import { apiRoute, route } from "@/routes/routes";

const experienceConfig: ContentRecordFeatureConfig = {
	title: "Experience",
	description: "Manage timeline roles, organizations, dates, bullets, and current-role state.",
	tableTitle: "Experience Records",
	tableDescription: "Build the portfolio experience timeline.",
	routePath: route.private.contentExperience,
	apiEndpoint: apiRoute.dashboardExperience,
	resourceLabel: "Experience",
	resourceLabelPlural: "Experience",
	breadcrumb: "Experience",
	icon: UserGroupIcon,
	fields: [
		{ name: "role", label: "Role", type: "text" },
		{ name: "company", label: "Company", type: "text" },
		{ name: "durationLabel", label: "Duration label", type: "text" },
		{ name: "description", label: "Description", type: "textarea" },
		{ name: "bulletPoints", label: "Bullet points", type: "tags" }
	]
};

export function ExperienceContentPage() {
	return <ContentRecordPage config={experienceConfig} />;
}
