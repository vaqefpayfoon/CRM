import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule,
  ],
  providers: []
})
export class DashboardModule { }
