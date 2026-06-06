import type {
	ContentFieldConfig,
	ContentRecord,
	ContentRecordFormValues,
	ContentRecordInput
} from "@/features/content-records/types/content-records.types";

export function createContentRecordFormValues(
	fields: ContentFieldConfig[],
	record?: ContentRecord | null
): ContentRecordFormValues {
	const payload = normalizePayloadForForm(fields, record?.payload ?? {});

	return {
		title: record?.title ?? "",
		slug: record?.slug ?? "",
		status: record?.status ?? "DRAFT",
		isVisible: record?.isVisible ?? true,
		sortOrder: record?.sortOrder ?? 0,
		payload
	};
}

export function createContentRecordInput(
	fields: ContentFieldConfig[],
	values: ContentRecordFormValues
): ContentRecordInput {
	const structuredPayload = normalizePayloadForApi(fields, values.payload);

	return {
		title: emptyToNull(values.title),
		slug: emptyToNull(values.slug),
		status: values.status,
		isVisible: values.isVisible,
		sortOrder: values.sortOrder,
		payload: structuredPayload
	};
}

export function formatPayloadPreview(record: ContentRecord): string {
	return JSON.stringify(record.payload, null, 2);
}

function normalizePayloadForForm(
	fields: ContentFieldConfig[],
	payload: Record<string, unknown>
): Record<string, unknown> {
	const nextPayload = { ...payload };

	for (const field of fields) {
		const value = nextPayload[field.name];
		if (field.type === "tags" && Array.isArray(value)) {
			nextPayload[field.name] = value.join(", ");
		}
	}

	return nextPayload;
}

function normalizePayloadForApi(
	fields: ContentFieldConfig[],
	payload: Record<string, unknown>
): Record<string, unknown> {
	const nextPayload: Record<string, unknown> = {};

	for (const field of fields) {
		const value = payload[field.name];

		if (field.type === "tags") {
			nextPayload[field.name] =
				typeof value === "string"
					? value
							.split(",")
							.map(item => item.trim())
							.filter(Boolean)
					: [];
			continue;
		}

		if (field.type === "number") {
			nextPayload[field.name] = typeof value === "number" && Number.isFinite(value) ? value : 0;
			continue;
		}

		if (field.type === "switch") {
			nextPayload[field.name] = Boolean(value);
			continue;
		}

		nextPayload[field.name] = typeof value === "string" ? value.trim() : value ?? "";
	}

	return nextPayload;
}

function emptyToNull(value: string): string | null {
	const trimmed = value.trim();
	return trimmed || null;
}
