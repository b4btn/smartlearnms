import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { Auth } from './core/services/auth/auth';
import { Login } from './pages/auth/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('SmareLearnMS');
  private authService = inject(Auth)
  authVerify = signal(false)

  ngOnInit() {
    this.authVerify.set(false)
    this.authService.verifySession.subscribe({
      next: (res) => {
        this.authVerify.set(res)
      }
    })
  }

  logout() {
    this.authService.logout()
  }
}
