import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AccountRegisterComponent } from './components/account-register/account-register.component';
import { AccountProfileUpdateComponent } from './components/account-profile-update/account-profile-update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ProblemsModule} from "../problems/problems.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {AccountProfileComponent} from "./components/account-profile/account-profile.component";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import { AccountProfileDeleteComponent } from './components/account-profile-delete/account-profile-delete.component';
import {AccountProfileInfoComponent} from "./components/account-profile-info/account-profile-info.component";
import {
  AccountProfileChangePasswordComponent
} from "./components/account-profile-change-password/account-profile-change-password.component";
import { AccountProfileSubmissionsComponent } from './components/account-profile-submissions/account-profile-submissions.component';

@NgModule({
  declarations: [
    HomePageComponent,
    AccountRegisterComponent,
    AccountProfileComponent,
    AccountProfileInfoComponent,
    AccountProfileUpdateComponent,
    AccountProfileChangePasswordComponent,
    AccountProfileDeleteComponent,
    AccountProfileSubmissionsComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    ProblemsModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
  ]
})
export class AccountsModule { }
