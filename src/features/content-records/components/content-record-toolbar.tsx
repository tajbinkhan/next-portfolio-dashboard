"use client";

import { SearchRemoveIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Table as TableInstance } from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { ContentRecordDialog } from "@/features/content-records/components/content-record-dialog";
import { useContentRecordList } from "@/features/content-records/hooks/use-content-record-list";
import type {
	ContentRecord,
	ContentRecordFeatureConfig
} from "@/features/content-records/types/content-records.types";

interface ContentRecordToolbarProps {
	table: TableInstance<ContentRecord>;
	config: ContentRecordFeatureConfig;
}

export function ContentRecordToolbar({ config }: ContentRecordToolbarProps) {
	const [createOpen, setCreateOpen] = useState(false);
	const {
		search,
		status,
		isVisible,
		isFetching,
		handleSearchChange,
		handleStatusChange,
		handleVisibilityChange,
		handleResetAll,
		handleRefresh
	} = useContentRecordList();

	return (
		<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
			<div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
				<div className="relative w-full sm:max-w-xs">
					<Input
						value={search}
						onChange={event => handleSearchChange(event.target.value)}
						placeholder={`Search ${config.resourceLabelPlural.toLowerCase()}...`}
					/>
				</div>
				<Select value={status || "ALL"} onValueChange={handleStatusChange}>
					<SelectTrigger className="w-full sm:w-36">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="ALL">All status</SelectItem>
						<SelectItem value="DRAFT">Draft</SelectItem>
						<SelectItem value="PUBLISHED">Published</SelectItem>
					</SelectContent>
				</Select>
				<Select value={isVisible || "ALL"} onValueChange={handleVisibilityChange}>
					<SelectTrigger className="w-full sm:w-36">
						<SelectValue placeholder="Visibility" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="ALL">All visibility</SelectItem>
						<SelectItem value="true">Visible</SelectItem>
						<SelectItem value="false">Hidden</SelectItem>
					</SelectContent>
				</Select>
				<Button type="button" variant="outline" onClick={handleResetAll}>
					<HugeiconsIcon icon={SearchRemoveIcon} data-icon="inline-start" />
					Reset
				</Button>
			</div>
			<div className="flex gap-2">
				<Button type="button" variant="outline" onClick={handleRefresh} disabled={isFetching}>
					Refresh
				</Button>
				<ContentRecordDialog config={config} open={createOpen} onOpenChange={setCreateOpen} />
			</div>
		</div>
	);
}
