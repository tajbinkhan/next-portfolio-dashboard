export const contactSubmissionStatusValues = ["UNREAD", "READ", "ARCHIVED"] as const;
export const contactSubmissionSortValues = ["name", "email", "subject", "status", "createdAt"] as const;
export const contactSubmissionSortDirectionValues = ["asc", "desc"] as const;

export type ContactSubmissionStatus = (typeof contactSubmissionStatusValues)[number];
export type ContactSubmissionSort = (typeof contactSubmissionSortValues)[number];
export type ContactSubmissionSortDirection = (typeof contactSubmissionSortDirectionValues)[number];

export interface ContactSubmission {
	id: string;
	name: string;
	email: string;
	subject: string | null;
	message: string;
	status: ContactSubmissionStatus;
	metadata: Record<string, unknown>;
	createdAt: string;
	updatedAt: string;
}

export type ContactSubmissionListResponse = PaginatedData<ContactSubmission>;

export interface ContactSubmissionListQuery {
	page: number;
	pageSize: number;
	search?: string;
	status?: ContactSubmissionStatus;
	fromDate?: string;
	toDate?: string;
	sort: ContactSubmissionSort;
	dir: ContactSubmissionSortDirection;
}
