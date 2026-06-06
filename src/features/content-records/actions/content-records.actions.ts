import { apiClient } from "@/lib/api/client";

import type {
	ContentRecord,
	ContentRecordInput,
	ContentRecordListQuery,
	ContentRecordListResponse,
	DeleteContentRecordResponse
} from "@/features/content-records/types/content-records.types";

export async function listContentRecords(
	endpoint: string,
	filters: ContentRecordListQuery
): Promise<ContentRecordListResponse> {
	return apiClient<ContentRecordListResponse>({
		method: "GET",
		url: endpoint,
		params: createContentRecordListQuery(filters)
	});
}

export async function getContentRecord(endpoint: string, id: string): Promise<ContentRecord> {
	return apiClient<ContentRecord>({
		method: "GET",
		url: `${endpoint}/${id}`
	});
}

export async function getSingletonContentRecord(endpoint: string): Promise<ContentRecord> {
	return apiClient<ContentRecord>({
		method: "GET",
		url: endpoint
	});
}

export async function createContentRecord(
	endpoint: string,
	data: ContentRecordInput
): Promise<ContentRecord> {
	return apiClient<ContentRecord>({
		method: "POST",
		url: endpoint,
		data
	});
}

export async function updateContentRecord(
	endpoint: string,
	id: string,
	data: ContentRecordInput
): Promise<ContentRecord> {
	return apiClient<ContentRecord>({
		method: "PATCH",
		url: `${endpoint}/${id}`,
		data
	});
}

export async function updateSingletonContentRecord(
	endpoint: string,
	data: ContentRecordInput
): Promise<ContentRecord> {
	return apiClient<ContentRecord>({
		method: "PATCH",
		url: endpoint,
		data
	});
}

export async function deleteContentRecord(
	endpoint: string,
	id: string
): Promise<DeleteContentRecordResponse> {
	return apiClient<DeleteContentRecordResponse>({
		method: "DELETE",
		url: `${endpoint}/${id}`
	});
}

function createContentRecordListQuery(filters: ContentRecordListQuery) {
	return {
		page: filters.page,
		pageSize: filters.pageSize,
		search: filters.search || undefined,
		status: filters.status || undefined,
		isVisible: filters.isVisible || undefined,
		sort: filters.sort,
		dir: filters.dir
	};
}
