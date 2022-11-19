import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { MessagesComponent } from "./examples/messages/messages.component";
import { AcceuilComponent } from "./examples/acceuil/acceuil.component";
import { SignUpComponent } from "./examples/sign-up/sign-up.component";
import { SideMeniuComponent } from "./examples/acceuil/side-meniu/side-meniu.component";
import { UsersComponent } from './examples/admin/users/users.component';
import { PostsComponent } from './examples/admin/posts/posts.component';

const routes: Routes = [
    { path: '', redirectTo: 'examples/login', pathMatch: 'full' },
    { path: 'examples/acceuil', component: AcceuilComponent },
    { path: 'examples/sport', component: AcceuilComponent },
    { path: 'examples/art', component: AcceuilComponent },
    { path: 'examples/search/:search_text', component: AcceuilComponent },
    { path: 'examples/acceuil/side', component: SideMeniuComponent },
    { path: 'examples/sign-up', component: SignUpComponent },
    { path: 'examples/messages', component: MessagesComponent },
    { path: 'examples/login', component: LoginComponent },
    { path: 'examples/profile', component: ProfileComponent },
    { path: 'admin/users', component: UsersComponent },
    { path: 'admin/posts', component: PostsComponent },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
