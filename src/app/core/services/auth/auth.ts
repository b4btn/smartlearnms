import { inject, Injectable } from '@angular/core';
import { AuthResponse, Credentials } from '../../../shared/types/auth.mjs'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { BehaviorSubject, of, window } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private httpService = inject(HttpClient)
  private router = inject(Router)
  readonly baseUrl = environment.baseUrl
  verifySession = new BehaviorSubject(false)

  login(creds: Credentials) {
    this.httpService.post<AuthResponse>(`${this.baseUrl}/users/login/`, { ...creds }).subscribe({
      next: (res: AuthResponse) => {
        if (res.data.access.length) {
          localStorage.setItem("token", res.data.access)
          this.verifySession.next(true)
          this.router.navigateByUrl("/courses")
        }
      },
      error: (err) => {
        localStorage.clear()
        this.verifySession.next(false)
        this.router.navigateByUrl("/login")
      },
    })
  }

  authVerify() {
    if (!localStorage.getItem('token')) {
      localStorage.clear()
      this.verifySession.next(false)
      this.router.navigateByUrl("/login")
      return of(false)
    }

    if (!localStorage.getItem('token')!.length) {
      localStorage.clear()
      this.verifySession.next(false)
      this.router.navigateByUrl("/login")
      return of(false)
    }
    this.verifySession.next(true)
    return this.verifySession
  }

  logout() {
    this.verifySession.next(false)
    localStorage.clear()
    this.router.navigateByUrl("/courses")
  }

}
