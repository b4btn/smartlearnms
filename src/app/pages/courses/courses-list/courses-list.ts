import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Courses } from '../../../core/services/courses/courses';
import { Course } from '../../../shared/types/courses.mjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-courses-list',
  imports: [MatCardModule, MatButtonModule, RouterLink, MatProgressSpinner],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss',
})
export class CoursesList implements OnInit, OnDestroy {
  private coursesService = inject(Courses)
  private _snackBar = inject(MatSnackBar)
  courseList: Course[] = []
  listLoaded = signal(false)
  subscriptions: Subscription[] = []


  ngOnInit(): void {
    this.listLoaded.set(false)
    this.subscriptions[0] = this.coursesService.courseList.subscribe({
      next: (data) => {
        if (data.length) {
          this.courseList = data
          this.listLoaded.set(true)
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

  ngOnDestroy(): void {
    for (const i of this.subscriptions) {
      i.unsubscribe()
    }
  }
}
