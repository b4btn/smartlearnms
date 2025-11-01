import { Routes } from "@angular/router";
import { CoursesList } from "../pages/courses/courses-list/courses-list"
import { CoursesInfo } from "../pages/courses/courses-info/courses-info"
import { AuthGuard } from "../core/providers/auth-guard/auth-guard"

export const CourseRoutes: Routes = [
  {
    path: "courses",
    component: CoursesList,
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    title: "Course List"
  },
  {
    path: "courses/:courseId",
    component: CoursesInfo,
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    title: "Course Info"
  },
]

