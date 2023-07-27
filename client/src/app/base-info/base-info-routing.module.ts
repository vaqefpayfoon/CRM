import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseInfoComponent } from './base-info.component';
import { UserComponent, UsersComponent } from './components/users';

const routes: Routes = [
  {
    path: '',
    component: BaseInfoComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'users/:id', component: UserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseInfoRoutingModule {}
