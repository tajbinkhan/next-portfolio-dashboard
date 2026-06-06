"use client";

import { Audit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentRecordErrorAlert } from "@/features/content-records/components/content-record-error-alert";
import { ContentRecordTable } from "@/features/content-records/components/content-record-table";
import {
	ContentRecordListProvider,
	useContentRecordList
} from "@/features/content-records/hooks/use-content-record-list";
import type { ContentRecordFeatureConfig } from "@/features/content-records/types/content-records.types";
import { handleRequestError } from "@/lib/api/handle-request-error";
import { SetBreadcrumb } from "@/providers/breadcrumb-provider";
import { route } from "@/routes/routes";

interface ContentRecordPageProps {
	config: ContentRecordFeatureConfig;
}

export function ContentRecordPage({ config }: ContentRecordPageProps) {
	return (
		<ContentRecordListProvider
			endpoint={config.apiEndpoint}
			resourceLabelPlural={config.resourceLabelPlural}
		>
			<ContentRecordPageContent config={config} />
		</ContentRecordListProvider>
	);
}

function ContentRecordPageContent({ config }: ContentRecordPageProps) {
	const router = useRouter();
	const { error, handleRefresh } = useContentRecordList();

	useEffect(() => {
		if (!error) return;
		handleRequestError(error, router, `Failed to load ${config.resourceLabelPlural.toLowerCase()}`);
	}, [config.resourceLabelPlural, error, router]);

	return (
		<>
			<SetBreadcrumb
				items={[
					{ name: "Dashboard", href: route.private.dashboard },
					{ name: config.breadcrumb, isCurrent: true }
				]}
			/>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h1 className="flex items-center gap-2 text-2xl font-semibold tracking-normal">
						<HugeiconsIcon icon={config.icon ?? Audit01Icon} className="text-primary size-6" />
						{config.title}
					</h1>
					<p className="text-muted-foreground text-sm">{config.description}</p>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>{config.tableTitle}</CardTitle>
						<CardDescription>{config.tableDescription}</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						{error ? <ContentRecordErrorAlert error={error} onRetry={handleRefresh} /> : null}
						<ContentRecordTable config={config} />
					</CardContent>
				</Card>
			</div>
		</>
	);
}
