import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMatchGuard } from './auth/auth-gurad/auth-match.gurad';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (mod) => mod.DashboardModule
      ),
    // canMatch: [AuthMatchGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  // { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
