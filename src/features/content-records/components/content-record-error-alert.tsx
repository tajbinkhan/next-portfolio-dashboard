"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ContentRecordErrorAlertProps {
	title?: string;
	error: unknown;
	onRetry: () => void;
}

export function ContentRecordErrorAlert({
	title = "Unable to load records",
	error,
	onRetry
}: ContentRecordErrorAlertProps) {
	const message = error instanceof Error ? error.message : "Please retry the request.";

	return (
		<Alert variant="destructive">
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<span>{message}</span>
				<Button type="button" variant="outline" size="sm" onClick={onRetry}>
					Retry
				</Button>
			</AlertDescription>
		</Alert>
	);
}
