import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ExamplesModule } from './examples/examples.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from "@angular/material/dialog";
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { AppComponent } from './app.component';
import { SignUpComponent} from './examples/sign-up/sign-up.component' ;
import { NavigationComponent } from "./components/navigation/navigation.component";

import { UserService } from './examples/services/user.service';

@NgModule({
    declarations: [
        AppComponent,
        SignUpComponent,
        NavigationComponent
    ],
    imports: [
        MatSnackBarModule,
        MatIconModule,
        MatDialogModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        ExamplesModule,
        MatAutocompleteModule
    ],
    providers: [UserService, FormsModule, ReactiveFormsModule ],
    bootstrap: [AppComponent],
    exports:[MatIconModule]
})
export class AppModule { }
