"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/common/table/data-table";
import { ContactSubmissionDetails } from "@/features/contact/components/contact-submission-details";
import { createContactSubmissionColumns } from "@/features/contact/components/contact-submission-columns";
import { ContactSubmissionsToolbar } from "@/features/contact/components/contact-submissions-toolbar";
import { useContactSubmissionList } from "@/features/contact/hooks/use-contact-submission-list";

export function ContactSubmissionsTable() {
	const {
		tableData,
		pagination,
		isLoading,
		handleOptionFilter,
		sort,
		dir,
		handleSorting
	} = useContactSubmissionList();
	const columns = useMemo(
		() =>
			createContactSubmissionColumns({
				sort,
				dir,
				handleSorting
			}),
		[dir, handleSorting, sort]
	);

	return (
		<DataTable
			columns={columns}
			isLoading={isLoading}
			data={tableData}
			pagination={pagination}
			handleOptionFilter={handleOptionFilter}
			DataTableToolbar={ContactSubmissionsToolbar}
			emptyTitle="No contact submissions found"
			emptyDescription="Portfolio contact form messages matching your filters will appear here."
			rowDetailsTitle="Contact submission details"
			rowDetailsDescription="Full inbound message details and source metadata."
			renderRowDetails={submission => <ContactSubmissionDetails submission={submission} />}
		/>
	);
}
