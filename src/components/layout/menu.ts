import {
	Audit01Icon,
	ComputerProtectionIcon,
	DashboardSquare01Icon,
	Mail01Icon,
	MailSettingIcon,
	UserGroupIcon,
	UserIcon
} from "@hugeicons/core-free-icons";

import type { NavItemProps, NavUserMaxItemProps } from "@/components/layout/layout.types";
import { route } from "@/routes/routes";

const userItems: NavUserMaxItemProps = [
	{
		title: "Profile",
		url: route.private.profile,
		icon: UserIcon
	},
	{
		title: "Sessions",
		url: route.private.sessions,
		icon: ComputerProtectionIcon
	}
];

const navPlatformItem: NavItemProps[] = [
	{
		title: "Dashboard",
		url: route.private.dashboard,
		icon: DashboardSquare01Icon
		// items: [{ title: "Profile", url: route.private.profile }],
	},
	{
		title: "Users",
		url: route.private.users,
		icon: UserGroupIcon,
		roles: ["ADMIN", "SUPER_ADMIN"]
	}
];

const navContentItem: NavItemProps[] = [
	{
		title: "Skills",
		url: route.private.contentSkills,
		icon: UserIcon
	},
	{
		title: "Projects",
		url: route.private.contentProjects,
		icon: ComputerProtectionIcon
	},
	{
		title: "Experience",
		url: route.private.contentExperience,
		icon: UserGroupIcon
	},
	{
		title: "Profile",
		url: route.private.contentProfile,
		icon: UserIcon
	}
];

const navContactItem: NavItemProps[] = [
	{
		title: "Contact Inbox",
		url: route.private.contact,
		icon: Mail01Icon
	}
];

const navSystemItem: NavItemProps[] = [
	{
		title: "System Settings",
		url: route.private.system,
		icon: Audit01Icon,
		roles: ["ADMIN", "SUPER_ADMIN"]
	}
];

const navLogsItem: NavItemProps[] = [
	{
		title: "Email Logs",
		url: route.private.emailLogs,
		icon: Mail01Icon,
		roles: ["ADMIN", "SUPER_ADMIN"]
	},
	{
		title: "Audit Logs",
		url: route.private.auditLogs,
		icon: Audit01Icon,
		roles: ["ADMIN", "SUPER_ADMIN"]
	}
];

const navSMTPItem: NavItemProps[] = [
	{
		title: "SMTP Providers",
		url: route.private.smtpProviders,
		icon: Mail01Icon,
		roles: ["ADMIN", "SUPER_ADMIN"]
	},
	{
		title: "Email Templates",
		url: route.private.emailTemplates,
		icon: MailSettingIcon,
		roles: ["ADMIN", "SUPER_ADMIN"]
	}
];

export {
	navContactItem,
	navContentItem,
	navLogsItem,
	navPlatformItem,
	navSMTPItem,
	navSystemItem,
	userItems
};
