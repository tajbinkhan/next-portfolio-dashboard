"use client";

import { Cancel01Icon, CancelCircleIcon, RefreshIcon, Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { DataTableDateRangeFilter } from "@/components/common/table/data-table-date-range-filter";
import { DataTableViewOptions } from "@/components/common/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { useContactSubmissionList } from "@/features/contact/hooks/use-contact-submission-list";
import type { ContactSubmissionStatus } from "@/features/contact/types/contact-submission.types";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

interface ContactSubmissionsToolbarProps<TData> {
	table: Table<TData>;
}

export function ContactSubmissionsToolbar<TData>({ table }: ContactSubmissionsToolbarProps<TData>) {
	const {
		search,
		status,
		fromDate,
		toDate,
		isFetching,
		handleSearchChange,
		handleStatusFilter,
		handleDateRangeChange,
		handleResetAll,
		handleRefresh
	} = useContactSubmissionList();
	const [searchInput, setSearchInput] = useState(search);
	const debouncedSearch = useDebouncedValue(searchInput, 400);
	const hasFilters = Boolean(search || status || fromDate || toDate);

	useEffect(() => {
		if (debouncedSearch === search) return;
		handleSearchChange(debouncedSearch);
	}, [debouncedSearch, handleSearchChange, search]);

	const handleClearSearch = () => {
		setSearchInput("");
		handleSearchChange("");
	};

	const handleResetFilters = () => {
		setSearchInput("");
		handleResetAll();
	};

	return (
		<div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
			<div className="flex flex-col gap-3 lg:flex-row lg:items-end">
				<Field className="gap-1 sm:max-w-96">
					<InputGroup className="h-8 max-w-sm">
						<InputGroupInput
							id="contact-submissions-search"
							value={searchInput}
							placeholder="Search messages..."
							onChange={event => setSearchInput(event.target.value)}
						/>
						<InputGroupAddon>
							<HugeiconsIcon icon={Search} data-icon="inline-start" />
						</InputGroupAddon>
						<InputGroupAddon align="inline-end">
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className={searchInput ? "size-6" : "invisible size-6"}
								onClick={handleClearSearch}
							>
								<span className="sr-only">Clear message search</span>
								<HugeiconsIcon icon={CancelCircleIcon} />
							</Button>
						</InputGroupAddon>
					</InputGroup>
				</Field>
				<div className="flex flex-wrap items-center gap-2">
					<Select
						value={status || "ALL"}
						onValueChange={value =>
							handleStatusFilter(
								value === "ALL" ? undefined : (value as ContactSubmissionStatus)
							)
						}
					>
						<SelectTrigger className="h-8 w-36">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="ALL">All status</SelectItem>
							<SelectItem value="UNREAD">Unread</SelectItem>
							<SelectItem value="READ">Read</SelectItem>
							<SelectItem value="ARCHIVED">Archived</SelectItem>
						</SelectContent>
					</Select>
					{hasFilters ? (
						<Button type="button" variant="ghost" size="sm" onClick={handleResetFilters}>
							Reset
							<HugeiconsIcon icon={Cancel01Icon} />
						</Button>
					) : null}
				</div>
			</div>
			<div className="flex flex-wrap items-center gap-2 sm:justify-end">
				<Button type="button" size="sm" onClick={handleRefresh} disabled={isFetching}>
					<HugeiconsIcon
						icon={RefreshIcon}
						data-icon="inline-start"
						className={isFetching ? "animate-spin" : undefined}
					/>
					Refresh
				</Button>
				<DataTableDateRangeFilter
					id="contact-submissions-date-range"
					fromDate={fromDate}
					toDate={toDate}
					onChange={handleDateRangeChange}
				/>
				<DataTableViewOptions table={table} />
			</div>
		</div>
	);
}
