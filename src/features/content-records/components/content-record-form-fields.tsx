"use client";

import type { Path } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type {
	ContentFieldConfig,
	ContentRecordFormValues
} from "@/features/content-records/types/content-records.types";

interface ContentRecordFormFieldsProps {
	fields: ContentFieldConfig[];
	disabled?: boolean;
}

export function ContentRecordFormFields({ fields, disabled }: ContentRecordFormFieldsProps) {
	const form = useFormContext<ContentRecordFormValues>();

	return (
		<FieldGroup>
			<div className="grid gap-4 md:grid-cols-2">
				<Field>
					<FieldLabel htmlFor="content-record-title">Title</FieldLabel>
					<Input
						id="content-record-title"
						disabled={disabled}
						placeholder="Display title"
						{...form.register("title")}
					/>
					<FieldError errors={[form.formState.errors.title]} />
				</Field>
				<Field>
					<FieldLabel htmlFor="content-record-slug">Slug</FieldLabel>
					<Input
						id="content-record-slug"
						disabled={disabled}
						placeholder="content-slug"
						{...form.register("slug")}
					/>
					<FieldError errors={[form.formState.errors.slug]} />
				</Field>
				<Field>
					<FieldLabel>Status</FieldLabel>
					<Controller
						control={form.control}
						name="status"
						render={({ field }) => (
							<Select value={field.value} onValueChange={field.onChange} disabled={disabled}>
								<SelectTrigger>
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="DRAFT">Draft</SelectItem>
									<SelectItem value="PUBLISHED">Published</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
					<FieldError errors={[form.formState.errors.status]} />
				</Field>
				<Field>
					<FieldLabel htmlFor="content-record-sort-order">Sort order</FieldLabel>
					<Input
						id="content-record-sort-order"
						type="number"
						min={0}
						disabled={disabled}
						{...form.register("sortOrder", { valueAsNumber: true })}
					/>
					<FieldError errors={[form.formState.errors.sortOrder]} />
				</Field>
				<Field orientation="horizontal" className="md:col-span-2">
					<Controller
						control={form.control}
						name="isVisible"
						render={({ field }) => (
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
								disabled={disabled}
								aria-label="Visible"
							/>
						)}
					/>
					<div>
						<FieldLabel>Visible</FieldLabel>
						<FieldDescription>Show this record in dashboard-driven content.</FieldDescription>
					</div>
				</Field>
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				{fields.map(field => (
					<PayloadField key={field.name} field={field} disabled={disabled} />
				))}
			</div>
		</FieldGroup>
	);
}

function PayloadField({ field, disabled }: { field: ContentFieldConfig; disabled?: boolean }) {
	const form = useFormContext<ContentRecordFormValues>();
	const path = `payload.${field.name}` as Path<ContentRecordFormValues>;
	const id = `content-record-payload-${field.name}`;

	if (field.type === "switch") {
		return (
			<Field orientation="horizontal">
				<Controller
					control={form.control}
					name={path}
					render={({ field: controllerField }) => (
						<Switch
							checked={Boolean(controllerField.value)}
							onCheckedChange={controllerField.onChange}
							disabled={disabled}
							aria-label={field.label}
						/>
					)}
				/>
				<div>
					<FieldLabel>{field.label}</FieldLabel>
					{field.description ? <FieldDescription>{field.description}</FieldDescription> : null}
				</div>
			</Field>
		);
	}

	if (field.type === "textarea") {
		return (
			<Field className="md:col-span-2">
				<FieldLabel htmlFor={id}>{field.label}</FieldLabel>
				<Textarea
					id={id}
					disabled={disabled}
					placeholder={field.placeholder}
					{...form.register(path)}
				/>
				{field.description ? <FieldDescription>{field.description}</FieldDescription> : null}
			</Field>
		);
	}

	return (
		<Field>
			<FieldLabel htmlFor={id}>{field.label}</FieldLabel>
			<Input
				id={id}
				type={getPayloadInputType(field.type)}
				disabled={disabled}
				placeholder={field.placeholder}
				{...form.register(path, { valueAsNumber: field.type === "number" })}
			/>
			{field.description ? <FieldDescription>{field.description}</FieldDescription> : null}
		</Field>
	);
}

function getPayloadInputType(type: ContentFieldConfig["type"]) {
	if (type === "number" || type === "email" || type === "url" || type === "date") return type;
	return "text";
}
