import { APP_ROUTES } from "../../../shared/routes/app-routes";

export interface ISideBar {
    title: string,
    icon?: string,
    activeIcon?: string,
    path: string,
    queryParams?: any,
    children: any[],
    isVisible: boolean,
    isNotLink?: boolean,
    isNotLinkClass?: string,
    roleAccessibility: number[]
}

// Roles:
// 1: Admin
// 3: Member

const profileAccountRoutes: ISideBar[] = [
    {
        title: "Update email & password",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.updateCreds,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Billing",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.billing,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Invoices",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.userInvoices,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Notification Settings",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.notificationSetting,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Sound Settings",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.soundSetting,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Text me the app",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.textToApp,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Zoom",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.zoomProfile,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Saved Draft",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.saveDraft,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Livestream Recordings",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.liveStreamRecording,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Network Settings",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.networkSetting,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Badges",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.userBadges,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    }
];

const memberRoutes: ISideBar[] = [
    {
        title: "Current Members",
        icon: "",
        activeIcon: "",
        path: "",
        children: [],
        isVisible: true,
        isNotLink: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Members List",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.members,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Welcome New Members",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.memberInvite,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Message All Members",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.memberMsg,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Download Member List",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.downLoadMembers,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Member Communication",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.memberCommunication,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Incoming Members",
        icon: "",
        activeIcon: "",
        path: "",
        children: [],
        isVisible: true,
        isNotLink: true,
        isNotLinkClass: "mt-4",
        roleAccessibility: [1, 3]
    },
    {
        title: "Requests to Join",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.invites,
        queryParams: {view: 2},
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Sent Invites",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.invites,
        queryParams: {view: 1},
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
];

export const sideBarRoutes: ISideBar[] = [
    // visbile
    {
        title: "Home",
        icon: "assets/img/menu/home.png",
        activeIcon: "assets/img/menu/home-active.png",
        path: APP_ROUTES.dashboard,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Members",
        icon: "assets/img/menu/members.png",
        activeIcon: "assets/img/menu/members-active.png",
        path: APP_ROUTES.members,
        children: memberRoutes,
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    // {
    //     title: "About",
    //     icon: "assets/img/menu/about.png",
    //     activeIcon: "assets/img/menu/about-active.png",
    //     path: APP_ROUTES.login,
    //     children: [],
    //     isVisible: true,
    //     roleAccessibility: [1, 3]
    // },
    {
        title: "Invite",
        icon: "assets/img/menu/invite.png",
        activeIcon: "assets/img/menu/invite-active.png",
        path: APP_ROUTES.invites,
        queryParams: {view: 1},
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Topics",
        icon: "assets/img/menu/topic.png",
        activeIcon: "assets/img/menu/topic.png",
        path: APP_ROUTES.topics,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Events",
        icon: "assets/img/menu/event.png",
        activeIcon: "assets/img/menu/event-active.png",
        path: APP_ROUTES.events,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Tribes",
        icon: "assets/img/menu/tribes.png",
        activeIcon: "assets/img/menu/tribes-active.png",
        path: APP_ROUTES.tribes,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Workshops",
        icon: "assets/img/menu/workshop.png",
        activeIcon: "assets/img/menu/workshop-active.png",
        path: APP_ROUTES.workshops,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Tru Success Evaluation",
        icon: "assets/img/menu/tru.png",
        activeIcon: "assets/img/menu/tru-active.png",
        path: APP_ROUTES.tru,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Goal Setting",
        icon: "assets/img/menu/goal.png",
        activeIcon: "assets/img/menu/goal.png",
        path: APP_ROUTES.goal,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Settings",
        icon: "assets/img/menu/settings.png",
        activeIcon: "assets/img/menu/settings.png",
        path: APP_ROUTES.login,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },
    {
        title: "Plans",
        icon: "assets/img/menu/settings.png",
        activeIcon: "assets/img/menu/settings.png",
        path: APP_ROUTES.plans,
        children: [],
        isVisible: true,
        roleAccessibility: [1]
    },
    {
        title: "Need Help?",
        icon: "assets/img/menu/help.png",
        activeIcon: "assets/img/menu/help.png",
        path: APP_ROUTES.contact,
        children: [],
        isVisible: true,
        roleAccessibility: [1, 3]
    },

    // invisible
    {
        title: "Your Account",
        icon: "",
        activeIcon: "",
        path: APP_ROUTES.login,
        children: profileAccountRoutes,
        isVisible: false,
        roleAccessibility: [1, 3]
    },
];
