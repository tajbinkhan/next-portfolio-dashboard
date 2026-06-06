"use client";

import { useQueryStates } from "nuqs";
import { createContext, useCallback, useContext, useMemo } from "react";
import { toast } from "sonner";

import { useContentRecordsQuery } from "@/features/content-records/actions/content-records.queries";
import { contentRecordSearchParams } from "@/features/content-records/schemas/content-records.schema";
import type {
	ContentRecord,
	ContentRecordListQuery,
	ContentRecordSort,
	ContentRecordSortDirection,
	ContentRecordTableData
} from "@/features/content-records/types/content-records.types";
import { contentRecordSortValues } from "@/features/content-records/types/content-records.types";

interface ContentRecordListContextValue {
	endpoint: string;
	tableData: ContentRecord[];
	pagination: ContentRecordTableData;
	isLoading: boolean;
	isFetching: boolean;
	error: unknown;
	search: string;
	status: string;
	isVisible: string;
	sort: ContentRecordSort;
	dir: ContentRecordSortDirection;
	handleSorting: (sort: string, dir: ContentRecordSortDirection) => void;
	handleOptionFilter: (key: string, value?: string | string[] | null) => void;
	handleSearchChange: (value: string) => void;
	handleStatusChange: (value: string) => void;
	handleVisibilityChange: (value: string) => void;
	handleResetAll: () => void;
	handleRefresh: () => void;
}

const defaultPagination: ContentRecordTableData = {
	rows: [],
	total: 0,
	page: 1,
	pageSize: 10
};

const sortableColumns = new Set<string>(contentRecordSortValues);
const ContentRecordListContext = createContext<ContentRecordListContextValue | null>(null);

interface ContentRecordListProviderProps extends GlobalLayoutProps {
	endpoint: string;
	resourceLabelPlural: string;
}

export function ContentRecordListProvider({
	children,
	endpoint,
	resourceLabelPlural
}: ContentRecordListProviderProps) {
	const [params, setParams] = useQueryStates(contentRecordSearchParams);
	const filters = useMemo<ContentRecordListQuery>(
		() => ({
			page: params.page,
			pageSize: params.pageSize,
			search: params.search || undefined,
			status: params.status === "DRAFT" || params.status === "PUBLISHED" ? params.status : "",
			isVisible: params.isVisible === "true" || params.isVisible === "false" ? params.isVisible : "",
			sort: params.sort,
			dir: params.dir
		}),
		[
			params.dir,
			params.isVisible,
			params.page,
			params.pageSize,
			params.search,
			params.sort,
			params.status
		]
	);
	const recordsQuery = useContentRecordsQuery(endpoint, filters);
	const list = recordsQuery.data;
	const pagination = useMemo<ContentRecordTableData>(
		() => ({
			rows: list?.items ?? list?.rows ?? [],
			total: list?.total ?? defaultPagination.total,
			page: list?.page ?? defaultPagination.page,
			pageSize: list?.pageSize ?? defaultPagination.pageSize
		}),
		[list]
	);

	const handleSorting = useCallback(
		(nextSort: string, nextDir: ContentRecordSortDirection) => {
			if (!sortableColumns.has(nextSort)) return;
			void setParams({ sort: nextSort as ContentRecordSort, dir: nextDir, page: 1 });
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

	const handleStatusChange = useCallback(
		(value: string) => {
			void setParams({ status: value === "ALL" ? null : value, page: 1 });
		},
		[setParams]
	);

	const handleVisibilityChange = useCallback(
		(value: string) => {
			void setParams({ isVisible: value === "ALL" ? null : value, page: 1 });
		},
		[setParams]
	);

	const handleResetAll = useCallback(() => {
		void setParams({
			page: 1,
			pageSize: 10,
			search: null,
			status: null,
			isVisible: null,
			sort: "createdAt",
			dir: "desc"
		});
	}, [setParams]);

	const handleRefresh = useCallback(() => {
		void toast.promise(recordsQuery.refetch(), {
			loading: `Refreshing ${resourceLabelPlural.toLowerCase()}...`,
			success: `${resourceLabelPlural} refreshed`,
			error: `Failed to refresh ${resourceLabelPlural.toLowerCase()}`
		});
	}, [recordsQuery, resourceLabelPlural]);

	const value = useMemo<ContentRecordListContextValue>(
		() => ({
			endpoint,
			tableData: pagination.rows,
			pagination,
			isLoading: recordsQuery.isLoading,
			isFetching: recordsQuery.isFetching,
			error: recordsQuery.error,
			search: params.search,
			status: params.status,
			isVisible: params.isVisible,
			sort: params.sort,
			dir: params.dir,
			handleSorting,
			handleOptionFilter,
			handleSearchChange,
			handleStatusChange,
			handleVisibilityChange,
			handleResetAll,
			handleRefresh
		}),
		[
			endpoint,
			handleOptionFilter,
			handleRefresh,
			handleResetAll,
			handleSearchChange,
			handleSorting,
			handleStatusChange,
			handleVisibilityChange,
			pagination,
			params.dir,
			params.isVisible,
			params.search,
			params.sort,
			params.status,
			recordsQuery.error,
			recordsQuery.isFetching,
			recordsQuery.isLoading
		]
	);

	return (
		<ContentRecordListContext.Provider value={value}>
			{children}
		</ContentRecordListContext.Provider>
	);
}

export function useContentRecordList() {
	const context = useContext(ContentRecordListContext);

	if (!context) {
		throw new Error("useContentRecordList must be used within ContentRecordListProvider");
	}

	return context;
}
