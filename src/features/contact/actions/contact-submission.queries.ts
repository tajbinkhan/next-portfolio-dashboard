import { useQuery } from "@tanstack/react-query";

import { listContactSubmissions } from "@/features/contact/actions/contact-submission.actions";
import { contactSubmissionKeys } from "@/features/contact/actions/contact-submission.keys";
import type { ContactSubmissionListQuery } from "@/features/contact/types/contact-submission.types";

export function useContactSubmissionsQuery(filters: ContactSubmissionListQuery) {
	return useQuery({
		queryKey: contactSubmissionKeys.list(filters),
		queryFn: () => listContactSubmissions(filters)
	});
}
