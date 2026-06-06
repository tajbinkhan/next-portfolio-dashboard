"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/common/table/data-table";
import { createContentRecordColumns } from "@/features/content-records/components/content-record-columns";
import { ContentRecordToolbar } from "@/features/content-records/components/content-record-toolbar";
import { useContentRecordList } from "@/features/content-records/hooks/use-content-record-list";
import type {
	ContentRecord,
	ContentRecordFeatureConfig
} from "@/features/content-records/types/content-records.types";

interface ContentRecordTableProps {
	config: ContentRecordFeatureConfig;
}

export function ContentRecordTable({ config }: ContentRecordTableProps) {
	const { tableData, pagination, isLoading, handleOptionFilter, sort, dir, handleSorting } =
		useContentRecordList();
	const columns = useMemo(
		() =>
			createContentRecordColumns({
				config,
				sort,
				dir,
				handleSorting
			}),
		[config, dir, handleSorting, sort]
	);
	const Toolbar = useMemo(
		() =>
			function ToolbarComponent({ table }: { table: import("@tanstack/react-table").Table<ContentRecord> }) {
				return <ContentRecordToolbar table={table} config={config} />;
			},
		[config]
	);

	return (
		<DataTable
			columns={columns}
			isLoading={isLoading}
			data={tableData}
			pagination={pagination}
			handleOptionFilter={handleOptionFilter}
			DataTableToolbar={Toolbar}
			emptyTitle={`No ${config.resourceLabelPlural.toLowerCase()} found`}
			emptyDescription={`${config.resourceLabelPlural} matching your filters will appear here.`}
			rowDetailsTitle={`${config.resourceLabel} details`}
			rowDetailsDescription="Raw dashboard content payload and publishing metadata."
			renderRowDetails={record => (
				<pre className="bg-muted overflow-auto rounded-lg p-4 text-xs">
					{JSON.stringify(record, null, 2)}
				</pre>
			)}
		/>
	);
}
