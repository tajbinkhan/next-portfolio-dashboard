import { format } from "date-fns";

import type { ContactSubmissionStatus } from "@/features/contact/types/contact-submission.types";

export function formatContactSubmissionStatus(status: ContactSubmissionStatus) {
	switch (status) {
		case "UNREAD":
			return "Unread";
		case "READ":
			return "Read";
		case "ARCHIVED":
			return "Archived";
		default:
			return status;
	}
}

export function getContactSubmissionStatusVariant(status: ContactSubmissionStatus) {
	switch (status) {
		case "UNREAD":
			return "default";
		case "READ":
			return "secondary";
		case "ARCHIVED":
			return "outline";
		default:
			return "secondary";
	}
}

export function formatContactSubmissionDate(value: string) {
	return format(new Date(value), "PP p");
}

export function formatContactSubmissionSubject(subject: string | null) {
	return subject?.trim() || "General inquiry";
}

export function formatMetadataJson(metadata: Record<string, unknown>) {
	return JSON.stringify(metadata, null, 2);
}
