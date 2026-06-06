"use client";

import { Audit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface ContentRecordTabsPageProps {
	title: string;
	description: string;
	breadcrumb: string;
	icon?: IconSvgElement;
	defaultValue: string;
	tabs: Array<{
		value: string;
		label: string;
		config: ContentRecordFeatureConfig;
	}>;
}

export function ContentRecordTabsPage({
	title,
	description,
	breadcrumb,
	icon,
	defaultValue,
	tabs
}: ContentRecordTabsPageProps) {
	return (
		<>
			<SetBreadcrumb
				items={[
					{ name: "Dashboard", href: route.private.dashboard },
					{ name: breadcrumb, isCurrent: true }
				]}
			/>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h1 className="flex items-center gap-2 text-2xl font-semibold tracking-normal">
						<HugeiconsIcon icon={icon ?? Audit01Icon} className="text-primary size-6" />
						{title}
					</h1>
					<p className="text-muted-foreground text-sm">{description}</p>
				</div>
				<Tabs defaultValue={defaultValue} className="gap-4">
					<TabsList className="flex h-auto w-full flex-wrap justify-start rounded-lg">
						{tabs.map(tab => (
							<TabsTrigger key={tab.value} value={tab.value}>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
					{tabs.map(tab => (
						<TabsContent key={tab.value} value={tab.value}>
							<ContentRecordListProvider
								endpoint={tab.config.apiEndpoint}
								resourceLabelPlural={tab.config.resourceLabelPlural}
							>
								<TabContent config={tab.config} />
							</ContentRecordListProvider>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</>
	);
}

function TabContent({ config }: { config: ContentRecordFeatureConfig }) {
	const router = useRouter();
	const { error, handleRefresh } = useContentRecordList();

	useEffect(() => {
		if (!error) return;
		handleRequestError(error, router, `Failed to load ${config.resourceLabelPlural.toLowerCase()}`);
	}, [config.resourceLabelPlural, error, router]);

	return (
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
	);
}
