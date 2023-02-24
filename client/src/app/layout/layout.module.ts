import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    MenuComponent,
    SidebarComponent
  ],
  imports: [
    LayoutRoutingModule,
    AuthModule,
    SharedModule,
  ],
  exports: [
    MenuComponent,
    SidebarComponent
  ]
})

// export class LayoutModule {}
export class LayoutModule {
  static forRoot(): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule
    };
  }
}
