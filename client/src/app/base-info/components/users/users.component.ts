import { Component, OnInit } from '@angular/core';
import { UserFacade } from '../../+state';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/@models';
import { IPagination } from 'src/app/@models/common/pagination.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList$: Observable<UserModel.IUser[]>;
  total$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<unknown>;
  userConfig$: Observable<IPagination>;
  constructor(private userFacade: UserFacade) {

  }

  ngOnInit(): void {
    this.userList$ = this.userFacade.users$;
    this.total$ = this.userFacade.total$;
    this.userConfig$ = this.userFacade.getUserConfig$;
    this.loading$ = this.userFacade.loading$;
  }

}
