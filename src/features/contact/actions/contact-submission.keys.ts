import type { ContactSubmissionListQuery } from "@/features/contact/types/contact-submission.types";

export const contactSubmissionKeys = {
	all: ["contact-submissions"] as const,
	list: (filters: ContactSubmissionListQuery) => [...contactSubmissionKeys.all, "list", filters] as const,
	detail: (id: string) => [...contactSubmissionKeys.all, "detail", id] as const
};
