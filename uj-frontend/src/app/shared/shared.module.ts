import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    NavbarComponent,
    NotFoundComponent,
    ForbiddenComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    MatDialogModule
  ],
  exports: [NavbarComponent, NotFoundComponent, ForbiddenComponent]
})
export class SharedModule { }
