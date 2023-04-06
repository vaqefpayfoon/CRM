import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from 'src/app/models/auth-model/user.interface';
import { AuthFacade } from '../+state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authFacade: AuthFacade) {}

  form = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  })

  ngOnInit(): void {
  }

  onLogin(): void {
    const login: ILogin = {
      userName: this.form.value.userName,
      password: this.form.value.password
    }
    this.authFacade.login(login);
  }

}
