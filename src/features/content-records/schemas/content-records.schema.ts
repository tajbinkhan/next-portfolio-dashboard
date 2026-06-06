import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";
import { z } from "zod";

import {
	contentRecordSortDirectionValues,
	contentRecordSortValues,
	contentRecordStatusValues
} from "@/features/content-records/types/content-records.types";

export const contentRecordSearchParams = {
	page: parseAsInteger.withDefault(1),
	pageSize: parseAsInteger.withDefault(10),
	search: parseAsString.withDefault(""),
	status: parseAsString.withDefault(""),
	isVisible: parseAsString.withDefault(""),
	sort: parseAsStringEnum([...contentRecordSortValues]).withDefault("createdAt"),
	dir: parseAsStringEnum([...contentRecordSortDirectionValues]).withDefault("desc")
};

export const contentRecordFormSchema = z.object({
	title: z.string().trim(),
	slug: z.string().trim(),
	status: z.enum(contentRecordStatusValues),
	isVisible: z.boolean(),
	sortOrder: z.number().int().min(0),
	payload: z.record(z.string(), z.unknown())
});
