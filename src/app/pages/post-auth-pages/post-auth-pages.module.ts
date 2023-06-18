import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgbDropdownModule, NgbPaginationModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { TagInputModule } from 'ngx-chips';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FormModule } from "../../shared/components/form/form.module";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ImageCropperModule } from "../../shared/modules/image-cropper/image-cropper.module";

// Directives
import { DisableControlDirective } from "../../shared/directives/disable-control.directive";

import { PostModule } from "../../shared/modules/post/post.module";

import { PostauthLayoutComponent } from '../../layout/postauth-layout/postauth-layout.component';
import { HeaderComponent } from "../../layout/postauth-layout/header/header.component";
import { ProfileComponent } from '../../layout/postauth-layout/profile/profile.component';
import { NotificationsComponent } from '../../layout/postauth-layout/notifications/notifications.component';
import { ChatComponent } from '../../layout/postauth-layout/chat/chat.component';
import { NavigationBarComponent } from '../../layout/postauth-layout/navigation-bar/navigation-bar.component';

import { PostAuthRoutingModule } from './post-auth-routing.module';
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
import { QuestionPollComponent } from './home/feed-type/question-poll/question-poll.component';
import { MultipleChoicePollComponent } from './home/feed-type/multiple-choice-poll/multiple-choice-poll.component';
import { FeedHeadComponent } from './home/feed-type/feed-head/feed-head.component';
import { FeedFootComponent } from './home/feed-type/feed-foot/feed-foot.component';
import { PercentagePollComponent } from './home/feed-type/percentage-poll/percentage-poll.component';
import { HotColdPollComponent } from './home/feed-type/hot-cold-poll/hot-cold-poll.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventInviteComponent } from './events/event-invite/event-invite.component';
import { TribeListComponent } from './tribes/tribe-list/tribe-list.component';
import { TribeFormComponent } from './tribes/tribe-form/tribe-form.component';
import { PlansListComponent } from './plans/plans-list/plans-list.component';
import { PlansFormComponent } from './plans/plans-form/plans-form.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { WorkshopViewComponent } from './workshop/workshop-view/workshop-view.component';
import { LikeDetailComponent } from './home/feed-type/feed-foot/like-detail/like-detail.component';
import { TribeViewComponent } from './tribes/tribe-view/tribe-view.component';
import { PendingGoalUpdateComponent } from './goal/pending-goal-update/pending-goal-update.component';
import { TopicsComponent } from './topics/topics.component';
import { InvoicesComponent } from './profile/invoices/invoices.component';
import { NotificationSettingsComponent } from './profile/notification-settings/notification-settings.component';
import { SoundSettingsComponent } from './profile/sound-settings/sound-settings.component';
import { TextToAppComponent } from './profile/text-to-app/text-to-app.component';
import { ZoomProfileComponent } from './profile/zoom-profile/zoom-profile.component';
import { SaveDraftComponent } from './profile/save-draft/save-draft.component';
import { LivestreamRecordingComponent } from './profile/livestream-recording/livestream-recording.component';
import { NetworkSettingComponent } from './profile/network-setting/network-setting.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		PostAuthRoutingModule,
		FormModule,
		NgxMaskModule.forRoot(),
		NgbDropdownModule,
		ClipboardModule,
		NgbPaginationModule,
		TagInputModule,
		NgxDatatableModule,
		NgbDatepickerModule,
		PostModule,
		NgxSliderModule,
		ImageCropperModule
	],
	declarations: [
		PostauthLayoutComponent,
		HeaderComponent,
		ProfileComponent,
		NotificationsComponent,
		ChatComponent,
		NavigationBarComponent,
		HomeComponent,
		ProfileEditComponent,
		DisableControlDirective,
		UpdateCredsComponent,
		BillingComponent,
		MemberListComponent,
		MemberInviteComponent,
		MemberMessageComponent,
		DownloadMembersComponent,
		MemberCommunicationComponent,
		InviteListComponent,
		MemberProfileComponent,
		WorkshopListComponent,
		WorkshopFormComponent,
		TruIntroductionComponent,
		TruPartOneComponent,
		TruPartOneReportComponent,
		TruPartTwoComponent,
		TruPartTwoReportComponent,
		WorkshopOrderComponent,
		GoalComponent,
		GoalListComponent,
		ReflectionComponent,
		QuestionPollComponent,
		MultipleChoicePollComponent,
		FeedHeadComponent,
		FeedFootComponent,
		PercentagePollComponent,
		HotColdPollComponent,
		EventListComponent,
		EventFormComponent,
		EventDetailComponent,
		EventInviteComponent,
		TribeListComponent,
		TribeFormComponent,
		PlansListComponent,
		PlansFormComponent,
		SubscriptionsComponent,
		WorkshopViewComponent,
		LikeDetailComponent,
		TribeViewComponent,
		PendingGoalUpdateComponent,
  		TopicsComponent,
    	InvoicesComponent,
     	NotificationSettingsComponent,
     	SoundSettingsComponent,
     	TextToAppComponent,
     	ZoomProfileComponent,
     	SaveDraftComponent,
     	LivestreamRecordingComponent,
     	NetworkSettingComponent,
	],
})

export class PostAuthModule { }