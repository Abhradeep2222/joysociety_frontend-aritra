import { environment } from "../../../environments/environment";

export class ApiRoutes {
    public static apiBaseUrl: string = environment.apiBaseUrl;

    // general purpose
    public static get ipConfig(): string {
        return 'https://ipapi.co/json/';
    }

    // auth module
    public static get login(): string {
        return this.apiBaseUrl + "user/login/";
    }

    public static get register(): string {
        return this.apiBaseUrl + "user/register/";
    }

    public static get forgotPasswordInitiate(): string {
        return this.apiBaseUrl + "user/forgot-password/initiate/";
    }

    public static get forgotPasswordReset(): string {
        return this.apiBaseUrl + "user/forgot-password/reset/";
    }

    // master data apis
    public static get location(): string {
        return this.apiBaseUrl + "master/location/";
    }

    public static get timezone(): string {
        return this.apiBaseUrl + "master/timezone/";
    }

    public static get country(): string {
        return this.apiBaseUrl + "master/country/";
    }

    public static get state(): string {
        return this.apiBaseUrl + "master/state/";
    }

    public static get city(): string {
        return this.apiBaseUrl + "master/city/";
    }

    public static get upload(): string {
        return this.apiBaseUrl + "master/media/upload/";
    }

    public static get roles(): string {
        return this.apiBaseUrl + "user/roles/";
    }

    // profile
    public static get profile(): string {
        return this.apiBaseUrl + "user/profile/";
    }

    public static get creds(): string {
        return this.apiBaseUrl + "user/credentials/";
    }

    public static get billingAddress(): string {
        return this.apiBaseUrl + "user/billing-address/";
    }
    public static get Invoices(): string {
        return this.apiBaseUrl + "user/invoices/";
    }
    public static get networkSetting(): string {
        return this.apiBaseUrl + "user/network-setting/";
    }
    public static get saveDraft(): string {
        return this.apiBaseUrl + "user/save-draft/";
    }
    public static get zoomProfile(): string {
        return this.apiBaseUrl + "user/zoom/";
    }
    public static get textToApp(): string {
        return this.apiBaseUrl + "user/text-me-the-app/";
    }
    public static get soundSetting(): string {
        return this.apiBaseUrl + "user/sound-setting/";
    }
    public static get notificationSetting(): string {
        return this.apiBaseUrl + "user/notification-setting/";
    }
    public static get liveStreamRecording(): string {
        return this.apiBaseUrl + "user/livestream-recording/";
    }

    // member flow
    public static get members(): string {
        return this.apiBaseUrl + "member/invite/list/";
    }

    public static get memberInvite(): string {
        return this.apiBaseUrl + "member/invite/create/";
    }

    public static get memberDetail(): string {
        return this.apiBaseUrl + "member/";
    }

    public static get memberRequestToJoin(): string {
        return this.apiBaseUrl + "member/request-to-join/list/";
    }

    public static get memberList(): string {
        return this.apiBaseUrl + "member/list/";
    }

    public static get inviteContent(): string {
        return this.apiBaseUrl + "member/content/";
    }

    public static get inviteStatus(): string {
        return this.apiBaseUrl + "member/invite/";
    }

    public static get memberRequestToJoinStatus(): string {
        return this.apiBaseUrl + "member/request-to-join/";
    }

    // Workshop flow
    public static get workshops(): string {
        return this.apiBaseUrl + "workshop/";
    }

    public static get reorderWorkshop(): string {
        return this.apiBaseUrl + "workshop/re-order/";
    }

    public static get workshopAddContent(): string {
        return this.apiBaseUrl + "workshop/add-content";
    }

    public static get workshopGetContent(): string {
        return this.apiBaseUrl + "workshop/get-content";
    }

    public static get workshopContent(): string {
        return this.apiBaseUrl + "workshop/content/";
    }

    // tru success evaluation
    public static get truPart1(): string {
        return this.apiBaseUrl + "goal/success-evaluation/";
    }

    public static get truQuestions(): string {
        return this.apiBaseUrl + "goal/success-sphere-question/";
    }

    public static get truSuccessReport(): string {
        return this.apiBaseUrl + "goal/success-evaluation-report/";
    }

    public static get downloadTruReport(): string {
        return this.apiBaseUrl + "goal/success-evaluation-pdf/";
    }

    // goals
    public static get goal(): string {
        return this.apiBaseUrl + "goal/";
    }

    public static get sphereList(): string {
        return this.apiBaseUrl + "goal/success-sphere/";
    }

    public static get goalReflection(): string {
        return this.apiBaseUrl + "goal/reflection/";
    }

    // Feed/posts
    public static get quickPost(): string {
        return this.apiBaseUrl + "feeds/quick-post/";
    }

    public static get longPost(): string {
        return this.apiBaseUrl + "feeds/long-post/";
    }

    public static get poll(): string {
        return this.apiBaseUrl + "feeds/question-poll/";
    }
    
    public static get timeLine(): string {
        return this.apiBaseUrl + "feeds/timeline/";
    }

    public static get answerPoll(): string {
        return this.apiBaseUrl + "feeds/answer-poll/";
    }

    public static get addComment(): string {
        return this.apiBaseUrl + "feeds/timeline/comment/add/";
    }

    public static get feedTimeLine(): string {
        return this.apiBaseUrl + "feeds/timeline/comment/";
    }

    // Events
    public static get events(): string {
        return this.apiBaseUrl + "event/";
    }

    public static get eventInvite(): string {
        return this.apiBaseUrl + "event/member/bulk-create/";
    }

    public static get acceptInvite(): string {
        return this.apiBaseUrl + "event/member/update/";
    }

    public static get eventMemberList(): string {
        return this.apiBaseUrl + "event/member/";
    }


    // Topic
    public static get topic(): string {
        return this.apiBaseUrl + "topic/";
    }

    // Tribe
    public static get tribe(): string {
        return this.apiBaseUrl + "tribe/";
    }

    // Plans
    public static get plans(): string {
        return this.apiBaseUrl + "product/";
    }

    public static get planDisable(): string {
        return this.apiBaseUrl + "product/disable/";
    }

    // Subscriptions
    public static get subscribe(): string {
        return this.apiBaseUrl + "user/subscribe/";
    }

    // Chat
    public static get chatChannel(): string {
        return this.apiBaseUrl + "chat/channel/"
    }

    public static get getChat(): string {
        return this.apiBaseUrl + "chat/message/"
    }

    public static get createChatMessage(): string {
        return this.apiBaseUrl + "chat/message/create/"
    }
}