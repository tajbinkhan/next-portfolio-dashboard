"use client";

import { Delete02Icon, MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";

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
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
	useDeleteContactSubmissionMutation,
	useUpdateContactSubmissionStatusMutation
} from "@/features/contact/actions/contact-submission.mutations";
import type {
	ContactSubmission,
	ContactSubmissionStatus
} from "@/features/contact/types/contact-submission.types";

interface ContactSubmissionRowActionsProps {
	submission: ContactSubmission;
}

export function ContactSubmissionRowActions({ submission }: ContactSubmissionRowActionsProps) {
	const updateStatusMutation = useUpdateContactSubmissionStatusMutation();
	const deleteMutation = useDeleteContactSubmissionMutation();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleStatusChange = (status: ContactSubmissionStatus) => {
		void toast.promise(updateStatusMutation.mutateAsync({ id: submission.id, status }), {
			loading: "Updating submission...",
			success: "Submission updated",
			error: "Failed to update submission"
		});
	};

	const handleDelete = () => {
		void toast.promise(deleteMutation.mutateAsync(submission.id), {
			loading: "Deleting submission...",
			success: "Contact submission deleted",
			error: "Failed to delete submission"
		});
		setDeleteDialogOpen(false);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						data-no-row-click
						aria-label={`Open actions for ${submission.email}`}
					>
						<HugeiconsIcon icon={MoreVerticalIcon} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-44" onClick={event => event.stopPropagation()}>
					<DropdownMenuItem
						onClick={() => handleStatusChange("READ")}
						disabled={submission.status === "READ" || updateStatusMutation.isPending}
					>
						Mark read
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleStatusChange("UNREAD")}
						disabled={submission.status === "UNREAD" || updateStatusMutation.isPending}
					>
						Mark unread
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleStatusChange("ARCHIVED")}
						disabled={submission.status === "ARCHIVED" || updateStatusMutation.isPending}
					>
						Archive
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => setDeleteDialogOpen(true)}
						variant="destructive"
					>
						<HugeiconsIcon icon={Delete02Icon} />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialogContent onClick={event => event.stopPropagation()}>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete contact submission</AlertDialogTitle>
						<AlertDialogDescription>
							This removes the inbound message from the dashboard inbox. This action cannot be
							undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
