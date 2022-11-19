import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamplesComponent } from './examples.component';
import { MessagesComponent } from './messages/messages.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { MatDialogModule } from "@angular/material/dialog";
import { SideMeniuComponent } from './acceuil/side-meniu/side-meniu.component';
import { AddPostComponent } from './acceuil/dialogs/add-post/add-post.component';
import { AddCommentComponent } from './acceuil/dialogs/add-comment/add-comment.component'
import { EditProfileComponent } from './profile/dialogs/edit-profile/edit-profile.component';
import { PostComponent } from './acceuil/post/post.component';
import { CommentComponent } from './acceuil/post/comment/comment.component';
import { AddImagesComponent } from './profile/dialogs/add-images/add-images/add-images.component';
import { StarsComponent } from './acceuil/dialogs/add-comment/stars/stars.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UsersComponent } from './admin/users/users.component';
import { PostsComponent } from './admin/posts/posts.component';
import { DetailsComponent } from './admin/posts/details/details.component';

@NgModule({
    imports: [
        MatIconModule,
        BrowserAnimationsModule,
        MatDialogModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        MatAutocompleteModule,
        MatSnackBarModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_KEY_HERE'
        })
    ],
    declarations: [
        LoginComponent,
        ExamplesComponent,
        ProfileComponent,
        MessagesComponent,
        AcceuilComponent,

        SideMeniuComponent,
        AddPostComponent,
        AddCommentComponent,
        EditProfileComponent,
        PostComponent,
        CommentComponent,
        AddImagesComponent,
        StarsComponent,
        UsersComponent,
        PostsComponent,
        DetailsComponent,
    ],
    providers: [
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        MatIconModule
    ]
})
export class ExamplesModule { }
