import type { Metadata } from "next";

import { ProjectsContentPage } from "@/features/projects/components/projects-content-page";

export const metadata: Metadata = {
	title: "Projects",
	description: "Manage portfolio project content."
};

export default function ProjectsRoutePage() {
	return <ProjectsContentPage />;
}
