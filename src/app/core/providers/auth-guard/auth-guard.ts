import { inject } from '@angular/core';
import { Auth } from '../../services/auth/auth';

export const AuthGuard = () => {
  const authService = inject(Auth)
  return authService.authVerify();
};
