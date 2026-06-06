"use client";

import { useQueryStates } from "nuqs";
import { createContext, useCallback, useContext, useMemo } from "react";
import { toast } from "sonner";

import { useContactSubmissionsQuery } from "@/features/contact/actions/contact-submission.queries";
import { contactSubmissionSearchParams } from "@/features/contact/schemas/contact-submission.schema";
import type {
	ContactSubmission,
	ContactSubmissionListQuery,
	ContactSubmissionSort,
	ContactSubmissionSortDirection,
	ContactSubmissionStatus
} from "@/features/contact/types/contact-submission.types";
import {
	contactSubmissionSortValues,
	contactSubmissionStatusValues
} from "@/features/contact/types/contact-submission.types";

type ContactSubmissionPagination = PaginatedData<ContactSubmission>;

interface ContactSubmissionListContextValue {
	tableData: ContactSubmission[];
	pagination: ContactSubmissionPagination;
	isLoading: boolean;
	isFetching: boolean;
	error: unknown;
	search: string;
	status: string;
	fromDate: string;
	toDate: string;
	sort: ContactSubmissionSort;
	dir: ContactSubmissionSortDirection;
	handleSorting: (sort: string, dir: ContactSubmissionSortDirection) => void;
	handleOptionFilter: (key: string, value?: string | string[] | null) => void;
	handleSearchChange: (value: string) => void;
	handleStatusFilter: (value?: ContactSubmissionStatus) => void;
	handleDateRangeChange: (value: { fromDate?: string; toDate?: string }) => void;
	handleResetAll: () => void;
	handleRefresh: () => void;
}

const defaultPagination: ContactSubmissionPagination = {
	rows: [],
	total: 0,
	page: 1,
	pageSize: 10
};

const sortableColumns = new Set<string>(contactSubmissionSortValues);
const validStatuses = new Set<string>(contactSubmissionStatusValues);
const ContactSubmissionListContext = createContext<ContactSubmissionListContextValue | null>(null);

export function ContactSubmissionListProvider({ children }: GlobalLayoutProps) {
	const [params, setParams] = useQueryStates(contactSubmissionSearchParams);
	const filters = useMemo<ContactSubmissionListQuery>(
		() => ({
			page: params.page,
			pageSize: params.pageSize,
			search: params.search || undefined,
			status: validStatuses.has(params.status)
				? (params.status as ContactSubmissionStatus)
				: undefined,
			fromDate: params.fromDate || undefined,
			toDate: params.toDate || undefined,
			sort: params.sort,
			dir: params.dir
		}),
		[
			params.dir,
			params.fromDate,
			params.page,
			params.pageSize,
			params.search,
			params.sort,
			params.status,
			params.toDate
		]
	);
	const submissionsQuery = useContactSubmissionsQuery(filters);
	const pagination = submissionsQuery.data ?? defaultPagination;

	const handleSorting = useCallback(
		(nextSort: string, nextDir: ContactSubmissionSortDirection) => {
			if (!sortableColumns.has(nextSort)) return;
			void setParams({ sort: nextSort as ContactSubmissionSort, dir: nextDir, page: 1 });
		},
		[setParams]
	);

	const handleOptionFilter = useCallback(
		(key: string, value?: string | string[] | null) => {
			const normalizedValue = Array.isArray(value) ? value.join(",") : value;

			if (key === "page") {
				void setParams({ page: Number(normalizedValue) || 1 });
				return;
			}

			if (key === "limit" || key === "pageSize") {
				void setParams({
					pageSize: Number(normalizedValue) || defaultPagination.pageSize,
					page: defaultPagination.page
				});
			}
		},
		[setParams]
	);

	const handleSearchChange = useCallback(
		(value: string) => {
			void setParams({ search: value.trim() || null, page: 1 });
		},
		[setParams]
	);

	const handleStatusFilter = useCallback(
		(value?: ContactSubmissionStatus) => {
			void setParams({ status: value || null, page: 1 });
		},
		[setParams]
	);

	const handleDateRangeChange = useCallback(
		(value: { fromDate?: string; toDate?: string }) => {
			void setParams({
				fromDate: value.fromDate?.trim() || null,
				toDate: value.toDate?.trim() || null,
				page: 1
			});
		},
		[setParams]
	);

	const handleResetAll = useCallback(() => {
		void setParams({
			page: 1,
			pageSize: 10,
			search: null,
			status: null,
			fromDate: null,
			toDate: null,
			sort: "createdAt",
			dir: "desc"
		});
	}, [setParams]);

	const handleRefresh = useCallback(() => {
		void toast.promise(submissionsQuery.refetch(), {
			loading: "Refreshing contact submissions...",
			success: "Contact submissions refreshed",
			error: "Failed to refresh contact submissions"
		});
	}, [submissionsQuery]);

	const value = useMemo<ContactSubmissionListContextValue>(
		() => ({
			tableData: pagination.rows,
			pagination,
			isLoading: submissionsQuery.isLoading,
			isFetching: submissionsQuery.isFetching,
			error: submissionsQuery.error,
			search: params.search,
			status: params.status,
			fromDate: params.fromDate,
			toDate: params.toDate,
			sort: params.sort,
			dir: params.dir,
			handleSorting,
			handleOptionFilter,
			handleSearchChange,
			handleStatusFilter,
			handleDateRangeChange,
			handleResetAll,
			handleRefresh
		}),
		[
			handleDateRangeChange,
			handleOptionFilter,
			handleRefresh,
			handleResetAll,
			handleSearchChange,
			handleSorting,
			handleStatusFilter,
			pagination,
			params.dir,
			params.fromDate,
			params.search,
			params.sort,
			params.status,
			params.toDate,
			submissionsQuery.error,
			submissionsQuery.isFetching,
			submissionsQuery.isLoading
		]
	);

	return (
		<ContactSubmissionListContext.Provider value={value}>
			{children}
		</ContactSubmissionListContext.Provider>
	);
}

export function useContactSubmissionList() {
	const context = useContext(ContactSubmissionListContext);
	if (!context) {
		throw new Error("useContactSubmissionList must be used within ContactSubmissionListProvider");
	}
	return context;
}
