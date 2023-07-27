import { Component, Input } from '@angular/core';
import { UserModel } from 'src/app/@models';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: UserModel.IUser;
}
