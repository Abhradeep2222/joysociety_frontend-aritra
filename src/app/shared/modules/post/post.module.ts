import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormModule } from "../../components/form/form.module";
import { PickerModule } from '@ctrl/ngx-emoji-mart';
// import { NgChatModule } from 'ng-chat';

import { PostComponent } from './post.component';
import { PostpopupComponent } from './postpopup/postpopup.component';
import { PollpopupComponent } from './pollpopup/pollpopup.component';
import { ContentComponent } from './content/content.component';
import { CommentComponent } from './comment/comment.component';
import { TextareaAutoresizeDirective } from "./comment/textarea-autoresize.directive";
import { ChatInputComponent } from './chat-input/chat-input.component';
import { SectionChatComponent } from './section-chat/section-chat.component';
import { MemberChatComponent } from './member-chat/member-chat.component';
import { SearchFilterPipe } from "../post/member-chat/member-chat.component";

@NgModule({
    imports: [
        CommonModule,
        EditorModule,
        NgbDropdownModule,
        FormsModule,
        ReactiveFormsModule,
        FormModule,
        PickerModule,
        // NgChatModule
    ],
    declarations: [
        PostComponent,
        PostpopupComponent,
        PollpopupComponent,
        ContentComponent,
        CommentComponent,
        TextareaAutoresizeDirective,
        ChatInputComponent,
        SectionChatComponent,
        MemberChatComponent,
        SearchFilterPipe
    ],
    exports: [
        PostComponent,
        CommentComponent,
        SectionChatComponent,
        MemberChatComponent
    ]
})
export class PostModule { }
