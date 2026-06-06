"use client";

import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactSubmissionErrorAlert } from "@/features/contact/components/contact-submission-error-alert";
import { ContactSubmissionsTable } from "@/features/contact/components/contact-submissions-table";
import {
	ContactSubmissionListProvider,
	useContactSubmissionList
} from "@/features/contact/hooks/use-contact-submission-list";
import { handleRequestError } from "@/lib/api/handle-request-error";
import { SetBreadcrumb } from "@/providers/breadcrumb-provider";
import { route } from "@/routes/routes";

const breadcrumbItems = [
	{ name: "Dashboard", href: route.private.dashboard },
	{ name: "Contact Inbox", isCurrent: true }
];

export function ContactSubmissionsPage() {
	return (
		<ContactSubmissionListProvider>
			<ContactSubmissionsPageContent />
		</ContactSubmissionListProvider>
	);
}

function ContactSubmissionsPageContent() {
	const router = useRouter();
	const { error, handleRefresh } = useContactSubmissionList();

	useEffect(() => {
		if (!error) return;
		handleRequestError(error, router, "Failed to load contact submissions");
	}, [error, router]);

	return (
		<>
			<SetBreadcrumb items={breadcrumbItems} />
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<h1 className="flex items-center gap-2 text-2xl font-semibold tracking-normal">
							<HugeiconsIcon icon={Mail01Icon} className="text-primary size-6" />
							Contact Inbox
						</h1>
						<p className="text-muted-foreground text-sm">
							Review inbound messages from the public portfolio contact form.
						</p>
					</div>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Inbound Messages</CardTitle>
						<CardDescription>
							Search, inspect, archive, or delete portfolio contact form submissions.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						{error ? <ContactSubmissionErrorAlert error={error} onRetry={handleRefresh} /> : null}
						<ContactSubmissionsTable />
					</CardContent>
				</Card>
			</div>
		</>
	);
}
