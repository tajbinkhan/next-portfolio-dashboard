"use client";

import { ComputerProtectionIcon } from "@hugeicons/core-free-icons";

import { ContentRecordPage } from "@/features/content-records/components/content-record-page";
import type { ContentRecordFeatureConfig } from "@/features/content-records/types/content-records.types";
import { apiRoute, route } from "@/routes/routes";

const projectsConfig: ContentRecordFeatureConfig = {
	title: "Projects",
	description: "Manage portfolio projects, links, stack tags, highlights, and featured state.",
	tableTitle: "Project Records",
	tableDescription: "Create project content that can be published to the portfolio.",
	routePath: route.private.contentProjects,
	apiEndpoint: apiRoute.dashboardProjects,
	resourceLabel: "Project",
	resourceLabelPlural: "Projects",
	breadcrumb: "Projects",
	icon: ComputerProtectionIcon,
	fields: [
		{ name: "description", label: "Description", type: "textarea" },
		{ name: "stackTags", label: "Stack", type: "tags" },
		{ name: "role", label: "Role", type: "text" },
		{ name: "highlights", label: "Highlights", type: "tags" },
		{ name: "liveUrl", label: "Live URL", type: "url" },
		{ name: "githubUrl", label: "GitHub URL", type: "url" }
	]
};

export function ProjectsContentPage() {
	return <ContentRecordPage config={projectsConfig} />;
}
