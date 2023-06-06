import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProblemsModule } from "./features/problems/problems.module";
import { AccountsModule } from "./features/accounts/accounts.module";
import { ContestsModule } from "./features/contests/contests.module";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { initializer } from "./core/init/keycloak-init";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProblemsModule,
    AccountsModule,
    ContestsModule,
    KeycloakAngularModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
