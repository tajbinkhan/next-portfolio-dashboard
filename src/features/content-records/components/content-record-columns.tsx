"use client";

import {
	Delete02Icon,
	MoreVerticalIcon,
	UserEdit01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useDeleteContentRecordMutation } from "@/features/content-records/actions/content-records.mutations";
import { ContentRecordDialog } from "@/features/content-records/components/content-record-dialog";
import type {
	ContentRecord,
	ContentRecordFeatureConfig,
	ContentRecordSortDirection
} from "@/features/content-records/types/content-records.types";
import { handleRequestError } from "@/lib/api/handle-request-error";

interface CreateContentRecordColumnsOptions {
	config: ContentRecordFeatureConfig;
	sort: string;
	dir: ContentRecordSortDirection;
	handleSorting: (sort: string, dir: ContentRecordSortDirection) => void;
}

export function createContentRecordColumns({
	config,
	sort,
	dir,
	handleSorting
}: CreateContentRecordColumnsOptions): ColumnDef<ContentRecord>[] {
	const createHeader = (label: string, key: string) => (
		<Button
			type="button"
			variant="ghost"
			size="sm"
			className="-ml-3"
			onClick={() => handleSorting(key, sort === key && dir === "asc" ? "desc" : "asc")}
		>
			{label}
		</Button>
	);

	return [
		{
			accessorKey: "title",
			header: () => createHeader("Title", "title"),
			cell: ({ row }) => (
				<div className="min-w-44">
					<div className="font-medium">{row.original.title || "Untitled"}</div>
					<div className="text-muted-foreground text-xs">{row.original.slug || "No slug"}</div>
				</div>
			)
		},
		{
			accessorKey: "status",
			header: () => createHeader("Status", "status"),
			cell: ({ row }) => (
				<Badge variant={row.original.status === "PUBLISHED" ? "default" : "secondary"}>
					{row.original.status === "PUBLISHED" ? "Published" : "Draft"}
				</Badge>
			)
		},
		{
			accessorKey: "isVisible",
			header: "Visible",
			cell: ({ row }) => <Switch checked={row.original.isVisible} disabled aria-label="Visible" />
		},
		{
			accessorKey: "sortOrder",
			header: () => createHeader("Order", "sortOrder"),
			cell: ({ row }) => row.original.sortOrder
		},
		{
			accessorKey: "updatedAt",
			header: () => createHeader("Updated", "updatedAt"),
			cell: ({ row }) => (
				<span className="text-muted-foreground text-sm">
					{format(new Date(row.original.updatedAt), "PP p")}
				</span>
			)
		},
		{
			id: "actions",
			header: "Action",
			cell: ({ row }) => <ContentRecordRowActions config={config} record={row.original} />
		}
	];
}

function ContentRecordRowActions({
	config,
	record
}: {
	config: ContentRecordFeatureConfig;
	record: ContentRecord;
}) {
	const router = useRouter();
	const deleteMutation = useDeleteContentRecordMutation();
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const handleDelete = () => {
		deleteMutation.mutate(
			{
				endpoint: config.apiEndpoint,
				id: record.id
			},
			{
				onSuccess: () => {
					toast.success(`${config.resourceLabel} deleted`);
					setDeleteOpen(false);
				},
				onError: error => {
					handleRequestError(error, router, `Failed to delete ${config.resourceLabel.toLowerCase()}`);
				}
			}
		);
	};

	return (
		<div data-no-row-click="true">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						aria-label={`Open actions for ${record.title || config.resourceLabel}`}
					>
						<HugeiconsIcon icon={MoreVerticalIcon} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" onClick={event => event.stopPropagation()}>
					<DropdownMenuItem
						onSelect={event => {
							event.preventDefault();
							setEditOpen(true);
						}}
					>
						<HugeiconsIcon icon={UserEdit01Icon} />
						Edit {config.resourceLabel.toLowerCase()}
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						variant="destructive"
						onSelect={event => {
							event.preventDefault();
							setDeleteOpen(true);
						}}
					>
						<HugeiconsIcon icon={Delete02Icon} />
						Delete {config.resourceLabel.toLowerCase()}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<ContentRecordDialog
				config={config}
				record={record}
				open={editOpen}
				onOpenChange={setEditOpen}
			/>
			<AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<AlertDialogContent onClick={event => event.stopPropagation()}>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete {config.resourceLabel.toLowerCase()}</AlertDialogTitle>
						<AlertDialogDescription>
							This action removes “{record.title || "Untitled"}” from the dashboard content API.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={deleteMutation.isPending}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{deleteMutation.isPending ? "Deleting" : "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
