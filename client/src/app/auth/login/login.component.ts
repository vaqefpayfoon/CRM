import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../+state';
import { AuthModel } from 'src/app/@models';

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
    const login: AuthModel.ILogin = {
      userName: this.form.value.userName,
      password: this.form.value.password
    }
    this.authFacade.login(login);
  }

}
