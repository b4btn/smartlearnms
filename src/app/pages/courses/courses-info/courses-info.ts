import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Courses } from '../../../core/services/courses/courses';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Course } from '../../../shared/types/courses.mjs';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-courses-info',
  imports: [MatProgressSpinnerModule, RouterLink],
  templateUrl: './courses-info.html',
  styleUrl: './courses-info.scss',
})
export class CoursesInfo implements OnInit, OnDestroy {
  private coursesService = inject(Courses)
  private activatedRoute = inject(ActivatedRoute)
  private _snackBar = inject(MatSnackBar)
  subscriptions: Subscription[] = []
  courseId: string = ""
  dataLoaded = signal(false)
  courseInfo!: Course

  ngOnInit(): void {
    this.dataLoaded.set(false)
    this.subscriptions[0] =
      this.activatedRoute.paramMap.subscribe({
        next: (res) => {
          if (res.get('courseId')) {
            this.courseId = `${res.get('courseId')}`
            this.getCourseInfo(this.courseId)
          }
        }
      })
  }

  ngOnDestroy(): void {
    for (const i of this.subscriptions) {
      i.unsubscribe()
    }
  }

  getCourseInfo(id: string) {
    this.subscriptions[1] =
      this.coursesService.getCourseInfo(id).subscribe({
        next: (res) => {
          if (res.status == "success") {
            this.courseInfo = res.data
            this.dataLoaded.set(true)
          }
        },
        error: (err: HttpErrorResponse) => {
          this._snackBar.open(err.message, "close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
        }
      })
  }
}
