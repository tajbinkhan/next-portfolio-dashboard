import type { IconSvgElement } from "@hugeicons/react";

export const contentRecordStatusValues = ["DRAFT", "PUBLISHED"] as const;
export const contentRecordSortValues = [
	"title",
	"slug",
	"status",
	"isVisible",
	"sortOrder",
	"createdAt",
	"updatedAt"
] as const;
export const contentRecordSortDirectionValues = ["asc", "desc"] as const;

export type ContentRecordStatus = (typeof contentRecordStatusValues)[number];
export type ContentRecordSort = (typeof contentRecordSortValues)[number];
export type ContentRecordSortDirection = (typeof contentRecordSortDirectionValues)[number];
export type ContentRecordPayload = Record<string, unknown>;

export interface ContentRecord {
	id: string;
	title: string | null;
	slug: string | null;
	status: ContentRecordStatus;
	isVisible: boolean;
	sortOrder: number;
	payload: ContentRecordPayload;
	updatedBy: number | null;
	publishedAt: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface ContentRecordListQuery {
	page?: number;
	pageSize?: number;
	search?: string;
	status?: ContentRecordStatus | "";
	isVisible?: "true" | "false" | "";
	sort?: ContentRecordSort;
	dir?: ContentRecordSortDirection;
}

export interface ContentRecordListResponse {
	items?: ContentRecord[];
	rows?: ContentRecord[];
	total: number;
	page: number;
	pageSize: number;
}

export interface ContentRecordTableData extends PaginatedData<ContentRecord> {}

export interface ContentRecordInput {
	title?: string | null;
	slug?: string | null;
	status?: ContentRecordStatus;
	isVisible?: boolean;
	sortOrder?: number;
	payload?: ContentRecordPayload;
}

export interface ContentRecordMutationInput extends ContentRecordInput {
	endpoint: string;
}

export interface UpdateContentRecordInput extends ContentRecordInput {
	endpoint: string;
	id: string;
}

export interface DeleteContentRecordInput {
	endpoint: string;
	id: string;
}

export interface DeleteContentRecordResponse {
	deleted: true;
}

export type ContentFieldType =
	| "text"
	| "textarea"
	| "number"
	| "switch"
	| "tags"
	| "url"
	| "email"
	| "date";

export interface ContentFieldConfig {
	name: string;
	label: string;
	type: ContentFieldType;
	description?: string;
	placeholder?: string;
	required?: boolean;
}

export interface ContentRecordFeatureConfig {
	title: string;
	description: string;
	tableTitle: string;
	tableDescription: string;
	routePath: string;
	apiEndpoint: string;
	resourceLabel: string;
	resourceLabelPlural: string;
	breadcrumb: string;
	fields: ContentFieldConfig[];
	icon?: IconSvgElement;
	singleton?: boolean;
}

export interface ContentRecordFormValues {
	title: string;
	slug: string;
	status: ContentRecordStatus;
	isVisible: boolean;
	sortOrder: number;
	payload: Record<string, unknown>;
}
