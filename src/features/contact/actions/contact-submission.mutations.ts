import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	deleteContactSubmission,
	updateContactSubmissionStatus
} from "@/features/contact/actions/contact-submission.actions";
import { contactSubmissionKeys } from "@/features/contact/actions/contact-submission.keys";

export function useUpdateContactSubmissionStatusMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateContactSubmissionStatus,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: contactSubmissionKeys.all });
		}
	});
}

export function useDeleteContactSubmissionMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteContactSubmission,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: contactSubmissionKeys.all });
		}
	});
}
