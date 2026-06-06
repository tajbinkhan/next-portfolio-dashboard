"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusSignCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	useCreateContentRecordMutation,
	useUpdateContentRecordMutation,
	useUpdateSingletonContentRecordMutation
} from "@/features/content-records/actions/content-records.mutations";
import { ContentRecordFormFields } from "@/features/content-records/components/content-record-form-fields";
import { contentRecordFormSchema } from "@/features/content-records/schemas/content-records.schema";
import type {
	ContentRecord,
	ContentRecordFeatureConfig,
	ContentRecordFormValues
} from "@/features/content-records/types/content-records.types";
import {
	createContentRecordFormValues,
	createContentRecordInput
} from "@/features/content-records/utils/content-record-format";
import { handleRequestError } from "@/lib/api/handle-request-error";

interface ContentRecordDialogProps {
	config: ContentRecordFeatureConfig;
	record?: ContentRecord | null;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	triggerLabel?: string;
}

export function ContentRecordDialog({
	config,
	record,
	open,
	onOpenChange,
	triggerLabel
}: ContentRecordDialogProps) {
	const router = useRouter();
	const createMutation = useCreateContentRecordMutation();
	const updateMutation = useUpdateContentRecordMutation();
	const updateSingletonMutation = useUpdateSingletonContentRecordMutation();
	const isEditing = Boolean(record);
	const isPending =
		createMutation.isPending || updateMutation.isPending || updateSingletonMutation.isPending;

	const form = useForm<ContentRecordFormValues>({
		resolver: zodResolver(contentRecordFormSchema),
		defaultValues: createContentRecordFormValues(config.fields, record)
	});

	useEffect(() => {
		if (open) {
			form.reset(createContentRecordFormValues(config.fields, record));
		}
	}, [config.fields, form, open, record]);

	const onSubmit = useCallback(
		(values: ContentRecordFormValues) => {
			const input = createContentRecordInput(config.fields, values);
			const onSuccess = () => {
				toast.success(
					isEditing ? `${config.resourceLabel} updated` : `${config.resourceLabel} created`
				);
				onOpenChange?.(false);
			};
			const onError = (error: unknown) => {
				handleRequestError(error, router, `Failed to save ${config.resourceLabel.toLowerCase()}`);
			};

			if (config.singleton) {
				updateSingletonMutation.mutate(
					{
						endpoint: config.apiEndpoint,
						...input
					},
					{ onSuccess, onError }
				);
				return;
			}

			if (record) {
				updateMutation.mutate(
					{
						endpoint: config.apiEndpoint,
						id: record.id,
						...input
					},
					{ onSuccess, onError }
				);
				return;
			}

			createMutation.mutate(
				{
					endpoint: config.apiEndpoint,
					...input
				},
				{ onSuccess, onError }
			);
		},
		[
			config,
			createMutation,
			isEditing,
			onOpenChange,
			record,
			router,
			updateMutation,
			updateSingletonMutation
		]
	);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{onOpenChange && !record ? (
				<Button type="button" onClick={() => onOpenChange(true)}>
					<HugeiconsIcon icon={PlusSignCircleIcon} data-icon="inline-start" />
					{triggerLabel ?? `Create ${config.resourceLabel.toLowerCase()}`}
				</Button>
			) : null}
			<DialogContent
				className="max-h-[calc(100dvh-2rem)] overflow-hidden sm:max-w-3xl"
				onClick={event => event.stopPropagation()}
			>
				<FormProvider {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid max-h-[calc(100dvh-5rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-6"
					>
						<DialogHeader>
							<DialogTitle>
								{isEditing || config.singleton
									? `Edit ${config.resourceLabel}`
									: `Create ${config.resourceLabel}`}
							</DialogTitle>
							<DialogDescription>{config.description}</DialogDescription>
						</DialogHeader>
						<ScrollArea className="min-h-0 pr-3">
							<ContentRecordFormFields fields={config.fields} disabled={isPending} />
						</ScrollArea>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isPending}>
								{isPending ? "Saving" : "Save"}
							</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
}
