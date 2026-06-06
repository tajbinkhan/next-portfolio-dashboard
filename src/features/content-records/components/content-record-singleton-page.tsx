"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateSingletonContentRecordMutation } from "@/features/content-records/actions/content-records.mutations";
import { useSingletonContentRecordQuery } from "@/features/content-records/actions/content-records.queries";
import { ContentRecordErrorAlert } from "@/features/content-records/components/content-record-error-alert";
import { ContentRecordFormFields } from "@/features/content-records/components/content-record-form-fields";
import { contentRecordFormSchema } from "@/features/content-records/schemas/content-records.schema";
import type {
	ContentRecordFeatureConfig,
	ContentRecordFormValues
} from "@/features/content-records/types/content-records.types";
import {
	createContentRecordFormValues,
	createContentRecordInput
} from "@/features/content-records/utils/content-record-format";
import { handleRequestError } from "@/lib/api/handle-request-error";
import { SetBreadcrumb } from "@/providers/breadcrumb-provider";
import { route } from "@/routes/routes";

interface ContentRecordSingletonPageProps {
	config: ContentRecordFeatureConfig;
}

export function ContentRecordSingletonPage({ config }: ContentRecordSingletonPageProps) {
	const router = useRouter();
	const recordQuery = useSingletonContentRecordQuery(config.apiEndpoint);
	const updateMutation = useUpdateSingletonContentRecordMutation();
	const form = useForm<ContentRecordFormValues>({
		resolver: zodResolver(contentRecordFormSchema),
		defaultValues: createContentRecordFormValues(config.fields)
	});

	useEffect(() => {
		if (recordQuery.data) {
			form.reset(createContentRecordFormValues(config.fields, recordQuery.data));
		}
	}, [config.fields, form, recordQuery.data]);

	useEffect(() => {
		if (!recordQuery.error) return;
		handleRequestError(recordQuery.error, router, `Failed to load ${config.resourceLabel.toLowerCase()}`);
	}, [config.resourceLabel, recordQuery.error, router]);

	const onSubmit = useCallback(
		(values: ContentRecordFormValues) => {
			updateMutation.mutate(
				{
					endpoint: config.apiEndpoint,
					...createContentRecordInput(config.fields, values)
				},
				{
					onSuccess: () => {
						toast.success(`${config.resourceLabel} updated`);
					},
					onError: error => {
						handleRequestError(error, router, `Failed to update ${config.resourceLabel.toLowerCase()}`);
					}
				}
			);
		},
		[config, router, updateMutation]
	);

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
					<h1 className="text-2xl font-semibold tracking-normal">{config.title}</h1>
					<p className="text-muted-foreground text-sm">{config.description}</p>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>{config.tableTitle}</CardTitle>
						<CardDescription>{config.tableDescription}</CardDescription>
					</CardHeader>
					<CardContent>
						{recordQuery.error ? (
							<ContentRecordErrorAlert error={recordQuery.error} onRetry={() => void recordQuery.refetch()} />
						) : recordQuery.isLoading ? (
							<div className="grid gap-4">
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-10 w-full" />
								<Skeleton className="h-40 w-full" />
							</div>
						) : (
							<FormProvider {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
									<ContentRecordFormFields
										fields={config.fields}
										disabled={updateMutation.isPending}
									/>
									<div className="flex justify-end">
										<Button type="submit" disabled={updateMutation.isPending}>
											{updateMutation.isPending ? "Saving" : "Save changes"}
										</Button>
									</div>
								</form>
							</FormProvider>
						)}
					</CardContent>
				</Card>
			</div>
		</>
	);
}
