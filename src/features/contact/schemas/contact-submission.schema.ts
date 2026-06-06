import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";

import {
	contactSubmissionSortDirectionValues,
	contactSubmissionSortValues
} from "@/features/contact/types/contact-submission.types";

export const contactSubmissionSearchParams = {
	page: parseAsInteger.withDefault(1),
	pageSize: parseAsInteger.withDefault(10),
	search: parseAsString.withDefault(""),
	status: parseAsString.withDefault(""),
	fromDate: parseAsString.withDefault(""),
	toDate: parseAsString.withDefault(""),
	sort: parseAsStringEnum([...contactSubmissionSortValues]).withDefault("createdAt"),
	dir: parseAsStringEnum([...contactSubmissionSortDirectionValues]).withDefault("desc")
};

export function createContactSubmissionListQuery(filters: {
	page: number;
	pageSize: number;
	search?: string;
	status?: string;
	fromDate?: string;
	toDate?: string;
	sort: string;
	dir: string;
}) {
	return {
		page: filters.page,
		pageSize: filters.pageSize,
		search: filters.search || undefined,
		status: filters.status || undefined,
		fromDate: filters.fromDate || undefined,
		toDate: filters.toDate || undefined,
		sort: filters.sort,
		dir: filters.dir
	};
}
