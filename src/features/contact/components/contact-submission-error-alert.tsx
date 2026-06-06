"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ContactSubmissionErrorAlertProps {
	error: unknown;
	onRetry: () => void;
}

export function ContactSubmissionErrorAlert({ error, onRetry }: ContactSubmissionErrorAlertProps) {
	const message = error instanceof Error ? error.message : "Please retry the request.";

	return (
		<Alert variant="destructive">
			<AlertTitle>Unable to load contact submissions</AlertTitle>
			<AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<span>{message}</span>
				<Button type="button" variant="outline" size="sm" onClick={onRetry}>
					Retry
				</Button>
			</AlertDescription>
		</Alert>
	);
}
