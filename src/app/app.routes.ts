import { Routes } from '@angular/router';
import { AuthRoutes } from './routes/auth.mjs'
import { CourseRoutes } from './routes/courses.mjs'

export const routes: Routes = [
  ...AuthRoutes,
  ...CourseRoutes
];
