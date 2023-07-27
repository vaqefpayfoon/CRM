import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components/users';
import { BaseInfoRoutingModule } from './base-info-routing.module';
import { BaseInfoComponent } from './base-info.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EFFECTS, REDUCERS, facades } from './+state';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ...components,
    BaseInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BaseInfoRoutingModule,
    StoreModule.forFeature('baseInfo', REDUCERS),
    EffectsModule.forFeature(EFFECTS),
  ]
})
export class BaseInfoModule { }
