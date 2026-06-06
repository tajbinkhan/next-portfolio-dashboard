import { useQuery } from "@tanstack/react-query";

import {
	getContentRecord,
	getSingletonContentRecord,
	listContentRecords
} from "@/features/content-records/actions/content-records.actions";
import { contentRecordKeys } from "@/features/content-records/actions/content-records.keys";
import type { ContentRecordListQuery } from "@/features/content-records/types/content-records.types";

export function useContentRecordsQuery(endpoint: string, filters: ContentRecordListQuery) {
	return useQuery({
		queryKey: contentRecordKeys.list(endpoint, filters),
		queryFn: () => listContentRecords(endpoint, filters)
	});
}

export function useContentRecordQuery(endpoint: string, id: string, enabled = true) {
	return useQuery({
		queryKey: contentRecordKeys.detail(endpoint, id),
		queryFn: () => getContentRecord(endpoint, id),
		enabled: Boolean(id) && enabled
	});
}

export function useSingletonContentRecordQuery(endpoint: string) {
	return useQuery({
		queryKey: contentRecordKeys.resource(endpoint),
		queryFn: () => getSingletonContentRecord(endpoint)
	});
}
