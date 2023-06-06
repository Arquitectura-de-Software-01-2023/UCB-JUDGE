import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {ForbiddenComponent} from "./shared/components/forbidden/forbidden.component";

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  // Lazy loaded module routes
  { path: '', loadChildren: () => import('./features/accounts/accounts.module').then(m => m.AccountsModule) },
  { path: '', loadChildren: () => import('./features/problems/problems.module').then(m => m.ProblemsModule) },
  { path: '', loadChildren: () => import('./features/contests/contests.module').then(m => m.ContestsModule) },
  // 404 Error page
  { path: '404', component: NotFoundComponent },
  // 403 Error page
  { path: '403', component: ForbiddenComponent },
  // Redirect to 404 for any unknown paths
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
