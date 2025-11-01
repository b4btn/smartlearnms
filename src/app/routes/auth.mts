import { Routes } from "@angular/router";
import { Login } from '../pages/auth/login/login'

export const AuthRoutes: Routes = [
  {
    path: "",
    pathMatch: 'full',
    redirectTo: "/login"
  },
  {
    path: "login",
    component: Login,
    title:"Login"
  }]
