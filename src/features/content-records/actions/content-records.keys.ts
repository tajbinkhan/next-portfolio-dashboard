import type { ContentRecordListQuery } from "@/features/content-records/types/content-records.types";

export const contentRecordKeys = {
	all: ["content-records"] as const,
	resource: (endpoint: string) => [...contentRecordKeys.all, endpoint] as const,
	list: (endpoint: string, filters: ContentRecordListQuery) =>
		[...contentRecordKeys.resource(endpoint), "list", filters] as const,
	detail: (endpoint: string, id: string) =>
		[...contentRecordKeys.resource(endpoint), "detail", id] as const
};
