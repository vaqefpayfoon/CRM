import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS, REDUCERS } from './+state';
import { AuthComponent } from './auth.component';
import { guards } from './auth-gurad';
import * as fromFacades from './+state/facade';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    StoreModule.forFeature('auth', REDUCERS),
    EffectsModule.forFeature(EFFECTS),
  ],
  providers: [...fromFacades.facades]
})
export class AuthModule { }
