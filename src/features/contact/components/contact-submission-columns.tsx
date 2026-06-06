"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/common/table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { ContactSubmissionRowActions } from "@/features/contact/components/contact-submission-row-actions";
import type { ContactSubmission } from "@/features/contact/types/contact-submission.types";
import {
	formatContactSubmissionDate,
	formatContactSubmissionStatus,
	formatContactSubmissionSubject,
	getContactSubmissionStatusVariant
} from "@/features/contact/utils/contact-submission-format";

interface ContactSubmissionColumnsOptions {
	sort: string;
	dir: "asc" | "desc";
	handleSorting: (sort: string, dir: "asc" | "desc") => void;
}

export function createContactSubmissionColumns({
	sort,
	dir,
	handleSorting
}: ContactSubmissionColumnsOptions): ColumnDef<ContactSubmission>[] {
	return [
		{
			accessorKey: "name",
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title="Sender"
					sort={sort}
					dir={dir}
					handleSorting={handleSorting}
				/>
			),
			cell: ({ row }) => (
				<div className="min-w-0">
					<div className="truncate font-medium">{row.original.name}</div>
					<div className="text-muted-foreground truncate text-xs">{row.original.email}</div>
				</div>
			)
		},
		{
			accessorKey: "subject",
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title="Subject"
					sort={sort}
					dir={dir}
					handleSorting={handleSorting}
				/>
			),
			cell: ({ row }) => (
				<span className="text-muted-foreground block max-w-64 truncate">
					{formatContactSubmissionSubject(row.original.subject)}
				</span>
			)
		},
		{
			accessorKey: "message",
			enableSorting: false,
			header: "Message",
			cell: ({ row }) => (
				<span className="text-muted-foreground block max-w-80 truncate">
					{row.original.message}
				</span>
			)
		},
		{
			accessorKey: "status",
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title="Status"
					sort={sort}
					dir={dir}
					handleSorting={handleSorting}
				/>
			),
			cell: ({ row }) => (
				<Badge variant={getContactSubmissionStatusVariant(row.original.status)}>
					{formatContactSubmissionStatus(row.original.status)}
				</Badge>
			)
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title="Received"
					sort={sort}
					dir={dir}
					handleSorting={handleSorting}
				/>
			),
			cell: ({ row }) => formatContactSubmissionDate(row.original.createdAt)
		},
		{
			id: "actions",
			enableSorting: false,
			header: "Actions",
			cell: ({ row }) => <ContactSubmissionRowActions submission={row.original} />
		}
	];
}
