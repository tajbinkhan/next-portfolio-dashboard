import type { Metadata } from "next";

import { ContactSubmissionsPage } from "@/features/contact/components/contact-submissions-page";

export const metadata: Metadata = {
	title: "Contact Inbox",
	description: "Review portfolio contact form submissions."
};

export default function ContactInboxRoutePage() {
	return <ContactSubmissionsPage />;
}
