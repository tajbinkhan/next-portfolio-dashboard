"use client";

import { UserIcon } from "@hugeicons/core-free-icons";

import { ContentRecordTabsPage } from "@/features/content-records/components/content-record-tabs-page";
import type { ContentRecordFeatureConfig } from "@/features/content-records/types/content-records.types";
import { apiRoute, route } from "@/routes/routes";

const educationConfig: ContentRecordFeatureConfig = {
	title: "Education",
	description: "Manage education records used across the portfolio profile content.",
	tableTitle: "Education items",
	tableDescription: "Degrees, institutions, timelines, and supporting notes.",
	routePath: route.private.contentProfile,
	apiEndpoint: apiRoute.dashboardEducation,
	resourceLabel: "Education item",
	resourceLabelPlural: "Education items",
	breadcrumb: "Profile Content",
	fields: [
		{ name: "label", label: "Label", type: "text" },
		{ name: "value", label: "Value", type: "text" },
		{ name: "subtitle", label: "Subtitle", type: "text" }
	]
};

const languageConfig: ContentRecordFeatureConfig = {
	title: "Languages",
	description: "Manage language names, proficiency labels, and display notes.",
	tableTitle: "Languages",
	tableDescription: "Language entries shown in profile and assistant content.",
	routePath: route.private.contentProfile,
	apiEndpoint: apiRoute.dashboardLanguages,
	resourceLabel: "Language",
	resourceLabelPlural: "Languages",
	breadcrumb: "Profile Content",
	fields: [
		{ name: "languageName", label: "Language", type: "text" },
		{ name: "proficiency", label: "Proficiency", type: "text" }
	]
};

const hobbyConfig: ContentRecordFeatureConfig = {
	title: "Hobbies",
	description: "Manage personal interests used by portfolio and AI content surfaces.",
	tableTitle: "Hobbies",
	tableDescription: "Interests, labels, icon keys, and supporting context.",
	routePath: route.private.contentProfile,
	apiEndpoint: apiRoute.dashboardHobbies,
	resourceLabel: "Hobby",
	resourceLabelPlural: "Hobbies",
	breadcrumb: "Profile Content",
	fields: [
		{ name: "hobbyName", label: "Hobby", type: "text" }
	]
};

export function ProfileContentPage() {
	return (
		<ContentRecordTabsPage
			title="Profile Content"
			description="Manage education, languages, and hobbies without changing the dashboard route style."
			breadcrumb="Profile Content"
			icon={UserIcon}
			defaultValue="education"
			tabs={[
				{ value: "education", label: "Education", config: educationConfig },
				{ value: "languages", label: "Languages", config: languageConfig },
				{ value: "hobbies", label: "Hobbies", config: hobbyConfig }
			]}
		/>
	);
}
