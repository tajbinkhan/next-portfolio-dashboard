"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ContactSubmission } from "@/features/contact/types/contact-submission.types";
import {
	formatContactSubmissionDate,
	formatContactSubmissionStatus,
	formatContactSubmissionSubject,
	formatMetadataJson,
	getContactSubmissionStatusVariant
} from "@/features/contact/utils/contact-submission-format";

interface ContactSubmissionDetailsProps {
	submission: ContactSubmission;
}

export function ContactSubmissionDetails({ submission }: ContactSubmissionDetailsProps) {
	return (
		<div className="grid gap-5">
			<section className="grid gap-3">
				<div className="flex flex-wrap items-center gap-2">
					<Badge variant={getContactSubmissionStatusVariant(submission.status)}>
						{formatContactSubmissionStatus(submission.status)}
					</Badge>
					<Badge variant="outline">{formatContactSubmissionSubject(submission.subject)}</Badge>
				</div>
				<p className="text-muted-foreground text-sm">
					Inbound portfolio contact form message from {submission.email}.
				</p>
			</section>

			<Separator />

			<section className="grid gap-3">
				<h3 className="text-sm font-medium">Sender</h3>
				<div className="grid gap-3 sm:grid-cols-2">
					<DetailItem label="Name" value={submission.name} />
					<DetailItem label="Email" value={submission.email} />
				</div>
			</section>

			<Separator />

			<section className="grid gap-3">
				<h3 className="text-sm font-medium">Message</h3>
				<DetailItem
					label="Subject"
					value={formatContactSubmissionSubject(submission.subject)}
				/>
				<p className="bg-muted text-muted-foreground rounded-md p-3 text-sm leading-relaxed whitespace-pre-wrap">
					{submission.message}
				</p>
			</section>

			<Separator />

			<section className="grid gap-3">
				<h3 className="text-sm font-medium">Timestamps</h3>
				<div className="grid gap-3 sm:grid-cols-2">
					<DetailItem label="Received" value={formatContactSubmissionDate(submission.createdAt)} />
					<DetailItem label="Updated" value={formatContactSubmissionDate(submission.updatedAt)} />
				</div>
			</section>

			<Separator />

			<section className="grid gap-3">
				<h3 className="text-sm font-medium">Metadata</h3>
				<pre className="bg-muted text-muted-foreground max-h-80 overflow-auto rounded-md p-3 text-xs leading-relaxed whitespace-pre-wrap">
					{formatMetadataJson(submission.metadata)}
				</pre>
			</section>
		</div>
	);
}

function DetailItem({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<div className="text-muted-foreground text-xs">{label}</div>
			<div className="text-sm wrap-break-word">{value}</div>
		</div>
	);
}
