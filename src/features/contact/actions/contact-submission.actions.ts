import { apiClient } from "@/lib/api/client";
import { apiRoute } from "@/routes/routes";

import { createContactSubmissionListQuery } from "@/features/contact/schemas/contact-submission.schema";
import type {
	ContactSubmission,
	ContactSubmissionListQuery,
	ContactSubmissionListResponse,
	ContactSubmissionStatus
} from "@/features/contact/types/contact-submission.types";

export async function listContactSubmissions(
	filters: ContactSubmissionListQuery
): Promise<ContactSubmissionListResponse> {
	return apiClient<ContactSubmissionListResponse>({
		method: "GET",
		url: apiRoute.contactSubmissions,
		params: createContactSubmissionListQuery(filters)
	});
}

export async function updateContactSubmissionStatus({
	id,
	status
}: {
	id: string;
	status: ContactSubmissionStatus;
}): Promise<ContactSubmission> {
	return apiClient<ContactSubmission>({
		method: "PATCH",
		url: apiRoute.contactSubmissionStatus(id),
		data: { status }
	});
}

export async function deleteContactSubmission(id: string): Promise<{ deleted: boolean }> {
	return apiClient<{ deleted: boolean }>({
		method: "DELETE",
		url: apiRoute.contactSubmission(id)
	});
}
