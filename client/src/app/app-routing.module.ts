import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMatchGuard } from './auth/auth-gurad/auth-match.gurad';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (mod) => mod.DashboardRoutingModule
      ),
    canMatch: [AuthMatchGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((mod) => mod.AuthRoutingModule),
      // canMatch: [AuthMatchGuard],
  },
  // { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
