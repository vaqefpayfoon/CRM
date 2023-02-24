import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    LayoutModule.forRoot(),
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
