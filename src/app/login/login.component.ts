import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        this.errorMessage = "";
      }, err => {
        this.errorMessage = err.message;
      })
  }

  loginUserAdmin(value) {
    this.authService.loginUserAdmin(value)
      .then(
        res => {
          this.errorMessage = "";
          this.router.navigate(['home']);
        }, err => {
          this.errorMessage = err.message;
        }
      )
  }

}
