import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { APP_ROUTES } from "../../shared/routes/app-routes";
import { AdminOnlyGuard, MemberOnlyGuard } from "../../shared/guards";
import { HomeComponent } from './home/home.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { UpdateCredsComponent } from './profile/update-creds/update-creds.component';
import { BillingComponent } from './profile/billing/billing.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberInviteComponent } from './members/member-invite/member-invite.component';
import { MemberMessageComponent } from './members/member-message/member-message.component';
import { DownloadMembersComponent } from './members/download-members/download-members.component';
import { MemberCommunicationComponent } from './members/member-communication/member-communication.component';
import { InviteListComponent } from './invite/invite-list/invite-list.component';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { WorkshopListComponent } from './workshop/workshop-list/workshop-list.component';
import { WorkshopFormComponent } from './workshop/workshop-form/workshop-form.component';
import { TruIntroductionComponent } from './tru-success/tru-introduction/tru-introduction.component';
import { TruPartOneComponent } from './tru-success/tru-part-one/tru-part-one.component';
import { TruPartOneReportComponent } from './tru-success/tru-part-one-report/tru-part-one-report.component';
import { TruPartTwoComponent } from './tru-success/tru-part-two/tru-part-two.component';
import { TruPartTwoReportComponent } from './tru-success/tru-part-two-report/tru-part-two-report.component';
import { WorkshopOrderComponent } from './workshop/workshop-order/workshop-order.component';
import { GoalComponent } from './goal/goal.component';
import { GoalListComponent } from './goal/goal-list/goal-list.component';
import { ReflectionComponent } from './goal/reflection/reflection.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { TribeListComponent } from './tribes/tribe-list/tribe-list.component';
import { TribeFormComponent } from './tribes/tribe-form/tribe-form.component';
import { PlansListComponent } from './plans/plans-list/plans-list.component';
import { PlansFormComponent } from './plans/plans-form/plans-form.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { WorkshopViewComponent } from './workshop/workshop-view/workshop-view.component';
import { TribeViewComponent } from './tribes/tribe-view/tribe-view.component';
import { PendingGoalUpdateComponent } from './goal/pending-goal-update/pending-goal-update.component';
import { TopicsComponent } from "./topics/topics.component";
import { ContactComponent } from "./contact/contact.component";
import { BadgesComponent } from "./profile/badges/badges.component";
import { InvoicesComponent } from "./profile/invoices/invoices.component";
import { NetworkSettingComponent } from "./profile/network-setting/network-setting.component";
import { LivestreamRecordingComponent } from "./profile/livestream-recording/livestream-recording.component";
import { TextToAppComponent } from "./profile/text-to-app/text-to-app.component";
import { ZoomProfileComponent } from "./profile/zoom-profile/zoom-profile.component";
import { SoundSettingsComponent } from "./profile/sound-settings/sound-settings.component";
import { SaveDraftComponent } from "./profile/save-draft/save-draft.component";
import { NotificationSettingsComponent } from "./profile/notification-settings/notification-settings.component";
const routes: Routes = [
	{
		path: APP_ROUTES.dashboard,
		component: HomeComponent,
	},
	{
		path: APP_ROUTES.dashboard+'/:topic',
		component: HomeComponent,
	},
	{
		path:APP_ROUTES.topics,
		component:TopicsComponent
	},
	{
		path: APP_ROUTES.profileEdit,
		component: ProfileEditComponent,
	},
	{
		path: APP_ROUTES.updateCreds,
		component: UpdateCredsComponent,
	},
	{
		path: APP_ROUTES.billing,
		component: BillingComponent,
	},
	{
		path: APP_ROUTES.members,
		component: MemberListComponent,
	},
	{
		path: APP_ROUTES.memberInvite,
		component: MemberInviteComponent,
	},
	{
		path: APP_ROUTES.memberMsg,
		component: MemberMessageComponent,
	},
	{
		path: APP_ROUTES.downLoadMembers,
		component: DownloadMembersComponent,
	},
	{
		path: APP_ROUTES.memberCommunication,
		component: MemberCommunicationComponent,
	},
	{
		path: APP_ROUTES.invites,
		component: InviteListComponent,
	},
	{
		path: APP_ROUTES.members + "/:id",
		component: MemberProfileComponent,
	},
	{
		path: APP_ROUTES.workshops,
		component: WorkshopListComponent,
	},
	{
		path: APP_ROUTES.workshops + "/create",
		component: WorkshopFormComponent,
	},
	{
		path: APP_ROUTES.workshops + "/reorder",
		component: WorkshopOrderComponent,
	},
	{
		path: APP_ROUTES.workshops + "/:id",
		component: WorkshopFormComponent,
	},
	{
		path: APP_ROUTES.workshops + "/detail/:id",
		component: WorkshopViewComponent,
	},
	{
		path: APP_ROUTES.tru,
		component: TruIntroductionComponent,
	},
	{
		path: APP_ROUTES.truPart1,
		component: TruPartOneComponent,
	},
	{
		path: APP_ROUTES.truPart1Report,
		component: TruPartOneReportComponent,
	},
	{
		path: APP_ROUTES.truPart2,
		component: TruPartTwoComponent,
	},
	{
		path: APP_ROUTES.truPart2Report,
		component: TruPartTwoReportComponent,
	},
	{
		path: APP_ROUTES.goal,
		component: GoalComponent,
	},
	{
		path: APP_ROUTES.goal + "/create",
		component: ReflectionComponent,
	},
	{
		path: APP_ROUTES.goal + "/:id",
		component: GoalListComponent,
	},
	{
		path: APP_ROUTES.goal + "/pending/:id",
		component: PendingGoalUpdateComponent,
	},
	{
		path: APP_ROUTES.events,
		component: EventListComponent,
	},
	{
		path: APP_ROUTES.events + "/create",
		component: EventFormComponent,
	},
	{
		path: APP_ROUTES.events + "/:id",
		component: EventFormComponent,
	},
	{
		path: APP_ROUTES.eventDetail + "/:id",
		component: EventDetailComponent,
	},
	{
		path: APP_ROUTES.tribes,
		component: TribeListComponent,
	},
	{
		path: APP_ROUTES.tribes + "/create",
		component: TribeFormComponent,
	},
	{
		path: APP_ROUTES.tribes + "/:id",
		component: TribeFormComponent,
	},
	{
		path: APP_ROUTES.tribes + "/detail/:id",
		component: TribeViewComponent,
	},
	{
		path: APP_ROUTES.plans,
		component: PlansListComponent,
		canActivate: [AdminOnlyGuard]
	},
	{
		path: APP_ROUTES.plans + "/create",
		component: PlansFormComponent,
		canActivate: [AdminOnlyGuard]
	},
	{
		path: APP_ROUTES.plans + "/:id",
		component: PlansFormComponent,
		canActivate: [AdminOnlyGuard]
	},
	{
		path: APP_ROUTES.subscriptions,
		component: SubscriptionsComponent,
		canActivate: [MemberOnlyGuard]
	},
	{
		path:APP_ROUTES.topic,
		component:TopicsComponent,
	},
	{
		path:APP_ROUTES.contact,
		component:ContactComponent
	},
	{
		path:APP_ROUTES.userBadges,
		component:BadgesComponent
	},
	{
		path:APP_ROUTES.userInvoices,
		component:InvoicesComponent
	},
	{
		path:APP_ROUTES.notificationSetting,
		component:NotificationSettingsComponent
	},
	{
		path:APP_ROUTES.networkSetting,
		component:NetworkSettingComponent
	},
	{
		path:APP_ROUTES.liveStreamRecording,
		component:LivestreamRecordingComponent
	},
	{
		path:APP_ROUTES.textToApp,
		component:TextToAppComponent
	},
	{
		path:APP_ROUTES.zoomProfile,
		component:ZoomProfileComponent
	},
	{
		path:APP_ROUTES.soundSetting,
		component:SoundSettingsComponent
	},
	{
		path:APP_ROUTES.saveDraft,
		component:SaveDraftComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})

export class PostAuthRoutingModule { }
