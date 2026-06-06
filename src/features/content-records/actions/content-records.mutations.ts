import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
	createContentRecord,
	deleteContentRecord,
	updateContentRecord,
	updateSingletonContentRecord
} from "@/features/content-records/actions/content-records.actions";
import { contentRecordKeys } from "@/features/content-records/actions/content-records.keys";
import type {
	ContentRecordMutationInput,
	DeleteContentRecordInput,
	UpdateContentRecordInput
} from "@/features/content-records/types/content-records.types";

export function useCreateContentRecordMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ endpoint, ...data }: ContentRecordMutationInput) =>
			createContentRecord(endpoint, data),
		onSuccess: async (_data, variables) => {
			await queryClient.invalidateQueries({ queryKey: contentRecordKeys.resource(variables.endpoint) });
		}
	});
}

export function useUpdateContentRecordMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ endpoint, id, ...data }: UpdateContentRecordInput) =>
			updateContentRecord(endpoint, id, data),
		onSuccess: async (_data, variables) => {
			await queryClient.invalidateQueries({ queryKey: contentRecordKeys.resource(variables.endpoint) });
		}
	});
}

export function useUpdateSingletonContentRecordMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ endpoint, ...data }: ContentRecordMutationInput) =>
			updateSingletonContentRecord(endpoint, data),
		onSuccess: async (_data, variables) => {
			await queryClient.invalidateQueries({ queryKey: contentRecordKeys.resource(variables.endpoint) });
		}
	});
}

export function useDeleteContentRecordMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ endpoint, id }: DeleteContentRecordInput) => deleteContentRecord(endpoint, id),
		onSuccess: async (_data, variables) => {
			await queryClient.invalidateQueries({ queryKey: contentRecordKeys.resource(variables.endpoint) });
		}
	});
}
