import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from "../../../core/services/auth/auth"
import { AuthResponse, Credentials } from '../../../shared/types/auth.mjs';
import { Router } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline" },
    },
  ]
})
export class Login implements OnInit {
  credentials = new FormGroup({
    username: new FormControl("", { validators: [Validators.required, Validators.email] }),
    password: new FormControl("", { validators: [Validators.required] })
  })

  private _snackBar = inject(MatSnackBar)
  private readonly loginService = inject(Auth)
  private router = inject(Router)

  ngOnInit(): void {
    this.credentials.reset()
  }

  login() {
    if (!this.credentials.valid) {
      this._snackBar.open("Invalid Credentials", "close", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      return
    }
    const creds: Credentials = {
      username: this.credentials.get('username')!.value!,
      password: this.credentials.get('password')!.value!
    }
    this.loginService.login(creds)
    this.router.navigateByUrl("/courses")
  }

}
